/*
  Warnings:

  - The primary key for the `hashes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hash_id` on the `hashes` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `hashes` table. All the data in the column will be lost.
  - The primary key for the `pages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `pages` table. All the data in the column will be lost.
  - You are about to drop the column `funnel_id` on the `pages` table. All the data in the column will be lost.
  - You are about to drop the column `is_published` on the `pages` table. All the data in the column will be lost.
  - You are about to drop the column `page_id` on the `pages` table. All the data in the column will be lost.
  - You are about to drop the column `published_at` on the `pages` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `pages` table. All the data in the column will be lost.
  - The primary key for the `tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `tokens` table. All the data in the column will be lost.
  - You are about to drop the column `token_id` on the `tokens` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `active_price` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `active_subscription` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `in_trial` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_trial_legit` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Funnel` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `hashes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `hashes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `funnelId` to the `pages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `pages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activePrice` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Funnel" DROP CONSTRAINT "Funnel_user_id_fkey";

-- DropForeignKey
ALTER TABLE "hashes" DROP CONSTRAINT "hashes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "pages" DROP CONSTRAINT "pages_funnel_id_fkey";

-- DropIndex
DROP INDEX "hashes_user_id_key";

-- AlterTable
ALTER TABLE "hashes" DROP CONSTRAINT "hashes_pkey",
DROP COLUMN "hash_id",
DROP COLUMN "user_id",
ADD COLUMN     "hashId" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "hashes_pkey" PRIMARY KEY ("hashId");

-- AlterTable
ALTER TABLE "pages" DROP CONSTRAINT "pages_pkey",
DROP COLUMN "created_at",
DROP COLUMN "funnel_id",
DROP COLUMN "is_published",
DROP COLUMN "page_id",
DROP COLUMN "published_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "funnelId" INTEGER NOT NULL,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pageId" SERIAL NOT NULL,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "pages_pkey" PRIMARY KEY ("pageId");

-- AlterTable
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_pkey",
DROP COLUMN "created_at",
DROP COLUMN "token_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tokenId" SERIAL NOT NULL,
ADD CONSTRAINT "tokens_pkey" PRIMARY KEY ("tokenId");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "active_price",
DROP COLUMN "active_subscription",
DROP COLUMN "created_at",
DROP COLUMN "first_name",
DROP COLUMN "in_trial",
DROP COLUMN "is_trial_legit",
DROP COLUMN "last_name",
DROP COLUMN "stripe_id",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "activePrice" TEXT NOT NULL,
ADD COLUMN     "activeSubscription" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "inTrial" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTrialLegit" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "stripeId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("userId");

-- DropTable
DROP TABLE "Funnel";

-- CreateTable
CREATE TABLE "funnels" (
    "funnelId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "metatags" TEXT,
    "category" TEXT NOT NULL,
    "baseDomain" TEXT,
    "proDomain" TEXT,
    "favicon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "allowedNotifications" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "funnels_pkey" PRIMARY KEY ("funnelId")
);

-- CreateIndex
CREATE UNIQUE INDEX "funnels_title_key" ON "funnels"("title");

-- CreateIndex
CREATE UNIQUE INDEX "hashes_userId_key" ON "hashes"("userId");

-- AddForeignKey
ALTER TABLE "hashes" ADD CONSTRAINT "hashes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funnels" ADD CONSTRAINT "funnels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_funnelId_fkey" FOREIGN KEY ("funnelId") REFERENCES "funnels"("funnelId") ON DELETE RESTRICT ON UPDATE CASCADE;
