import { AlertCircle, RefreshCw, Database, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StateProps {
  title: string
  message: string
  icon: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

function BaseState({ title, message, icon, action }: StateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-xl border-dashed bg-muted/20">
      <div className="p-4 mb-4 rounded-full bg-muted">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-sm mt-1 mb-4 text-muted-foreground">{message}</p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  )
}

export const NoDataState = () => (
  <BaseState
    title="No Data Available"
    message="There is no data to display for the selected period."
    icon={<Database className="w-8 h-8 text-muted-foreground" />}
  />
)

export const NetworkErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <BaseState
    title="Network Error"
    message="We are having trouble connecting to the server. Please check your connection."
    icon={<AlertCircle className="w-8 h-8 text-rose-500" />}
    action={{ label: "Retry", onClick: onRetry }}
  />
)

export const EmptyResultsState = () => (
  <BaseState
    title="No Results Found"
    message="Your search did not return any results. Try adjusting your filters."
    icon={<Search className="w-8 h-8 text-muted-foreground" />}
  />
)

export const ServerErrorState = () => (
  <BaseState
    title="Something Went Wrong"
    message="An unexpected error occurred on our servers. Our team has been notified."
    icon={<RefreshCw className="w-8 h-8 text-amber-500" />}
  />
)
