"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { RevenueAreaChart } from "@/components/dashboard/charts/revenue-area-chart"
import { UserGrowthChart } from "@/components/dashboard/charts/user-growth-chart"
import { SubscriptionChart } from "@/components/dashboard/charts/subscription-chart"
import { Button } from "@/components/ui/button"
import { useRevenue } from "@/hooks/use-analytics"
import { ChartSkeleton } from "@/components/ui/skeletons/chart-skeleton"

const filters = ["Last 7 days", "Last 30 days", "Last 90 days", "Last 12 months"]

export default function AnalyticsPage() {
  const [activeFilter, setActiveFilter] = useState("Last 30 days")
  const { data: revenueData, isLoading } = useRevenue()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
            <p className="text-muted-foreground mt-1">Detailed performance metrics and insights.</p>
          </div>
          <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "ghost"}
                size="sm"
                className={activeFilter === filter ? "shadow-sm" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            <ChartSkeleton />
            <ChartSkeleton />
            <div className="md:col-span-2">
              <ChartSkeleton />
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Revenue Analytics */}
            <RevenueAreaChart data={revenueData} />
            
            {/* User Analytics */}
            <UserGrowthChart data={revenueData} />

            {/* Subscription Analytics */}
            <div className="md:col-span-2">
              <SubscriptionChart data={revenueData} />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
