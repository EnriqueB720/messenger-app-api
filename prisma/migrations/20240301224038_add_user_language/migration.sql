-- CreateEnum
CREATE TYPE "Language" AS ENUM ('SPANISH', 'ENGLISH');

-- DropIndex
DROP INDEX "user_message_statuses_message_id_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'SPANISH';
