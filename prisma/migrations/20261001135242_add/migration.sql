-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image_url" TEXT;

-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "newfilenmae" TEXT NOT NULL,
    "uploaded_by" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
