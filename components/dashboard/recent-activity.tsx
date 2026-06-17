"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, UserPlus, CreditCard, AlertCircle } from "lucide-react"
import { useSearch } from "@/hooks/use-search"
import * as React from "react"

const initialActivities = [
  {
    id: 1,
    type: "user",
    content: "New user registered",
    user: "Sarah Chen",
    initials: "SC",
    time: "2 minutes ago",
    icon: UserPlus,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    type: "payment",
    content: "Subscription upgraded to Pro",
    user: "Alex Rivera",
    initials: "AR",
    time: "45 minutes ago",
    icon: CreditCard,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    id: 3,
    type: "system",
    content: "Monthly report generated",
    user: "System",
    initials: "SY",
    time: "2 hours ago",
    icon: CheckCircle2,
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    id: 4,
    type: "alert",
    content: "Failed login attempt detected",
    user: "Unknown IP",
    initials: "??",
    time: "5 hours ago",
    icon: AlertCircle,
    iconColor: "text-rose-500",
    bgColor: "bg-rose-50",
  },
]

export function RecentActivity() {
  const { searchQuery } = useSearch()

  const filteredActivities = React.useMemo(() => {
    if (!searchQuery) return initialActivities
    return initialActivities.filter(activity => 
      activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <Card className="h-full shadow-sm border-indigo-100 dark:border-indigo-900/50">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-indigo-900 dark:text-indigo-100">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredActivities.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground text-sm">
              No activity matching "{searchQuery}"
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="relative">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${activity.bgColor} ${activity.iconColor}`}>
                    {activity.initials}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 p-1 rounded-full bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 ${activity.iconColor}`}>
                    <activity.icon className="w-2 h-2" />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <span className="font-bold text-indigo-950 dark:text-indigo-200">{activity.user}</span>
                    {" "}{activity.content}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
