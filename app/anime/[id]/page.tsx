import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchFullAnimeById } from './_data/get-full-anime'
import { AnimeHero } from './_components/anime-hero'
import { AnimeSidebar } from './_components/anime-sidebar'
import { AnimeSynopsis } from './_components/anime-synopsis'
import { SectionHeading } from './_components/section-heading'

interface PageProps {
  params: Promise<{ id: string }>
}

/** `/anime/abc` would otherwise send `NaN` straight into `findUnique`. */
function parseAnimeId(id: string): number {
  const animeId = Number(id)
  if (!Number.isInteger(animeId) || animeId <= 0) notFound()
  return animeId
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const anime = await fetchFullAnimeById(parseAnimeId(id))

  const description = anime.synopsis?.slice(0, 160) ?? undefined

  return {
    title: anime.title,
    description,
    openGraph: {
      title: anime.title,
      description,
      images: anime.imageUrl ? [anime.imageUrl] : undefined,
    },
  }
}

export default async function AnimeDescription({ params }: PageProps) {
  const { id } = await params
  const animeId = parseAnimeId(id)
  // dedupes the database query with `generateMetadata` thanks to `cache()`
  const anime = await fetchFullAnimeById(animeId)

  return (
    <>
      {/* Cancels the root layout so the banner runs edge to edge and sits flush under the sticky navbar. */}
      <div className="-mx-6 sm:-mx-8 lg:-mx-10 -mt-6">
        <AnimeHero anime={anime} />
      </div>

      <div className="max-w-6xl mx-auto py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 lg:gap-10">
          {/* Sidebar — below the synopsis on mobile, beside it from `lg` up */}
          <div className="order-2 lg:order-1">
            <AnimeSidebar anime={anime} />
          </div>

          {/* Main content */}
          <div className="order-1 lg:order-2 flex flex-col gap-8 min-w-0">
            <section>
              <SectionHeading>Synopsis</SectionHeading>
              <AnimeSynopsis synopsis={anime.synopsis} />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
