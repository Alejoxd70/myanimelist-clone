'use client'

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <>
      <div className="flex justify-center items-center text-center h-screen">
        <div>
          <h1 className="font-bold text-2xl p-2">Something went wrong!</h1>
          <p className="text-muted-foreground">{error.message}</p>
          <Button
            className="mt-4 cursor-pointer"
            variant='outline'
            onClick={() => reset()}
          >
            <RefreshCcw data-icon='inline-start' /> Try Again
          </Button>
        </div>
      </div>
    </>
  )
}