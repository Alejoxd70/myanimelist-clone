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
cache
export type AnimeInfoSelect = Prisma.AnimeGetPayload<{ select: typeof shortAnimeSelect }>

export const fetchAnimeGeneralFunction = cache (async (fetchOptions: Prisma.AnimeFindManyArgs): Promise<AnimeInfoSelect[]> => {
  try {
    const data = await prisma.anime.findMany({
      ...fetchOptions,
      select: shortAnimeSelect,
      take: 6,
      cacheStrategy: { ttl: 60, swr: 60 },
    })
    return data
  }
  catch (error) {
    console.error('Error fetching anime: ', error)
    throw error
  }
})
