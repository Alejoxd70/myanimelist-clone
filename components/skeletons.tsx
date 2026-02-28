import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardHeader,
} from "@/components/ui/card"

export const AnimeCardSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <AnimeCardSkeleton key={index} />
      ))}
    </div>
  )
}

export const AnimeCardSkeleton = () => {
  return (
    <Card className="w-full overflow-hidden">
      <Skeleton className="aspect-2/3 w-full" />
      <CardHeader>
        <Skeleton className="w-5/6 h-3" />
        <Skeleton className="w-3/6 h-3 mt-1" />
      </CardHeader>
    </Card>
  )
}