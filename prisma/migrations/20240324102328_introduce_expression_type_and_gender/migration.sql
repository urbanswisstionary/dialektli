-- CreateEnum
CREATE TYPE "ExpressionGender" AS ENUM ('M', 'F', 'N');

-- CreateEnum
CREATE TYPE "ExpressionType" AS ENUM ('NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PRONOUN', 'PREPOSITION', 'CONJUNCTION', 'INTERJECTION', 'PARTICLE');

-- AlterTable
ALTER TABLE "Expression" ADD COLUMN     "gender" "ExpressionGender",
ADD COLUMN     "type" "ExpressionType";
