import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function CoordinatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="coordinator" />
      <main className="flex-1 pl-64">{children}</main>
    </div>
  )
}
