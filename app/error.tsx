'use client'

import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
      <p className="text-5xl font-bold text-destructive">Oops!</p>
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md">{error.message}</p>
      <Button variant="outline" onClick={() => reset()}>
        <RefreshCcw data-icon="inline-start" />
        Try Again
      </Button>
    </div>
  )
}