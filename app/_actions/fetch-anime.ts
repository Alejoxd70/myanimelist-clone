import 'server-only'
import prisma from '@/lib/prisma'
import { Prisma } from '@/app/generated/prisma/client'
import { cache } from 'react'

const shortAnimeSelect = {
  id: true,
  title: true,
  imageUrl: true,
  genres: { select: { id: true, name: true } },
  type: true,
  score: true,
  episodes: true,
  status: true,
} satisfies Prisma.AnimeSelect

export type AnimeInfoSelect = Prisma.AnimeGetPayload<{ select: typeof shortAnimeSelect }>

type AnimeListOptions = Pick<Prisma.AnimeFindManyArgs, 'where' | 'orderBy'>

/**
 * Shared query body. Deliberately not exported: callers pick one of the named
 * wrappers below so no caller can widen `where` into a relation traversal
 * (`userEntries -> user -> email`), which would leak user data if this module
 * ever became reachable from the client.
 */
async function fetchAnimeList(
  { where, orderBy }: AnimeListOptions,
  limit: number,
): Promise<AnimeInfoSelect[]> {
  try {
    return await prisma.anime.findMany({
      where,
      orderBy,
      select: shortAnimeSelect,
      take: limit,
      cacheStrategy: { ttl: 60, swr: 60 },
    })
  }
  catch (error) {
    console.error('Error fetching anime: ', error)
    throw error
  }
}

/**
 * Wrapped in `cache()` so repeat calls within one request share a single query.
 * The argument must stay primitive — `cache` compares arguments with `Object.is`,
 * so an object literal built at the call site would miss the memo every time.
 */
export const fetchTopAiringAnime = cache((limit = 6): Promise<AnimeInfoSelect[]> =>
  fetchAnimeList(
    { where: { status: 'Currently Airing' }, orderBy: { score: 'desc' } },
    limit,
  ))

export const fetchTopAllTimeAnime = cache((limit = 6): Promise<AnimeInfoSelect[]> =>
  fetchAnimeList({ orderBy: { score: 'desc' } }, limit))
