"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by only rendering after mounting
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-10 w-[120px] bg-muted animate-pulse rounded-md" />
  }

  return (
    <div className="flex items-center gap-1 rounded-md border p-1 bg-background">
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        size="icon"
        className="h-8 w-8"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="icon"
        className="h-8 w-8"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        size="icon"
        className="h-8 w-8"
        onClick={() => setTheme("system")}
      >
        <Laptop className="h-4 w-4" />
      </Button>
    </div>
  )
}
