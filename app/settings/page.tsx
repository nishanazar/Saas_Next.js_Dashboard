"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, ShieldCheck, Bell, Loader2, CheckCircle } from "lucide-react"
import { useSettings, useUpdateSettings } from "@/hooks/use-analytics"
import { FormSkeleton } from "@/components/ui/skeletons/form-skeleton"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
})

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings()
  const { mutateAsync: updateSettings, isPending: isUpdating } = useUpdateSettings()
  const [saveSuccess, setSaveSuccess] = React.useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    values: settings // Automatically populates form when data is fetched
  })

  const onProfileSubmit = async (data: any) => {
    try {
      await updateSettings(data)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <FormSkeleton />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Manage your account preferences and security.</p>
          </div>
          {saveSuccess && (
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full animate-in fade-in slide-in-from-top-2 border border-emerald-100">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium whitespace-nowrap">Changes saved!</span>
            </div>
          )}
        </div>

        {/* Profile Settings */}
        <Card className="shadow-sm border-indigo-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
              <User className="w-5 h-5" /> Profile Settings
            </CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    {...register("name")} 
                    className={`border-indigo-100 focus:border-indigo-500 ${errors.name ? 'border-rose-500' : ''}`} 
                  />
                  {errors.name && <p className="text-xs text-rose-500">{errors.name.message as string}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    {...register("email")} 
                    type="email" 
                    className={`border-indigo-100 focus:border-indigo-500 ${errors.email ? 'border-rose-500' : ''}`}
                  />
                  {errors.email && <p className="text-xs text-rose-500">{errors.email.message as string}</p>}
                </div>
              </div>
              <Button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : "Save Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-sm border-emerald-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" /> Security
            </CardTitle>
            <CardDescription>Manage your account security preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="border-emerald-100 focus:border-emerald-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="border-emerald-100 focus:border-emerald-500" />
              </div>
            </div>
            <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
