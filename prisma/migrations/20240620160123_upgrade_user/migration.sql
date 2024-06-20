/*
  Warnings:

  - Changed the type of `chat_id` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "username" TEXT,
DROP COLUMN "chat_id",
ADD COLUMN     "chat_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_chat_id_key" ON "users"("chat_id");
