'use client'
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-semibold">Page Not Found</h1>
      <p className="text-muted-foreground max-w-md">
        Where are you going buddy?
      </p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        <ArrowLeft data-icon="inline-start" />
        Back to Home
      </Link>
    </div>
  )
}