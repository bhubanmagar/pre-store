import { z } from "zod";
import { formatNumbersWithDecimal } from "./utils";

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
