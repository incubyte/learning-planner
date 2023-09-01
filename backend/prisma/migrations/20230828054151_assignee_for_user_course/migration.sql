/*
  Warnings:

  - Added the required column `Assignee` to the `UserCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCourse" ADD COLUMN     "Assignee" TEXT NOT NULL;
