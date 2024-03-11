/*
  Warnings:

  - The primary key for the `Dislike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `termId` on the `Dislike` table. All the data in the column will be lost.
  - The primary key for the `Flag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `termId` on the `Flag` table. All the data in the column will be lost.
  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `termId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the `Term` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TermExample` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[expressionId,authorId]` on the table `Dislike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[expressionId,authorId]` on the table `Flag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[expressionId,authorId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expressionId` to the `Dislike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expressionId` to the `Flag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expressionId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dislike" DROP CONSTRAINT "Dislike_termId_fkey";

-- DropForeignKey
ALTER TABLE "Flag" DROP CONSTRAINT "Flag_termId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_termId_fkey";

-- DropForeignKey
ALTER TABLE "Synonym" DROP CONSTRAINT "Synonym_synonymId_fkey";

-- DropForeignKey
ALTER TABLE "Synonym" DROP CONSTRAINT "Synonym_synonymOfId_fkey";

-- DropForeignKey
ALTER TABLE "Term" DROP CONSTRAINT "Term_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TermExample" DROP CONSTRAINT "TermExample_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TermExample" DROP CONSTRAINT "TermExample_termId_fkey";

-- DropIndex
DROP INDEX "Dislike_termId_authorId_key";

-- DropIndex
DROP INDEX "Flag_termId_authorId_key";

-- DropIndex
DROP INDEX "Like_termId_authorId_key";

-- AlterTable
ALTER TABLE "Dislike" DROP CONSTRAINT "Dislike_pkey",
DROP COLUMN "termId",
ADD COLUMN     "expressionId" TEXT NOT NULL,
ADD CONSTRAINT "Dislike_pkey" PRIMARY KEY ("expressionId", "authorId");

-- AlterTable
ALTER TABLE "Flag" DROP CONSTRAINT "Flag_pkey",
DROP COLUMN "termId",
ADD COLUMN     "expressionId" TEXT NOT NULL,
ADD CONSTRAINT "Flag_pkey" PRIMARY KEY ("expressionId", "authorId");

-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
DROP COLUMN "termId",
ADD COLUMN     "expressionId" TEXT NOT NULL,
ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("expressionId", "authorId");

-- DropTable
DROP TABLE "Term";

-- DropTable
DROP TABLE "TermExample";

-- CreateTable
CREATE TABLE "Expression" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "cantons" TEXT[],
    "language" "Language" NOT NULL DEFAULT 'DE',

    CONSTRAINT "Expression_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpressionExample" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "expressionId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT,
    "cantons" TEXT[],

    CONSTRAINT "ExpressionExample_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dislike_expressionId_authorId_key" ON "Dislike"("expressionId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Flag_expressionId_authorId_key" ON "Flag"("expressionId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_expressionId_authorId_key" ON "Like"("expressionId", "authorId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_expressionId_fkey" FOREIGN KEY ("expressionId") REFERENCES "Expression"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_expressionId_fkey" FOREIGN KEY ("expressionId") REFERENCES "Expression"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flag" ADD CONSTRAINT "Flag_expressionId_fkey" FOREIGN KEY ("expressionId") REFERENCES "Expression"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expression" ADD CONSTRAINT "Expression_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressionExample" ADD CONSTRAINT "ExpressionExample_expressionId_fkey" FOREIGN KEY ("expressionId") REFERENCES "Expression"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressionExample" ADD CONSTRAINT "ExpressionExample_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Synonym" ADD CONSTRAINT "Synonym_synonymOfId_fkey" FOREIGN KEY ("synonymOfId") REFERENCES "Expression"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Synonym" ADD CONSTRAINT "Synonym_synonymId_fkey" FOREIGN KEY ("synonymId") REFERENCES "Expression"("id") ON DELETE CASCADE ON UPDATE CASCADE;
