/*
  Warnings:

  - A unique constraint covering the columns `[id,belongToId]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_id_belongToId_key" ON "Link"("id", "belongToId");
