import prisma from "@/lib/prisma";

const JIKAN = "https://api.jikan.moe/v4";

type JikanFilter = 'airing' | 'favorite' | '';

let animeCount = 1

interface JikanAnimeGenre {
  mal_id: number;
  name: string;
}

async function seedPage(filter: JikanFilter, page: number) {

  const res = await fetch(`${JIKAN}/top/anime?page=${page}&limit=25&filter=${filter}`);
  if (!res.ok) throw new Error(`JIKAN API error:  ${res.status + ' ' + res.statusText}`);

  const json = await res.json();

  for (const item of json.data) {
    // uspsert genres 
    const genreRecords = await Promise.all(
      (item.genres ?? []).map((g: JikanAnimeGenre) =>
        prisma.genre.upsert({
          where: { id: g.mal_id },
          update: {},
          create: {
            id: g.mal_id,
            name: g.name
          },
        })
      )
    );

    await prisma.anime.upsert({
      where: { id: item.mal_id },
      update: {
        score: item.score,
        rank: item.rank,
        popularity: item.popularity,
        status: item.status,
        episodes: item.episodes,
        year: item.year,
        season: item.season,
      },
      create: {
        id: item.mal_id,
        title: item.title,
        titleEnglish: item.title_english,
        titleJapanese: item.title_japanese,
        synopsis: item.synopsis,
        imageUrl: item.images?.jpg?.large_image_url,
        type: item.type,
        episodes: item.episodes,
        status: item.status,
        score: item.score,
        rank: item.rank,
        popularity: item.popularity,
        startDate: item.aired?.from,
        endDate: item.aired?.to,
        year: item.year,
        season: item.season,
        genres: { connect: genreRecords.map(g => ({ id: g.id })) }
      },
    });
    console.log(`Anime Seeded done! ${item.title} (${item.mal_id}) - ${filter} - page ${page} - Total Count: ${animeCount++}`);
  }
}

async function main() {
  console.log("Seeding anime from JIKAN API....");

  const filters: JikanFilter[] = ['airing', 'favorite', ''];

  for (const filter of filters) {
    for (let page = 1; page <= 3; page++) {
      await seedPage(filter, page);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  console.log("Seeding Completed!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); process.exit(1); })