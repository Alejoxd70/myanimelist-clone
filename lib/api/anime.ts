import prisma from '@/lib/prisma';
import { Prisma } from '@/app/generated/prisma/client';

const airingAnimeSelect = {
  id: true,
  title: true,
  imageUrl: true,
} satisfies Prisma.AnimeSelect;

export type AiringAnime = Prisma.AnimeGetPayload<{ select: typeof airingAnimeSelect }>;

export async function getTopAiringAnime(): Promise<AiringAnime[]> {
  try {
    const data = await prisma.anime.findMany({
      where: {
        status: 'Currently Airing'
      },
      orderBy: {
        score: 'desc'
      },
      select: airingAnimeSelect,
      take: 25,
      cacheStrategy: { ttl: 60 }
    })

    return data;
  } catch (error) {
    console.error('Error fetching anime: ', error);
    throw error;
  }
} 