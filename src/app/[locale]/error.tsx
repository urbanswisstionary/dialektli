"use client"

import { useEffect } from "react"
import Link from "next/link"
import { TriangleAlert, RotateCcw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <TriangleAlert className="h-10 w-10 text-destructive" />
        </div>

        {/* Heading & description */}
        <h1 className="text-2xl font-bold text-foreground text-balance">
          Something Went Wrong
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
          An unexpected error occurred while loading this page. Please try
          again, or return to the home page.
        </p>

        {/* Error digest for debugging */}
        {error.digest && (
          <p className="mt-4 rounded-md bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
