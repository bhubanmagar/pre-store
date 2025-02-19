"use server";
import { PrismaClient } from "@prisma/client";
import { convertToNormalObject } from "@/lib/utils";
import { LATEST_PRODUCT_LIMIT } from "../constants";
export const getLatestProducts = async () => {
  const prisma = new PrismaClient();
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCT_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return convertToNormalObject(data);
};
