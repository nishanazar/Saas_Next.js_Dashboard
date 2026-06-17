"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { Users, DollarSign, ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

const distData = [
  { name: "Free", value: 400 },
  { name: "Pro", value: 300 },
  { name: "Enterprise", value: 200 },
]

const COLORS = ["#94a3b8", "#3b82f6", "#8b5cf6"]

export default function SubscriptionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Subscriptions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Active Subscriptions" value="920" icon={Users} growth="5%" isPositive={true} />
          <StatCard title="MRR" value="$12,450" icon={DollarSign} growth="12%" isPositive={true} />
          <StatCard title="Churn Rate" value="2.4%" icon={ArrowDownRight} growth="0.5%" isPositive={true} />
          <StatCard title="Upgrade Rate" value="4.1%" icon={ArrowUpRight} growth="1.2%" isPositive={true} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={distData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {distData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
