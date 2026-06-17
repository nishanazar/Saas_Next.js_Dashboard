/**
 * DEVELOPER GUIDE: SaaS Analytics Dashboard
 * 
 * This project follows a modular, clean-architecture approach using Next.js 16.
 * 
 * ARCHITECTURE OVERVIEW:
 * 1. /app: Contains the routes and layout. Uses 'use client' where interactive.
 * 2. /components: Organized into 'ui' (primitives), 'dashboard' (charts/widgets), and 'layout'.
 * 3. /hooks: Custom TanStack Query hooks for server state management.
 * 4. /lib: Contains constants, utilities, and the core ApiService.
 * 5. /types: Centralized TypeScript definitions.
 * 
 * DATA FLOW:
 * UI -> Custom Hooks -> ApiService -> In-memory Mock Data
 * 
 * STYLING:
 * Uses Tailwind CSS v4 with a unified indigo/emerald theme.
 * All cards use: 'shadow-sm border-indigo-100 dark:border-indigo-900/50'
 */

"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { RevenueAreaChart } from "@/components/dashboard/charts/revenue-area-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { DollarSign, Users, UserPlus, CreditCard, Activity } from "lucide-react";
import { useUsers, useRevenue, useSubscriptions } from "@/hooks/use-analytics";
import { CardSkeleton } from "@/components/ui/skeletons/card-skeleton";
import * as React from "react";

export default function Home() {
  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: revenue, isLoading: revenueLoading } = useRevenue();
  const { data: subscriptions, isLoading: subsLoading } = useSubscriptions();

  // DERIVED STATE: Calculate dashboard stats from raw data
  const stats = React.useMemo(() => {
    if (!users || !revenue || !subscriptions) return null;

    return {
      totalUsers: users.length,
      activeUsersCount: users.filter(u => u.status === "Active").length,
      totalRevenue: revenue.reduce((sum, item) => sum + item.revenue, 0),
      activeSubscriptions: subscriptions.active || 0,
    };
  }, [users, revenue, subscriptions]);

  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(stats?.totalRevenue || 0);

  // LOADING STATE: Professional skeleton loaders
  if (usersLoading || revenueLoading || subsLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-indigo-950 dark:text-indigo-50">Dashboard Overview</h2>
          </div>
          <Breadcrumb />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-indigo-950 dark:text-indigo-50">Dashboard Overview</h2>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold bg-muted/50 border border-border/50 px-2 py-1 rounded">
            Last synced: {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        <Breadcrumb />

        {/* KPI SECTION: Summary of core business metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard 
            title="Total Revenue" 
            value={formattedRevenue} 
            icon={DollarSign} 
            growth="12.5%" 
            isPositive={true} 
            color="purple" 
          />
          <StatCard 
            title="Active Users" 
            value={(stats?.activeUsersCount || 0).toLocaleString()} 
            icon={Users} 
            growth="8%" 
            isPositive={true} 
            color="blue" 
          />
          <StatCard 
            title="Total Users" 
            value={(stats?.totalUsers || 0).toLocaleString()} 
            icon={UserPlus} 
            growth="5%" 
            isPositive={true} 
            color="green" 
          />
          <StatCard 
            title="Subscriptions" 
            value={(stats?.activeSubscriptions || 0).toLocaleString()} 
            icon={CreditCard} 
            growth="2.4%" 
            isPositive={true} 
            color="rose" 
          />
          <StatCard 
            title="API Requests" 
            value="1.2M" 
            icon={Activity} 
            growth="8%" 
            isPositive={true} 
            color="blue" 
          />
        </div>

        {/* MAIN VISUALS: Charts and recent activity side-by-side */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-10">
          <div className="lg:col-span-7">
            <RevenueAreaChart data={revenue} />
          </div>
          <div className="lg:col-span-3">
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
