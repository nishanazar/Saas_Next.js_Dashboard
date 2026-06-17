"use client"

import React, { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { MobileSidebar } from "./mobile-sidebar"
import { SearchProvider } from "@/hooks/use-search"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop Sidebar */}
      <div className={`hidden md:block ${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300`}>
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
