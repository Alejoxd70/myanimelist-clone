-- CreateIndex
CREATE INDEX "anime_status_idx" ON "anime"("status");

-- CreateIndex
CREATE INDEX "anime_score_idx" ON "anime"("score");

-- CreateIndex
CREATE INDEX "anime_year_season_idx" ON "anime"("year", "season");

-- CreateIndex
CREATE INDEX "anime_popularity_idx" ON "anime"("popularity");

-- CreateIndex
CREATE INDEX "review_userId_animeId_idx" ON "review"("userId", "animeId");
