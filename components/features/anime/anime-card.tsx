import Image from "next/image"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AnimeInfoSelect } from "@/lib/api/anime"

const placeholderImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="

interface AnimeCardGridProps {
  fetchFunction: () => Promise<AnimeInfoSelect[]>
}

export async function AnimeCardGrid({ fetchFunction }: AnimeCardGridProps) {
  const animeList = await fetchFunction();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-5 my-5">
      {animeList.map((anime, index) => (
        <AnimeCard key={anime.id} anime={anime} index={index} />
      ))}
    </div>
  )
}

interface AnimeCardProps {
  anime: AnimeInfoSelect;
  index: number
}

function AnimeCard({ anime, index }: AnimeCardProps) {
  return (
    <Card
      size="default"
      className="cursor-pointer relative group overflow-hidden pt-0 animate-in fade-in slide-in-from-bottom-3 fill-mode-both bg-background ring-0"
      style={{ animationDelay: `${index * 50}ms`, animationDuration: "400ms" }}
    >
      <div className="relative aspect-2/3 w-full overflow-hidden">
        <Image
          src={anime.imageUrl || placeholderImage}
          alt={anime.title}
          fill
          loading={index < 10 ? "eager" : "lazy"}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={placeholderImage}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <p className="block text-white text-sm font-medium line-clamp-2">
            {anime.title}
          </p>
        </div>
      </div>

      <CardHeader className="px-0 rounded-none h-10 overflow-hidden">
        <CardTitle className="line-clamp-2 text-sm group-hover:hidden">
          {anime.title}
        </CardTitle>
        <CardDescription className="hidden group-hover:block">
          <div className="flex justify-between">
            <p>{anime.type} {anime.episodes ? `| ${anime.episodes} eps` : ""}</p>
            <span className="text-accent font-bold">{anime.score}</span>
          </div>
          <p className="text-accent">{anime.status}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}