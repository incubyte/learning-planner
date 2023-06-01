-- CreateTable
CREATE TABLE "ForgotPassword" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "ForgotPassword_pkey" PRIMARY KEY ("id")
);
