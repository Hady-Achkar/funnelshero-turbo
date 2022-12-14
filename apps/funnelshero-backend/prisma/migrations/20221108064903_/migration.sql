/*
  Warnings:

  - A unique constraint covering the columns `[stripeId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_stripeId_key" ON "users"("stripeId");
