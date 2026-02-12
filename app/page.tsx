import { Suspense } from "react";
import { AnimeCardSkeleton } from "@/components/skeletons";
import { AnimeCard } from "@/components/features/anime/anime-card";

export default async function Home() {


  return (
    <>
      <h1>Top Airing Anime</h1>
      <Suspense fallback={<AnimeCardSkeleton />}>
        <AnimeCard />
      </Suspense>
    </>
  )
}