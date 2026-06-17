"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { revenueData } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SubscriptionChart({ data }: { data?: any[] }) {
  return (
    <Card className="shadow-sm border-violet-100">
      <CardHeader>
        <CardTitle className="text-violet-700">Subscription Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data || []}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="subscriptions" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
