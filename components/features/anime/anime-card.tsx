import Image from "next/image"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getTopAiringAnime } from "@/lib/api/anime"

const placeHolderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=='

export async function AnimeCard() {

  const animeList = await getTopAiringAnime();

  return (
    <>
      {/*  */}
      <div className="grid justify-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 xl:gap-6 2xl:gap-10">
        {
          animeList.map((anime) => {
            return (
              <div key={anime.id}>
                <Card size="default"
                  className="h-86 cursor-pointer transition-transform duration-300 shadow-md shadow-primary/40 relative group overflow-hidden pt-0"
                >
                  <Image
                    src={anime.imageUrl || placeHolderImage}
                    alt={anime.title}
                    width={225}
                    height={320}
                    loading="eager"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover object-top h-70 w-full transition-transform duration-300 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={placeHolderImage}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white text-sm font-medium line-clamp-2">{anime.title}</p>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:hidden">{anime.title}</CardTitle>
                  </CardHeader>
                </Card>

              </div>
            )
          })
        }
      </div>
    </>
  )
}