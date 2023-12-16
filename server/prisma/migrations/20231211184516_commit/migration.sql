/*
  Warnings:

  - The `notes` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "notes",
ADD COLUMN     "notes" TEXT[] DEFAULT ARRAY[]::TEXT[];
