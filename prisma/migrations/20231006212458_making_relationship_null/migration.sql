-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_reply_message_id_fkey";

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "reply_message_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_reply_message_id_fkey" FOREIGN KEY ("reply_message_id") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
