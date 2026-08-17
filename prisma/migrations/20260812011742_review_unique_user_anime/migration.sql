-- DropIndex
DROP INDEX "review_userId_animeId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "review_userId_animeId_key" ON "review"("userId", "animeId");

