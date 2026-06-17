"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Package, Zap } from "lucide-react"

const invoices = [
  { id: "INV-001", date: "June 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-002", date: "May 1, 2026", amount: "$49.00", status: "Paid" },
  { id: "INV-003", date: "Apr 1, 2026", amount: "$49.00", status: "Paid" },
]

export default function BillingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing & Subscription</h2>
          <p className="text-muted-foreground mt-1">Manage your plan and billing history.</p>
        </div>

        {/* Plan Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-sm bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <Package className="w-5 h-5"/> Current Plan
              </CardTitle>
              <CardDescription className="text-indigo-900/70 dark:text-indigo-200/70">You are currently on the Pro Plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-indigo-950 dark:text-white">$49<span className="text-lg text-muted-foreground font-normal">/mo</span></div>
              <p className="text-sm text-muted-foreground mt-2">Next billing date: July 1, 2026</p>
              <Button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white">Manage Subscription</Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CreditCard className="w-5 h-5"/> Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-xl bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm border">
                    <CreditCard className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="font-medium">Visa ending in 4242</div>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing History */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Billing History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.id}</TableCell>
                    <TableCell>{inv.date}</TableCell>
                    <TableCell>{inv.amount}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                        {inv.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
