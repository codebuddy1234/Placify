"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  Award,
  BarChart3,
  GraduationCap,
  Settings,
  FileText,
} from "lucide-react"

const coordinatorNavItems = [
  { href: "/coordinator", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/coordinator/students", icon: Users, label: "Students" },
  { href: "/coordinator/drives", icon: Briefcase, label: "Placement Drives" },
  { href: "/coordinator/interviews", icon: Calendar, label: "Interviews" },
  { href: "/coordinator/results", icon: Award, label: "Results & Offers" },
  { href: "/coordinator/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/coordinator/settings", icon: Settings, label: "Settings" },
]

const studentNavItems = [
  { href: "/student", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/student/profile", icon: Users, label: "My Profile" },
  { href: "/student/drives", icon: Briefcase, label: "Available Drives" },
  { href: "/student/applications", icon: FileText, label: "Applications" },
  { href: "/student/interviews", icon: Calendar, label: "My Interviews" },
  { href: "/student/resume", icon: GraduationCap, label: "AI Resume" },
]

const companyNavItems = [
  { href: "/company", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/company/jobs", icon: Briefcase, label: "Job Postings" },
  { href: "/company/candidates", icon: Users, label: "Candidates" },
  { href: "/company/interviews", icon: Calendar, label: "Interviews" },
  { href: "/company/offers", icon: Award, label: "Offers" },
]

interface SidebarProps {
  role: "coordinator" | "student" | "company"
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const navItems = role === "coordinator" ? coordinatorNavItems : role === "student" ? studentNavItems : companyNavItems

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold leading-none text-foreground">TrackTalent</h1>
          <p className="text-xs text-muted-foreground capitalize">{role}</p>
        </div>
      </div>

      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
