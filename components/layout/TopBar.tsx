"use client";

import * as React from "react";
import { format } from "date-fns";
import { RefreshCw, Monitor, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TopBar() {
  const [lastRefresh, setLastRefresh] = React.useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Trigger global refetch here via react-query
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="sticky top-0 z-40 w-full h-16 border-b border-border bg-page/80 backdrop-blur-md lg:pl-64 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* Mobile menu handled mostly inside layout/Sidebar or a separate trigger */}
        <div className="flex flex-col">
          <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">Trading Terminal</h2>
          <p className="text-xs text-text-muted font-mono">{format(lastRefresh, "dd MMM yyyy, HH:mm:ss")}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Placeholder for global date range picker and account selector per requirements */}
        <div className="hidden md:flex items-center gap-2 bg-surface border border-border rounded-md px-3 py-1.5 cursor-pointer hover:bg-elevated transition-colors">
           <Monitor className="h-4 w-4 text-accent" />
           <span className="text-xs font-mono font-semibold">Account: #783921</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 bg-surface border border-border rounded-md px-3 py-1.5 cursor-pointer hover:bg-elevated transition-colors">
          <Calendar className="h-4 w-4 text-text-secondary" />
          <span className="text-xs font-mono font-medium">YTD (Jan 1 - Today)</span>
        </div>

        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleRefresh}
          className="border-border bg-surface hover:bg-elevated hover:text-accent"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  );
}
