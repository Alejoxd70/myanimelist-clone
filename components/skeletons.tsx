import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardHeader,
} from "@/components/ui/card"
export const AnimeCardSkeletonWrapper = () => {
  return (
    <div className="grid justify-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 xl:gap-6 2xl:gap-10">
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <AnimeCardSkeleton key={index} />
        )
      })}
    </div>
  )
}
export const AnimeCardSkeleton = () => {
  return (
    <Card className="h-85 w-full overflow-hidden">
      <Skeleton className="h-70 w-full" />
      <CardHeader>
        <Skeleton className="w-5/6 h-3" />
        <Skeleton className="w-3/6 h-3 mt-1" />
      </CardHeader>
    </Card>
  )
}