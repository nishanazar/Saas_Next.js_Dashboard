import { 
  LayoutDashboard, 
  LineChart, 
  Users, 
  CreditCard, 
  ReceiptText, 
  FileText, 
  Settings 
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export const navConfig: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Analytics", href: "/analytics", icon: LineChart },
  { title: "Users", href: "/users", icon: Users },
  { title: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { title: "Billing", href: "/billing", icon: ReceiptText },
  { title: "Reports", href: "/reports", icon: FileText },
  { title: "Settings", href: "/settings", icon: Settings },
];
