/*
  Warnings:

  - You are about to drop the column `thank` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "thank",
ADD COLUMN     "like" INTEGER NOT NULL DEFAULT 0;
