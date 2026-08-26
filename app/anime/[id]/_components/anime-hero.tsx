import Image from 'next/image'
import Link from 'next/link'
import { Star, Award, TrendingUp, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatSeasonYear, placeholderImage } from '@/lib/anime'
import { HeroActions } from './hero-actions'
import type { FullAnimeInfoSelect } from '@/app/anime/[id]/_data/get-full-anime'

interface AnimeHeroProps {
  anime: FullAnimeInfoSelect
}

interface StatTileProps {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}

function StatTile({ label, icon, children }: StatTileProps) {
  return (
    <div className="min-w-24 rounded-lg bg-card/70 px-3 py-2 ring-1 ring-border/60 backdrop-blur-sm">
      <p className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-0.5 text-lg font-semibold leading-none tabular-nums">
        {children}
      </p>
    </div>
  )
}

export function AnimeHero({ anime }: AnimeHeroProps) {
  const { id, genres, imageUrl, score, rank, popularity, season, year, title, titleEnglish, episodes, status, titleJapanese, type } = anime
  const seasonYear = formatSeasonYear(season, year)
  const hasStats = score != null || rank != null || popularity != null

  return (
    // `bg-muted/40` keeps the banner readable as a distinct band even when the
    // artwork blurs down to something as dark as the page background.
    <section className="relative w-full overflow-hidden border-b border-border/50 bg-muted/40">
      {/* Backdrop — the poster art, blurred out into a cinematic wash */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {imageUrl
          ? (
              <Image
                src={imageUrl}
                alt=""
                fill
                className="object-cover object-top blur-3xl scale-125 saturate-150 opacity-60 dark:opacity-50"
                sizes="100vw"
                placeholder="blur"
                blurDataURL={placeholderImage}
              />
            )
          : (
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-accent/10" />
            )}
        {/* Vertical scrim — keeps text legible and resolves the banner into the
            page background. Kept light enough that the colour wash survives. */}
        <div className="absolute inset-0 bg-linear-to-b from-background/45 via-background/65 to-background" />
      </div>

      {/* Content restores the horizontal padding the page-level breakout removed */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pt-6 pb-10 lg:pt-8 lg:pb-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1 text-xs text-muted-foreground"
        >
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="size-3 shrink-0" aria-hidden />
          <Link href="/anime" className="hover:text-foreground transition-colors">Anime</Link>
          <ChevronRight className="size-3 shrink-0" aria-hidden />
          {/* `min-w-0` lets the flex item shrink so `truncate` can engage — without
              it a long title forces the whole document wider than the viewport. */}
          <span className="min-w-0 truncate text-foreground/80" aria-current="page">
            {title}
          </span>
        </nav>

        <div className="flex flex-col sm:flex-row gap-6 lg:gap-10">
          {/* Poster — the only `priority` image, so it is an unambiguous LCP hint */}
          <div
            className="relative w-40 sm:w-48 lg:w-56 shrink-0 mx-auto sm:mx-0 animate-in fade-in slide-in-from-bottom-3 fill-mode-both motion-reduce:animate-none"
            style={{ animationDuration: '400ms' }}
          >
            <div className="relative aspect-2/3 w-full rounded-xl overflow-hidden bg-muted shadow-xl ring-1 ring-foreground/10">
              <Image
                src={imageUrl || placeholderImage}
                alt={title}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
                placeholder="blur"
                blurDataURL={placeholderImage}
              />
            </div>
          </div>

          {/* Anime Info */}
          <div
            className="flex flex-col gap-3 min-w-0 flex-1 text-center sm:text-left animate-in fade-in slide-in-from-bottom-3 fill-mode-both motion-reduce:animate-none"
            style={{ animationDelay: '75ms', animationDuration: '400ms' }}
          >
            {titleJapanese && (
              <p className="text-muted-foreground text-sm tracking-wide line-clamp-1">
                {titleJapanese}
              </p>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-balance">
              {title}
            </h1>

            {titleEnglish && titleEnglish !== title && (
              <p className="text-muted-foreground text-sm sm:text-base -mt-1">
                {titleEnglish}
              </p>
            )}

            {/* score / rank / popularity */}
            {hasStats && (
              <div className="mt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                {score != null && (
                  <StatTile
                    label="Score"
                    icon={<Star className="size-3 text-primary fill-primary" aria-hidden />}
                  >
                    {score.toFixed(2)}
                    <span className="ml-0.5 text-xs font-normal text-muted-foreground">/10</span>
                  </StatTile>
                )}
                {rank != null && (
                  <StatTile
                    label="Ranked"
                    icon={<Award className="size-3 text-accent" aria-hidden />}
                  >
                    #
                    {rank.toLocaleString()}
                  </StatTile>
                )}
                {popularity != null && (
                  <StatTile
                    label="Popularity"
                    icon={<TrendingUp className="size-3 text-accent" aria-hidden />}
                  >
                    #
                    {popularity.toLocaleString()}
                  </StatTile>
                )}
              </div>
            )}

            {/* Genres — the only genre display on the page */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                {genres.map(g => (
                  <Badge key={g.id} variant="secondary">
                    {g.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* type / episodes / status / season */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground items-center justify-center sm:justify-start">
              {type && (
                <span className="text-foreground font-medium">{type}</span>
              )}
              {episodes != null && (
                <>
                  <Separator orientation="vertical" className="h-auto" />
                  <span>
                    {episodes}
                    {' '}
                    eps
                  </span>
                </>
              )}
              {status && (
                <>
                  <Separator orientation="vertical" className="h-auto" />

                  <span>
                    {status}
                  </span>
                </>
              )}
              {seasonYear && (
                <>
                  <Separator orientation="vertical" className="h-auto" />
                  <span>
                    {seasonYear}
                  </span>
                </>
              )}
            </div>

            <div className="mt-2">
              <HeroActions animeId={id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
