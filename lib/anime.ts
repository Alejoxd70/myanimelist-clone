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
