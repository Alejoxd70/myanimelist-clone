import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatAiredRange, formatSeasonYear } from '@/lib/anime'
import type { FullAnimeInfoSelect } from '@/app/anime/[id]/_data/get-full-anime'

interface AnimeSidebarProps {
  anime: FullAnimeInfoSelect
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string
  value: string | number | null | undefined
  icon?: React.ReactNode
}) {
  if (value == null || value === '') return null
  return (
    <div className="flex justify-between items-center gap-3 py-2">
      <span className="text-xs uppercase tracking-wide text-muted-foreground shrink-0">
        {label}
      </span>
      <span className="flex items-center gap-1.5 text-right text-sm font-medium">
        {icon}
        {value}
      </span>
    </div>
  )
}

/** Airing state as a colour, so the row reads at a glance. */
function statusDotClass(status: string | null): string {
  const normalized = status?.toLowerCase() ?? ''
  if (normalized.includes('currently')) return 'bg-chart-3'
  if (normalized.includes('finished')) return 'bg-accent'
  if (normalized.includes('not yet')) return 'bg-muted-foreground'
  return 'bg-muted-foreground'
}

export function AnimeSidebar({ anime }: AnimeSidebarProps) {
  const { startDate, endDate, type, season, year, episodes, status } = anime
  const aired = formatAiredRange(startDate, endDate, type)
  const seasonYear = formatSeasonYear(season, year)

  return (
    <aside
      className="lg:sticky lg:top-20 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-3 fill-mode-both motion-reduce:animate-none"
      style={{ animationDelay: '150ms', animationDuration: '400ms' }}
    >
      <Card size="sm">
        <CardHeader className="border-b">
          <CardTitle>Information</CardTitle>
        </CardHeader>
        {/* Score, rank and popularity deliberately live in the hero's stat rail only */}
        <CardContent className="flex flex-col divide-y divide-border/60">
          <InfoRow label="Type" value={type} />
          <InfoRow label="Episodes" value={episodes} />
          <InfoRow
            label="Status"
            value={status}
            icon={(
              <span
                aria-hidden
                className={cn('size-1.5 shrink-0 rounded-full', statusDotClass(status))}
              />
            )}
          />
          <InfoRow label="Aired" value={aired} />
          <InfoRow label="Premiered" value={seasonYear} />
        </CardContent>
      </Card>
    </aside>
  )
}
