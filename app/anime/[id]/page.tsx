import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchFullAnimeById } from './_actions/get-full-anime'
import { AnimeHero } from './_components/anime-hero'
import { AnimeSidebar } from './_components/anime-sidebar'
import { AnimeSynopsis } from './_components/anime-synopsis'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ reviews?: string }>
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

  return {
    title: anime.title,
    description: anime.synopsis?.slice(0, 160) ?? undefined,
  }
}

export default async function AnimeDescription({ params, searchParams }: PageProps) {
  const { id } = await params
  const animeId = parseAnimeId(id)

  // Deduped with `generateMetadata` by the `cache()` wrapper, and served from
  // Accelerate, so awaiting it here does not meaningfully block the shell. The
  // session-dependent queries below stream in behind their own boundaries.
  //
  // `searchParams` is deliberately *not* read here: touching it in the shell
  // starts the response before `notFound()` can run, which downgrades a real
  // 404 into a 200 with client-rendered content. It is awaited inside the
  // reviews boundary, which is the only place that needs it.
  const anime = await fetchFullAnimeById(animeId)

  return (
    <>
      <AnimeHero anime={anime} />

      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <AnimeSidebar anime={anime} />

          {/* Main content */}
          <div className="flex flex-col gap-8 min-w-0">
            {/* Synopsis */}
            <section>
              <h2 className="font-semibold text-base mb-3">Synopsis</h2>
              <AnimeSynopsis synopsis={anime.synopsis} />
            </section>

          </div>
        </div>
      </div>
    </>
  )
}
