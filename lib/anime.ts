/** 1×1 PNG used as the `blurDataURL` and the fallback src for anime artwork. */
export const placeholderImage
  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=='

/**
 * Formats the raw `season` / `year` columns for display, e.g. `('WINTER', 2024)`
 * becomes `'Winter 2024'`. Returns `null` when neither value is known so callers
 * can skip rendering the row entirely.
 */
export function formatSeasonYear(season: string | null, year: number | null): string | null {
  const parts = [
    season ? season.charAt(0).toUpperCase() + season.slice(1).toLowerCase() : null,
    year,
  ].filter(Boolean)

  return parts.length > 0 ? parts.join(' ') : null
}

/** `'2009-04-05T00:00:00+00:00'` becomes `'Apr 5, 2009'`. */
function formatAiredDate(value: string | null): string | null {
  if (!value) return null

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/**
 * Formats the raw `startDate` / `endDate` columns into a display range, e.g.
 * `'Apr 5, 2009 – Jul 4, 2010'`. A still-airing show has no end date, so it
 * renders as `'Apr 5, 2009 – ?'`. Returns `null` when neither date is known.
 */
export function formatAiredRange(startDate: string | null, endDate: string | null): string | null {
  const start = formatAiredDate(startDate)
  const end = formatAiredDate(endDate)

  if (!start && !end) return null
  if (!start) return end
  if (!end) return `${start} – ?`

  return `${start} – ${end}`
}
