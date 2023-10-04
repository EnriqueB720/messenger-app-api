/*
  Warnings:

  - You are about to drop the column `phone_number` on the `contacts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_number` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "phone_number";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone_number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");
