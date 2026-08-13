import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatSeasonYear } from '@/lib/anime'
import type { FullAnimeInfoSelect } from '../_actions/get-full-anime'

interface AnimeSidebarProps {
  anime: FullAnimeInfoSelect
}

function InfoRow({ label, value }: { label: string, value: string | number | null | undefined }) {
  if (value == null || value === '') return null
  return (
    <div className="flex justify-between gap-2 text-sm py-1.5">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  )
}

export function AnimeSidebar({ anime }: AnimeSidebarProps) {
  const aired = [anime.startDate, anime.endDate].filter(Boolean).join(' – ') || null
  const seasonYear = formatSeasonYear(anime.season, anime.year)

  return (
    <aside className="lg:sticky lg:top-20 flex flex-col gap-4">
      <Card size="sm">
        <CardHeader>
          <CardTitle>Information</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-border/60">
          <InfoRow label="Type" value={anime.type} />
          <InfoRow label="Episodes" value={anime.episodes} />
          <InfoRow label="Status" value={anime.status} />
          <InfoRow label="Aired" value={aired} />
          <InfoRow label="Season" value={seasonYear} />
          <InfoRow
            label="Score"
            value={anime.score != null ? `${anime.score.toFixed(2)} / 10` : null}
          />
          <InfoRow label="Rank" value={anime.rank != null ? `#${anime.rank}` : null} />
          <InfoRow
            label="Popularity"
            value={anime.popularity != null ? `#${anime.popularity}` : null}
          />
        </CardContent>
      </Card>

      {anime.genres.length > 0 && (
        <Card size="sm">
          <CardHeader>
            <CardTitle>Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="mb-3" />
            <div className="flex flex-wrap gap-1.5">
              {anime.genres.map(g => (
                <Badge key={g.id} variant="secondary">
                  {g.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </aside>
  )
}
