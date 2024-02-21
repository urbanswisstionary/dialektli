/*
  Warnings:

  - The primary key for the `Dislike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `Dislike` table. All the data in the column will be lost.
  - The primary key for the `Flag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `Flag` table. All the data in the column will be lost.
  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[termId,authorId]` on the table `Dislike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[termId,authorId]` on the table `Flag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[termId,authorId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `termId` to the `Dislike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termId` to the `Flag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dislike" DROP CONSTRAINT "Dislike_postId_fkey";

-- DropForeignKey
ALTER TABLE "Flag" DROP CONSTRAINT "Flag_postId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "Dislike_postId_authorId_key";

-- DropIndex
DROP INDEX "Flag_postId_authorId_key";

-- DropIndex
DROP INDEX "Like_postId_authorId_key";

-- AlterTable
ALTER TABLE "Dislike" DROP CONSTRAINT "Dislike_pkey",
DROP COLUMN "postId",
ADD COLUMN     "termId" TEXT NOT NULL,
ADD CONSTRAINT "Dislike_pkey" PRIMARY KEY ("termId", "authorId");

-- AlterTable
ALTER TABLE "Flag" DROP CONSTRAINT "Flag_pkey",
DROP COLUMN "postId",
ADD COLUMN     "termId" TEXT NOT NULL,
ADD CONSTRAINT "Flag_pkey" PRIMARY KEY ("termId", "authorId");

-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
DROP COLUMN "postId",
ADD COLUMN     "termId" TEXT NOT NULL,
ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("termId", "authorId");

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Term" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "examples" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "canton" TEXT,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dislike_termId_authorId_key" ON "Dislike"("termId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Flag_termId_authorId_key" ON "Flag"("termId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_termId_authorId_key" ON "Like"("termId", "authorId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flag" ADD CONSTRAINT "Flag_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
