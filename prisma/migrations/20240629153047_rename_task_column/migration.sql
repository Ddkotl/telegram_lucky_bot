/*
  Warnings:

  - You are about to drop the column `subToProjektChanel` on the `UserTask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserTask" DROP COLUMN "subToProjektChanel",
ADD COLUMN     "task1" BOOLEAN NOT NULL DEFAULT false;
