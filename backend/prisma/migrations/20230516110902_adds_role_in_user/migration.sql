-- CreateEnum
CREATE TYPE "Role" AS ENUM ('employee', 'admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Role"[];
