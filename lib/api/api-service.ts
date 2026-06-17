import { User, RevenueData, AppSettings, Report } from "@/types"
import { users as initialUsers } from "@/lib/mock-users"
import { revenueData as initialRevenue } from "@/lib/mock-data"
import { API_DELAY } from "@/lib/constants"

// In-memory data store for simulation
let localUsers: User[] = [...initialUsers]
let localSettings: AppSettings = {
  name: "Alice Johnson",
  email: "alice@example.com",
  notifications: true,
  twoFactor: false
}
let localReports: Report[] = [
  { id: "1", name: "Monthly Revenue - May 2026", type: "PDF", status: "Completed", date: "2026-06-01" },
  { id: "2", name: "User Retention Analysis", type: "CSV", status: "Completed", date: "2026-06-05" },
  { id: "3", name: "Quarterly Growth Forecast", type: "PDF", status: "Processing", date: "2026-06-15" },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Middle-level developer best practice: 
 * Grouping related API functions into an object or class for better organization.
 */
export const ApiService = {
  // Users
  users: {
    getAll: async (): Promise<User[]> => {
      await delay(API_DELAY.MEDIUM)
      return localUsers
    },
    create: async (data: Partial<User>): Promise<User> => {
      await delay(API_DELAY.LONG)
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        name: data.name || "Anonymous",
        email: data.email || "",
        role: "Member",
        plan: "Free",
        status: "Active",
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: "Just now",
      }
      localUsers = [newUser, ...localUsers]
      return newUser
    },
    delete: async (id: string): Promise<void> => {
      await delay(API_DELAY.SHORT)
      localUsers = localUsers.filter(u => u.id !== id)
    }
  },

  // Analytics
  analytics: {
    getRevenue: async (): Promise<RevenueData[]> => {
      await delay(API_DELAY.MEDIUM)
      return initialRevenue
    },
    getSubscriptions: async () => {
      await delay(API_DELAY.MEDIUM)
      return { active: 920, churn: 2.4 }
    }
  },

  // Settings
  settings: {
    get: async (): Promise<AppSettings> => {
      await delay(API_DELAY.SHORT)
      return localSettings
    },
    update: async (data: Partial<AppSettings>): Promise<AppSettings> => {
      await delay(API_DELAY.MEDIUM)
      localSettings = { ...localSettings, ...data }
      return localSettings
    }
  },

  // Reports
  reports: {
    getAll: async (): Promise<Report[]> => {
      await delay(API_DELAY.MEDIUM)
      return localReports
    },
    generate: async (data: { name: string; type: Report["type"] }): Promise<Report> => {
      await delay(API_DELAY.LONG)
      const newReport: Report = {
        id: Math.random().toString(36).substring(7),
        ...data,
        status: "Processing",
        date: new Date().toISOString().split('T')[0],
      }
      localReports = [newReport, ...localReports]
      return newReport
    }
  }
}
