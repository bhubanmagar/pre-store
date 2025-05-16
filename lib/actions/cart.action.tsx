"use server";
import { cookies } from "next/headers";
import { CartItem } from "@/types";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

// calculate cart prices
const calcPrices = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, items) => acc + Number(items.price) * items.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart Session Not Found");

    // get Session and User ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // Get cart
    const cart = await getMyCart();

    // parse and validate items
    const item = cartItemSchema.parse(data);
    // get product from database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) throw new Error("Product not Found");

    if (!cart) {
      // crate new cart
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrices([item]),
      });
      // Add to database
      await prisma.cart.create({
        data: newCart,
      });

      // Revalidate Product page
      revalidatePath(`/product/${product.slug}`);

      // success message
      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    } else {
      // add items to existing cart of user
      // check if items is already in cart
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        // Check Stock
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not Enough Items");
        }

        // Increase the quantity
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qty = existItem.qty + 1;
      } else {
        // if items doesn't exist  in cart
        // check stock
        if (product.stock < 1) throw new Error("Not enough Stock");

        // add items to the cart.items
        cart.items.push(item);
      }
      // Save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrices(cart.items as CartItem[]),
        },
      });
      // revalidate path for instant update
      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: `${product.name} ${
          existItem ? "updated in " : "added to "
        } cart`,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyCart() {
  // Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart Session Not Found");

  // get Session and User ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  //Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId
      ? {
          userId: userId,
        }
      : {
          sessionCartId: sessionCartId,
        },
  });
  if (!cart) {
    return undefined;
  }

  // Conver Decomal and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

export async function removeItemsFromCart(productId: string) {
  try {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart Session Not Found");
    // Get Product
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
    if (!product) throw new Error(" Product not Found");
    // Get User cart
    const cart = await getMyCart();
    if (!cart) throw new Error(" Cart not found");

    // check for item
    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error("Item not Found");

    // check if only one  in qty
    if (exist.qty === 1) {
      // remove item
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId
      );
    } else {
      // Decrease qty
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }
    // update cart in database
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrices(cart.items as CartItem[]),
      },
    });

    // revalidate path
    revalidatePath(`/product/${product.slug}`);
    return {
      success: true,
      message: `${product.name} was removed from cart`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
