"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, User, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileSidebar } from "./mobile-sidebar"
import { useSearch } from "@/hooks/use-search"

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { searchQuery, setSearchQuery } = useSearch()

  return (
    <header className="sticky top-0 z-10 h-16 bg-background border-b border-border flex items-center px-4 justify-between">
      <div className="flex items-center gap-2">
        {/* Mobile menu - only visible on small screens */}
        <MobileSidebar />
        
        {/* Desktop toggle - only visible on md and up */}
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="hidden md:flex">
          <Menu className="w-5 h-5" />
        </Button>

        <div className="relative w-64 hidden md:block ml-2">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search users or metrics..." 
            className="pl-9 h-9 border-indigo-100 focus-visible:ring-indigo-500" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="scale-90 sm:scale-100">
          <ThemeToggle />
        </div>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <User className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
    </header>
  )
}
