"use client"

import * as React from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { RevenueLineChart } from "@/components/dashboard/charts/revenue-line-chart"
import { GrowthBarChart } from "@/components/dashboard/charts/growth-bar-chart"
import { FileDown, Calendar, FileText, Loader2, Download, CheckCircle2, Clock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { useReports, useGenerateReport, useRevenue } from "@/hooks/use-analytics"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableSkeleton } from "@/components/ui/skeletons/table-skeleton"

export default function ReportsPage() {
  const { data: reports, isLoading: reportsLoading } = useReports()
  const { data: revenueData } = useRevenue()
  const { mutateAsync: generateReport, isPending: isGenerating } = useGenerateReport()

  const handleGenerateReport = async () => {
    try {
      await generateReport({ name: `New Report - ${new Date().toLocaleDateString()}`, type: "PDF" })
    } catch (error) {
      console.error("Failed to generate report:", error)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Generate and manage your business intelligence reports.</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Calendar className="mr-2 h-4 w-4" /> <span className="hidden xs:inline text-xs sm:text-sm">Date Range</span><span className="xs:hidden">Range</span>
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 flex-1 sm:flex-none" 
              onClick={handleGenerateReport}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> <span className="hidden xs:inline">Generating...</span><span className="xs:hidden">...</span>
                </>
              ) : (
                <>
                  <FileDown className="mr-2 h-4 w-4" /> <span className="hidden xs:inline">New Report</span><span className="xs:hidden">New</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Executive Summary Charts */}
        <div className="grid gap-6 md:grid-cols-2">
            <RevenueLineChart data={revenueData} />
            <GrowthBarChart data={revenueData} />
        </div>

        {/* Reports Archive Table */}
        <Card className="shadow-sm border-indigo-100">
          <CardHeader>
            <CardTitle className="text-indigo-700 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Report Archive
            </CardTitle>
            <CardDescription>View and download previously generated reports.</CardDescription>
          </CardHeader>
          <CardContent>
            {reportsLoading ? (
              <TableSkeleton />
            ) : (
              <div className="rounded-xl border border-indigo-50 overflow-hidden">
                <Table>
                  <TableHeader className="bg-indigo-50/50">
                    <TableRow>
                      <TableHead className="text-indigo-900 font-semibold">Report Name</TableHead>
                      <TableHead className="text-indigo-900 font-semibold">Type</TableHead>
                      <TableHead className="text-indigo-900 font-semibold">Status</TableHead>
                      <TableHead className="text-indigo-900 font-semibold">Date</TableHead>
                      <TableHead className="text-indigo-900 font-semibold text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports?.map((report) => (
                      <TableRow key={report.id} className="hover:bg-indigo-50/30 transition-colors">
                        <TableCell className="font-medium text-indigo-950">{report.name}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold">
                            {report.type}
                          </span>
                        </TableCell>
                        <TableCell>
                          {report.status === "Completed" ? (
                            <div className="flex items-center gap-1.5 text-emerald-600">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-xs font-medium">Completed</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-amber-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs font-medium animate-pulse">Processing</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{report.date}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                            disabled={report.status !== "Completed"}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
