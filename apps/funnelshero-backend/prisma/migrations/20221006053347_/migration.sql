-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "stripe_id" TEXT,
    "active_subscription" TEXT,
    "in_trial" BOOLEAN NOT NULL DEFAULT false,
    "is_trial_legit" BOOLEAN NOT NULL DEFAULT true,
    "active_price" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "hashes" (
    "hash_id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "hashes_pkey" PRIMARY KEY ("hash_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "hashes_user_id_key" ON "hashes"("user_id");

-- AddForeignKey
ALTER TABLE "hashes" ADD CONSTRAINT "hashes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
