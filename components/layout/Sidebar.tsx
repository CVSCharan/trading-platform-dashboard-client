"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  LineChart, 
  Wallet, 
  History, 
  Settings, 
  LogOut,
  TrendingUp,
  BarChart3
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/" },
  { icon: LineChart, label: "Market", href: "/market" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Wallet, label: "Portfolio", href: "/portfolio" },
  { icon: History, label: "History", href: "/history" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-card/50 backdrop-blur-xl lg:block w-64 h-screen fixed left-0 top-0">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary p-1 rounded-md">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>Antigravity<span className="text-primary">Trade</span></span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="grid items-start gap-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
