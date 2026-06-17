"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/types"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

/**
 * Clean Code Tip: Moving column definitions out of the main page 
 * makes the page component much easier to read.
 */
export const getUserColumns = (onDelete: (id: string) => void): ColumnDef<User>[] => [
  { 
    accessorKey: "name", 
    header: "Name",
    cell: ({ row }) => <span className="font-semibold text-indigo-900 dark:text-indigo-100">{row.original.name}</span>
  },
  { accessorKey: "email", header: "Email" },
  { 
    accessorKey: "role", 
    header: "Role",
    cell: ({ row }) => (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
        {row.original.role}
      </span>
    )
  },
  { accessorKey: "plan", header: "Plan" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.original.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'}`}>
        {row.original.status}
      </span>
    )
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
        onClick={(e) => {
          e.stopPropagation()
          if (confirm("Are you sure you want to delete this user?")) {
            onDelete(row.original.id)
          }
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    )
  }
]
