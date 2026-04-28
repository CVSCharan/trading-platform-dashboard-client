"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Activity, 
  ShieldAlert, 
  ListOrdered, 
  LogOut,
  Sprout,
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
          <div className="bg-profit/10 p-1.5 rounded-md border border-profit/20">
            <Sprout className="h-5 w-5 text-profit" />
          </div>
          <span className="font-sans font-bold text-lg text-text-primary tracking-tight">MoneyPlant<span className="text-profit">Fx</span></span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3">
        <div className="px-3">
          <h3 className="text-[10px] uppercase font-bold text-text-muted tracking-widest mb-4">Navigation</h3>
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 px-3 relative group transition-all duration-300",
                      isActive 
                        ? "bg-primary/10 text-primary font-semibold border-primary/10" 
                        : "text-text-secondary hover:bg-accent hover:text-text-primary"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_12px_var(--color-primary)]" />
                    )}
                    <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                    <span className="tracking-tight">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-page/30">
        <Button variant="ghost" className="w-full justify-start gap-3 text-text-muted hover:text-loss hover:bg-loss/10">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
