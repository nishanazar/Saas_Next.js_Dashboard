"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { revenueData } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RevenueAreaChart({ data }: { data?: any[] }) {
  return (
    <Card className="shadow-sm border-indigo-100">
      <CardHeader>
        <CardTitle className="text-indigo-700">Revenue Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data || []}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
