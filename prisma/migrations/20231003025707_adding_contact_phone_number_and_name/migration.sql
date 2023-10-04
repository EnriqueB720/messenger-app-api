/*
  Warnings:

  - Added the required column `full_name` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "full_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "phone_number" INTEGER NOT NULL;
