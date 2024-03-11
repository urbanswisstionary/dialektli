/*
  Warnings:

  - You are about to drop the column `content` on the `ExpressionExample` table. All the data in the column will be lost.
  - Added the required column `definition` to the `ExpressionExample` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpressionExample" DROP COLUMN "content",
ADD COLUMN     "definition" TEXT NOT NULL;
