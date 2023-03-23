/*
  Warnings:

  - You are about to drop the column `commentCount` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "like" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "commentCount";

-- AlterTable
ALTER TABLE "Recomment" ADD COLUMN     "like" INTEGER NOT NULL DEFAULT 0;
