-- AlterTable
ALTER TABLE "Contributor" ADD COLUMN "githubId" TEXT;
ALTER TABLE "Contributor" ADD COLUMN "contributions" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Contributor_githubId_key" ON "Contributor"("githubId");
