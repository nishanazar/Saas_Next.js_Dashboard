"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { CreateUserForm } from "@/components/forms/create-user-form"
import { Plus, Download, SearchX } from "lucide-react"
import { useUsers, useDeleteUser } from "@/hooks/use-analytics"
import { User } from "@/types"
import { TableSkeleton } from "@/components/ui/skeletons/table-skeleton"
import { getUserColumns } from "@/components/users/user-columns"
import { useSearch } from "@/hooks/use-search"

export default function UsersPage() {
  const { data: users, isLoading, error } = useUsers()
  const { mutate: deleteUser } = useDeleteUser()
  const { searchQuery } = useSearch()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

  // Filter users based on search query
  const filteredUsers = React.useMemo(() => {
    if (!users) return []
    if (!searchQuery) return users
    return users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [users, searchQuery])

  const columns = React.useMemo(() => getUserColumns(deleteUser), [deleteUser])

  const handleExportCSV = () => {
    const dataToExport = filteredUsers.length > 0 ? filteredUsers : users || []
    const headers = ["Name", "Email", "Role", "Plan", "Status"]
    const csvData = dataToExport.map(user => 
      [user.name, user.email, user.role, user.plan, user.status].join(",")
    )
    const csvContent = [headers.join(","), ...csvData].join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `users_export_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  if (error) return <DashboardLayout><div className="p-8 text-center text-rose-500 font-medium">Error loading users. Please try again.</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-indigo-950 dark:text-indigo-50">Users</h2>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Manage team members and their access levels.</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" onClick={handleExportCSV} disabled={isLoading} className="flex-1 sm:flex-none border-indigo-100 text-indigo-700 hover:bg-indigo-50">
              <Download className="mr-2 h-4 w-4" /> <span className="hidden xs:inline">Export CSV</span><span className="xs:hidden">Export</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700 flex-1 sm:flex-none shadow-md">
                  <Plus className="mr-2 h-4 w-4" /> <span className="hidden xs:inline">Add User</span><span className="xs:hidden">Add</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="text-indigo-700">Create New User</SheetTitle>
                  <SheetDescription>Add a new user to your organization.</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <CreateUserForm />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {isLoading ? (
          <TableSkeleton />
        ) : filteredUsers.length === 0 && searchQuery ? (
          <div className="flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-dashed border-indigo-200">
            <SearchX className="w-12 h-12 text-indigo-300 mb-4" />
            <h3 className="text-lg font-semibold text-indigo-900">No users found</h3>
            <p className="text-muted-foreground text-sm mt-1">We couldn't find any users matching "{searchQuery}"</p>
            <Button variant="link" onClick={() => window.location.reload()} className="mt-4 text-indigo-600">Clear search</Button>
          </div>
        ) : (
          <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm overflow-hidden bg-card">
            <Table>
              <TableHeader className="bg-indigo-50/50 dark:bg-indigo-950/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent border-indigo-100/50 dark:border-indigo-900/50">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-indigo-900 dark:text-indigo-100 font-semibold h-12">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow 
                    key={row.id} 
                    className="cursor-pointer hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors border-indigo-100/50 dark:border-indigo-900/50"
                    onClick={() => setSelectedUser(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="text-indigo-700">User Details</SheetTitle>
              <SheetDescription>View detailed information for {selectedUser?.name}</SheetDescription>
            </SheetHeader>
            {selectedUser && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl border border-indigo-100/50 dark:border-indigo-900/50">
                  <h4 className="font-medium text-xs text-indigo-500 uppercase tracking-wider">Name</h4>
                  <p className="font-semibold text-lg text-indigo-950 dark:text-indigo-100">{selectedUser.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                    <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wider">Email</h4>
                    <p className="text-sm font-medium truncate">{selectedUser.email}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                    <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wider">Plan</h4>
                    <p className="text-sm font-medium">{selectedUser.plan}</p>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wider">Status</h4>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${selectedUser.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'}`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </DashboardLayout>
  )
}
