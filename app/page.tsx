import { Suspense } from "react";
import { AnimeCardSkeletonGrid } from "@/components/skeletons";
import { AnimeCardGrid } from "@/components/features/anime/anime-card";
import { getTopAiringAnime, getTopAllTimeAnime } from "@/lib/api/anime";

export default async function Home() {


  return (
    <>
      <div className="flex justify-center flex-col text-center mb-5">
        <h1 className="text-3xl font-medium">
          Anime and Manga{" "}
          <span className="block text-2xl font-normal bg-linear-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
            Anytime Anywhere Whenever
          </span>
        </h1>
        <h2>Track, Discover, and Enjoy your favorite Anime and Manga </h2>

      </div>

      <h2 className="font-bold uppercase mb-2">Top Airing Anime</h2>
      <Suspense fallback={<AnimeCardSkeletonGrid />}>
        <AnimeCardGrid fetchFunction={getTopAiringAnime} />
      </Suspense>

      <h2 className="font-bold uppercase mt-3 mb-2">Top All Time Anime</h2>
      <Suspense fallback={<AnimeCardSkeletonGrid />}>
        <AnimeCardGrid fetchFunction={getTopAllTimeAnime} />
      </Suspense>
    </>
  )
}