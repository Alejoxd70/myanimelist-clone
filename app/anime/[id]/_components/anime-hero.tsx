'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Award, TrendingUp, ListPlus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { formatSeasonYear, placeholderImage } from '@/lib/anime'
import type { FullAnimeInfoSelect } from '../_actions/get-full-anime'

interface AnimeHeroProps {
  anime: FullAnimeInfoSelect
}

export function AnimeHero({ anime }: AnimeHeroProps) {
  const seasonYear = formatSeasonYear(anime.season, anime.year)

  return (
    <section className="relative w-full overflow-hidden">
      {/* Blurred background */}
      {anime.imageUrl && (
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src={anime.imageUrl}
            alt=""
            fill
            className="object-cover blur-2xl scale-110 opacity-20 dark:opacity-10"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={placeholderImage}
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/70 to-background" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-6 pt-8 pb-10 flex flex-col sm:flex-row gap-6 lg:gap-10">
        {/* Poster — the only `priority` image, so it is an unambiguous LCP hint */}
        <div className="relative w-40 sm:w-48 lg:w-56 shrink-0 mx-auto sm:mx-0">
          <div className="relative aspect-2/3 w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-foreground/10">
            <Image
              src={anime.imageUrl || placeholderImage}
              alt={anime.title}
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
              placeholder="blur"
              blurDataURL={placeholderImage}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3 min-w-0 flex-1 text-center sm:text-left">
          {anime.titleJapanese && (
            <p className="text-muted-foreground text-sm tracking-wide truncate">
              {anime.titleJapanese}
            </p>
          )}

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            {anime.title}
          </h1>

          {anime.titleEnglish && anime.titleEnglish !== anime.title && (
            <p className="text-muted-foreground text-sm -mt-1">{anime.titleEnglish}</p>
          )}

          {/* Score + rank + popularity */}
          <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start mt-1">
            {anime.score != null && (
              <div className="flex items-center gap-1.5">
                <Star className="size-4 text-primary fill-primary" />
                <span className="font-bold text-lg leading-none">{anime.score.toFixed(2)}</span>
                <span className="text-muted-foreground text-sm">/10</span>
              </div>
            )}
            {anime.rank != null && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Award className="size-4 text-accent" />
                <span>
                  Ranked
                  {' '}
                  <span className="text-foreground font-semibold">
                    #
                    {anime.rank}
                  </span>
                </span>
              </div>
            )}
            {anime.popularity != null && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <TrendingUp className="size-4 text-accent" />
                <span>
                  Popularity
                  {' '}
                  <span className="text-foreground font-semibold">
                    #
                    {anime.popularity}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Genres */}
          {anime.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
              {anime.genres.map(g => (
                <Badge key={g.id} variant="secondary">
                  {g.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Stat chips */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground items-center justify-center sm:justify-start">
            {anime.type && (
              <span className="text-foreground font-medium">{anime.type}</span>
            )}
            {anime.episodes != null && (
              <span>
                ·
                {' '}
                {anime.episodes}
                {' '}
                eps
              </span>
            )}
            {anime.status && (
              <span>
                ·
                {' '}
                {anime.status}
              </span>
            )}
            {seasonYear && (
              <span>
                ·
                {' '}
                {seasonYear}
              </span>
            )}
          </div>

          {/* CTA — jumps to the panel, which is the single owner of the entry */}
          <div className="mt-2 flex justify-center sm:justify-start">
            <Link href="#my-list" className={buttonVariants({ variant: 'default' })}>
              <ListPlus data-icon="inline-start" />
              Add to List
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
