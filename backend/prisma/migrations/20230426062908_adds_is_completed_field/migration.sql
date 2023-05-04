/*
  Warnings:

  - Added the required column `isCompleted` to the `UserCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCourse" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL;
