"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navConfig } from "./nav-config"

interface SidebarProps {
  isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="h-full bg-slate-900 text-slate-200 p-4 flex flex-col gap-4 border-r border-slate-800">
      <div className="flex items-center gap-2 h-14 px-2">
         <div className="w-8 h-8 rounded-lg bg-indigo-500 flex-shrink-0" />
         {isOpen && <span className="font-bold text-lg text-white whitespace-nowrap">SaaS Analytics</span>}
      </div>
      
      <nav className="flex flex-col gap-1">
        {navConfig.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20" 
                  : "hover:bg-slate-800 hover:text-white"
              }`}
              title={!isOpen ? item.title : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="whitespace-nowrap font-medium">{item.title}</span>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
