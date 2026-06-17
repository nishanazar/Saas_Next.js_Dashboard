import { Skeleton } from "@/components/ui/skeleton"

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-[300px] w-full" />
    </div>
  )
}
