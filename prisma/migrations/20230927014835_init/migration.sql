-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "contact_user_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_favorite" BOOLEAN NOT NULL,
    "is_blocked" BOOLEAN NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("contact_user_id")
);

-- CreateTable
CREATE TABLE "chats" (
    "chat_id" TEXT NOT NULL,
    "chat_name" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_group" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "chat_participants" (
    "participant_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "chat_participants_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "messages" (
    "message_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "message_text" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reply_message_id" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "user_message_status" (
    "status_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "is_received" BOOLEAN NOT NULL DEFAULT false,
    "is_favorite" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_message_status_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "attachment_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_type" VARCHAR(20) NOT NULL,
    "file_size" INTEGER NOT NULL,
    "file_url" TEXT NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("attachment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_user_id_key" ON "contacts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_participants_chat_id_key" ON "chat_participants"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_participants_user_id_key" ON "chat_participants"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "messages_chat_id_key" ON "messages"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "messages_sender_id_key" ON "messages"("sender_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_message_status_message_id_key" ON "user_message_status"("message_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_message_status_user_id_key" ON "user_message_status"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_message_id_key" ON "Attachment"("message_id");

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_participants" ADD CONSTRAINT "chat_participants_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_participants" ADD CONSTRAINT "chat_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_message_status" ADD CONSTRAINT "user_message_status_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("message_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_message_status" ADD CONSTRAINT "user_message_status_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("message_id") ON DELETE RESTRICT ON UPDATE CASCADE;
