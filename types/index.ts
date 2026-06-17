export type UserRole = "Admin" | "Member" | "Viewer";
export type UserPlan = "Free" | "Pro" | "Enterprise";
export type UserStatus = "Active" | "Inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: UserPlan;
  status: UserStatus;
  joinDate: string;
  lastActive: string;
}

export interface RevenueData {
  name: string;
  revenue: number;
  growth: number;
  users: number;
  subscriptions: number;
}

export interface AppSettings {
  name: string;
  email: string;
  notifications: boolean;
  twoFactor: boolean;
}

export interface Report {
  id: string;
  name: string;
  type: "PDF" | "CSV" | "XLSX";
  status: "Completed" | "Processing";
  date: string;
}
