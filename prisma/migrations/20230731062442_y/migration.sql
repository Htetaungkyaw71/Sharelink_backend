-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_belongToId_fkey";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_belongToId_fkey" FOREIGN KEY ("belongToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
