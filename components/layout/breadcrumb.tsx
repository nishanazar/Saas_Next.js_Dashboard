"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export function Breadcrumb() {
  const pathname = usePathname()
  const paths = pathname.split("/").filter(path => path)

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-500 mb-4 dark:text-gray-400">
      <Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>
      {paths.map((path, index) => {
        if (path === "dashboard") return null
        const href = `/${paths.slice(0, index + 1).join("/")}`
        const label = path.charAt(0).toUpperCase() + path.slice(1)
        
        return (
          <div key={href} className="flex items-center gap-1">
            <ChevronRight className="w-4 h-4" />
            <Link 
              href={href} 
              className={
                index === paths.length - 1 
                  ? "text-gray-900 dark:text-gray-100 font-medium" 
                  : "hover:text-blue-600 dark:hover:text-blue-400"
              }
            >
              {label}
            </Link>
          </div>
        )
      })}
    </nav>
  )
}
