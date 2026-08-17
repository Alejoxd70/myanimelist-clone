'use client'

import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { RefreshCcw, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AnimeDetailError({ error, reset }: ErrorProps) {
  const router = useRouter()
  const handleReset = () => {
    reset()
    router.refresh()
  }

  return (
    <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
      <p className="text-5xl font-bold text-destructive">Oops!</p>
      <h1 className="text-2xl font-semibold">We couldn&apos;t load this anime</h1>
      <p className="text-muted-foreground max-w-md">{error.message}</p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleReset}>
          <RefreshCcw data-icon="inline-start" />
          Try Again
        </Button>
        <Link href="/anime" className={buttonVariants({ variant: 'ghost' })}>
          <ArrowLeft data-icon="inline-start" />
          Browse Anime
        </Link>
      </div>
    </div>
  )
}
