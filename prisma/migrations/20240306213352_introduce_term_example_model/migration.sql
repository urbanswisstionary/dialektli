/*
  Warnings:

  - You are about to drop the column `examples` on the `Term` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Term" DROP COLUMN "examples";

-- CreateTable
CREATE TABLE "TermExample" (
    "id" TEXT NOT NULL,
    "termId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "authorId" TEXT,
    "cantons" TEXT[],

    CONSTRAINT "TermExample_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TermExample" ADD CONSTRAINT "TermExample_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermExample" ADD CONSTRAINT "TermExample_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
