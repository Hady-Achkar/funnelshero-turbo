-- CreateTable
CREATE TABLE "Funnel" (
    "funnel_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "meta_tags" TEXT,
    "category" TEXT NOT NULL,
    "base_domain" TEXT,
    "pro_domain" TEXT,
    "fav_icon" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "allowed_notifications" BOOLEAN NOT NULL DEFAULT true,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Funnel_pkey" PRIMARY KEY ("funnel_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Funnel_title_key" ON "Funnel"("title");

-- AddForeignKey
ALTER TABLE "Funnel" ADD CONSTRAINT "Funnel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
