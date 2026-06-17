export type User = {
  id: string
  name: string
  email: string
  role: "Admin" | "Member" | "Viewer"
  plan: "Free" | "Pro" | "Enterprise"
  status: "Active" | "Inactive"
  joinDate: string
  lastActive: string
}

export const users: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", plan: "Enterprise", status: "Active", joinDate: "2023-01-15", lastActive: "2 minutes ago" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Member", plan: "Pro", status: "Active", joinDate: "2023-03-22", lastActive: "1 hour ago" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", plan: "Free", status: "Inactive", joinDate: "2023-06-10", lastActive: "3 days ago" },
  { id: "4", name: "Diana Prince", email: "diana@example.com", role: "Member", plan: "Pro", status: "Active", joinDate: "2023-08-05", lastActive: "10 minutes ago" },
  { id: "5", name: "Evan Wright", email: "evan@example.com", role: "Admin", plan: "Enterprise", status: "Active", joinDate: "2023-09-12", lastActive: "Just now" },
]
