/*
  Warnings:

  - You are about to drop the column `customers` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "customers",
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;
