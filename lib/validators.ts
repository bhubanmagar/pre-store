import { z } from "zod";
import { formatNumbersWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";

//Schema for insertin Products

const Currency = z.union([
  z
    .string()
    .refine(
      (value) =>
        /^\d+(\.\d{2})?$/.test(formatNumbersWithDecimal(Number(value))),
      "Price must have exactly two decimal places"
    ),
  z
    .number()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumbersWithDecimal(value)),
      "Price must have exactly two decimal places"
    ),
]);

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 Character"),
  slug: z.string().min(3, "Slug must be at least 3 Character"),
  category: z.string().min(3, "Category must be at least 3 Character"),
  brand: z.string().min(3, "Brand must be at least 3 Character"),
  description: z.string().min(3, "Description must be at least 3 Character"),
  stock: z.coerce.number(),
  images: z.array(z.string().min(1, "Product must have at least one image")),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: Currency,
});

// schema for signin user
export const signInFormSchema = z.object({
  email: z.string().email("Invalid Email adress"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//schema for registering user
export const SignUpFromSchema = z
  .object({
    name: z.string().min(3, "Name mus be atleast 3 character long"),
    email: z.string().email("Invalid Email adress"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "confirmPassword must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// cart schema
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is Required"),
  name: z.string().min(1, "Name is Required"),
  slug: z.string().min(1, "Slug is Required"),
  qty: z.number().int().nonnegative("Quantity must be positive"),
  image: z.string().min(1, "Image is Requried"),
  price: Currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: Currency,
  totalPrice: Currency,
  shippingPrice: Currency,
  taxPrice: Currency,
  sessionCartId: z.string().min(1, "Session cart id is Required"),
  userId: z.string().optional().nullable(),
});

// Schema for shipping adress
export const shippingAdressSchema = z.object({
  fullName: z.string().min(3, "Name must be atleast 3 character"),
  streetAdress: z.string().min(3, "StreetAdress must be atleast 3 character"),
  city: z.string().min(3, "city must be atleast 3 character"),
  postalCode: z.string().min(3, "postal Code must be atleast 3 character"),
  country: z.string().min(3, "country must be atleast 3 character"),
  lng: z.number().optional(),
  lat: z.number().optional(),
});

// schema for payment method
export const paymentMethodsSchema = z
  .object({
    type: z.string().min(3, "Payment method is requred"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Invalid Payment Method",
  });

// Schema for inserting Order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  itemsPrice: Currency,
  shippingPrice: Currency,
  taxPrice: Currency,
  totalPrice: Currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Invalid Payment Method",
  }),
  shippingAddress: shippingAdressSchema,
});

// Schema for inserting an order items
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: Currency,
  qty: z.number(),
});
