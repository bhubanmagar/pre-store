import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//conver prisma object to regular js Object
export function convertToNormalObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

//format numbers with decimal places

export function formatNumbersWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

