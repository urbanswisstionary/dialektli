/*
  Warnings:

  - You are about to drop the column `canton` on the `Term` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Term" DROP COLUMN "canton",
ADD COLUMN     "cantons" TEXT[];
