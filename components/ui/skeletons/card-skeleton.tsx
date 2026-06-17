import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}
