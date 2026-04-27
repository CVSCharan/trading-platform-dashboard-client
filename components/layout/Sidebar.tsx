"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Activity, 
  ShieldAlert, 
  ListOrdered, 
  Settings,
  LogOut,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Executive Overview", icon: LayoutDashboard },
  { href: "/behavior", label: "Behavior Analysis", icon: Activity },
  { href: "/risk", label: "Risk & Attribution", icon: ShieldAlert },
  { href: "/trades", label: "Trade Log", icon: ListOrdered },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r border-border bg-surface w-64 h-screen fixed left-0 top-0 lg:flex flex-col z-50">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-accent/10 p-1.5 rounded-md border border-accent/20">
            <Terminal className="h-5 w-5 text-accent" />
          </div>
          <span className="font-sans font-bold text-lg text-text-primary tracking-tight">Antigravity<span className="text-accent">Trade</span></span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 px-3 relative border border-transparent",
                    isActive 
                      ? "bg-elevated text-accent font-semibold border-border/50" 
                      : "text-text-secondary hover:bg-elevated hover:text-text-primary"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-md shadow-[0_0_8px_var(--color-accent)]" />
                  )}
                  <Icon className={cn("h-4 w-4", isActive && "text-accent")} />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border bg-page/30">
        <div className="flex flex-col gap-2">
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start gap-3 text-text-secondary hover:text-text-primary hover:bg-elevated">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-3 text-text-muted hover:text-loss hover:bg-loss/10">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
