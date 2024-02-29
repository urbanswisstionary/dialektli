-- CreateEnum
CREATE TYPE "Language" AS ENUM ('DE', 'FR', 'IT');

-- AlterTable
ALTER TABLE "Term" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'DE';
