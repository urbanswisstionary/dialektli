import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Search bar skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      {/* Filter skeleton */}
      <div className="mt-4">
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>

      {/* Card skeletons */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Skeleton className="h-5 w-32 rounded" />
                <div className="mt-2 flex gap-2">
                  <Skeleton className="h-5 w-10 rounded-full" />
                  <Skeleton className="h-5 w-10 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-8 w-8 rounded" />
            </div>
            <Skeleton className="mt-3 h-4 w-full rounded" />
            <Skeleton className="mt-2 h-4 w-3/4 rounded" />
            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-4 w-24 rounded" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16 rounded" />
                <Skeleton className="h-8 w-16 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
