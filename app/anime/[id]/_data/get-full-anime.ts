import 'server-only'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { Prisma } from '@/app/generated/prisma/client'
import prisma from '@/lib/prisma'

const fullAnimeInfoSelect = {
  id: true,
  title: true,
  titleEnglish: true,
  titleJapanese: true,
  imageUrl: true,
  genres: { select: { id: true, name: true } },
  type: true,
  score: true,
  rank: true,
  popularity: true,
  episodes: true,
  season: true,
  year: true,
  status: true,
  synopsis: true,
  startDate: true,
  endDate: true,
} satisfies Prisma.AnimeSelect

export type FullAnimeInfoSelect = Prisma.AnimeGetPayload<{ select: typeof fullAnimeInfoSelect }>

// prevent two database queries for the same anime ID with the help of cache()
export const fetchFullAnimeById = cache(async (id: number): Promise<FullAnimeInfoSelect> => {
  const anime = await prisma.anime.findUnique({
    where: { id },
    select: fullAnimeInfoSelect,
    cacheStrategy: { ttl: 60, swr: 60 },
  })

  if (!anime) notFound()

  return anime
})
