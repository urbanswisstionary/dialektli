/*
  Warnings:

  - You are about to drop the column `content` on the `Expression` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expression" DROP COLUMN "content",
ADD COLUMN     "definition" TEXT;
