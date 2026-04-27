"use client"

import * as React from "react"
import { Search, Bell, Menu, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/60 backdrop-blur-md lg:pl-64">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 flex-1">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search markets, assets..."
              className="pl-9 bg-muted/50 border-none focus-visible:ring-1"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 bg-muted/30 px-3 py-1 rounded-full border border-border/50">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Market Open</span>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary border-2 border-background" />
          </Button>
          
          <div className="h-8 w-px bg-border mx-1" />
          
          <Button variant="ghost" size="sm" className="gap-2 px-2 hover:bg-transparent">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold text-xs ring-2 ring-background ring-offset-2 ring-offset-border/20">
              CC
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold leading-none">CVS Charan</p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-none">Pro Trader</p>
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}
