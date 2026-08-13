import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

/** Streamed in behind its own Suspense boundary while the session is resolved. */
export function AnimeListPanelSkeleton() {
  return (
    <Card size="sm">
      <CardHeader>
        <Skeleton className="h-4 w-16" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Skeleton className="h-8 w-full rounded-lg" />
        <Skeleton className="h-8 w-full rounded-lg" />
        <Skeleton className="h-8 w-full rounded-lg" />
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-8 w-full rounded-lg" />
      </CardContent>
    </Card>
  )
}

export function AnimeReviewsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-5 w-20" />
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="rounded-xl p-4 bg-muted/40 ring-1 ring-border/60 flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-3 w-1/2" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
          </div>
        </div>
      ))}
    </div>
  )
}

/** Whole-route fallback, rendered by `loading.tsx` during navigation. */
export function AnimeDetailSkeleton() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="relative w-full bg-muted/30 px-4 lg:px-6 pt-8 pb-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-6 lg:gap-10">
          {/* Poster */}
          <Skeleton className="w-40 sm:w-48 lg:w-56 aspect-2/3 shrink-0 rounded-xl mx-auto sm:mx-0" />

          {/* Info */}
          <div className="flex flex-col gap-3 flex-1">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
            <div className="flex gap-4 mt-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-16 rounded-full" />
              ))}
            </div>
            <div className="flex gap-3 mt-1">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-8 w-32 mt-2 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar skeleton */}
          <div className="flex flex-col gap-4">
            <Card size="sm">
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="flex justify-between py-1.5">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card size="sm">
              <CardHeader>
                <Skeleton className="h-4 w-14" />
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-16 rounded-full" />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main column skeleton */}
          <div className="flex flex-col gap-8">
            {/* Synopsis */}
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-24" />
              <div className="flex flex-col gap-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className={`h-3 ${i === 5 ? 'w-3/4' : 'w-full'}`} />
                ))}
              </div>
            </div>

            <AnimeListPanelSkeleton />
            <AnimeReviewsSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}
