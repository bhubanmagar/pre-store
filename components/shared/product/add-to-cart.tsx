"use client";
import { useToast } from "@/hooks/use-toast";
import { addItemToCart, removeItemsFromCart } from "@/lib/actions/cart.action";
import { Cart, CartItem } from "@/types";
import { Minus, Plus, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { ToastAction } from "../../ui/toast";
import { useTransition } from "react";

export const AddToCart = ({
  cart,
  items,
}: {
  cart?: Cart;
  items: CartItem;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // add to cart function
  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(items);
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
        return;
      }
      // handle success add to cart
      toast({
        description: res.message,
        action: (
          <ToastAction
            className="bg-primary text-black hover:text-white  hover:bg-gray-800"
            altText="Go To Cart"
            onClick={() => router.push("/cart")}
          >
            Go To Cart
          </ToastAction>
        ),
      });
    });
  };
  // handle remove item from cart function
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemsFromCart(items.productId);
      toast({
        variant: res.success ? "default" : "destructive",
        description: res.message,
      });
      return;
    });
  };

  // check if item is in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === items.productId);
  return existItem ? (
    <>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}{" "}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </>
  ) : (
    <>
      <Button className="w-full" type="button" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}{" "}
        Add to Cart
      </Button>
    </>
  );
};
