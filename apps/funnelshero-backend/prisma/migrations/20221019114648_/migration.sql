-- CreateTable
CREATE TABLE "pages" (
    "page_id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "metatags" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "link" TEXT,
    "funnel_id" INTEGER NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("page_id")
);

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_funnel_id_fkey" FOREIGN KEY ("funnel_id") REFERENCES "Funnel"("funnel_id") ON DELETE RESTRICT ON UPDATE CASCADE;
