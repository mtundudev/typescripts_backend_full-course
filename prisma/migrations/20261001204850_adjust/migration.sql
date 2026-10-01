/*
  Warnings:

  - A unique constraint covering the columns `[post_id]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[image_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Media_post_id_key" ON "Media"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "Post_image_id_key" ON "Post"("image_id");
