import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  growth: string
  isPositive: boolean
  color?: "blue" | "green" | "purple" | "rose" 
}

const colorStyles = {
  blue: "bg-blue-600 text-white",
  green: "bg-emerald-600 text-white",
  purple: "bg-violet-600 text-white",
  rose: "bg-rose-600 text-white",
}

export function StatCard({ title, value, icon: Icon, growth, isPositive, color = "blue" }: StatCardProps) {
  return (
    <Card className={`border-none shadow-md transition-all hover:shadow-lg ${colorStyles[color]}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium opacity-90">{title}</CardTitle>
        <Icon className="w-5 h-5 opacity-80" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <p className={`text-xs font-medium mt-1 opacity-90`}>
          {isPositive ? "↑" : "↓"} {growth} <span className="opacity-75">vs last mo.</span>
        </p>
      </CardContent>
    </Card>
  )
}
