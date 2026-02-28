import prisma from '@/lib/prisma';
import { Prisma } from '@/app/generated/prisma/client';

const airingAnimeSelect = {
  id: true,
  title: true,
  imageUrl: true,
  genres: true,
  type: true,
  score: true,
  episodes: true,
  status: true,
} satisfies Prisma.AnimeSelect;

export type AnimeInfoSelect = Prisma.AnimeGetPayload<{ select: typeof airingAnimeSelect }>;

// Get Top Airing Anime
export async function getTopAiringAnime(): Promise<AnimeInfoSelect[]> {
  try {
    const data = await prisma.anime.findMany({
      where: {
        status: 'Currently Airing'
      },
      orderBy: {
        score: 'desc'
      },
      select: airingAnimeSelect,
      take: 6,
      cacheStrategy: { ttl: 60 },
    })

    return data;
  } catch (error) {
    console.error('Error fetching anime: ', error);
    throw error;
  }
}

export async function getTopAllTimeAnime(): Promise<AnimeInfoSelect[]> {
  try {
    const data = await prisma.anime.findMany({
      orderBy: {
        score: 'desc'
      },
      select: airingAnimeSelect,
      take: 6,
      cacheStrategy: { ttl: 60 },
    })

    return data;
  } catch (error) {
    console.error('Error fetching anime: ', error)
    throw error;
  }
}


