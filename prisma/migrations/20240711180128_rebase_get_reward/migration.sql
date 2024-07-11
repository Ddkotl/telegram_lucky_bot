/*
  Warnings:

  - You are about to drop the column `getReward` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserReward" ADD COLUMN     "getReward" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "getReward";
