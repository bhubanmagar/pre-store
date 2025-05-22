/*
  Warnings:

  - You are about to drop the column `paidAr` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paidAr",
ADD COLUMN     "paidAt" TIMESTAMP(6);
