"use client";

import * as React from "react";
import { format } from "date-fns";
import { RefreshCw, Monitor, Calendar, ChevronDown, Search, Check, User, Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFiltersStore } from "@/store/filtersStore";
import { useQuery } from "@tanstack/react-query";
import { fetchAccounts } from "@/lib/api";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { useTheme } from "../providers/ThemeProvider";

export function TopBar() {
  const [lastRefresh, setLastRefresh] = React.useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const { theme, toggleTheme } = useTheme();
  
  const { activeAccount, setActiveAccount, setFilter } = useFiltersStore();
  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: fetchAccounts,
  });

  const filteredAccounts = accounts?.filter(acc => 
    acc.login.toString().includes(search) || 
    acc.currency.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  const handleSelect = (account: any) => {
    setActiveAccount(account);
    setFilter('accountId', account ? account.id : undefined);
    setIsOpen(false);
  };

  return (
    <div className="sticky top-0 z-40 w-full h-16 border-b border-border bg-page/80 backdrop-blur-md lg:pl-64 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">Trading Terminal</h2>
          <p className="text-xs text-text-muted font-mono">{format(lastRefresh, "dd MMM yyyy, HH:mm:ss")}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Searchable Account Selector */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex items-center gap-2 bg-surface border border-border rounded-md px-3 py-1.5 cursor-pointer hover:bg-elevated transition-colors"
          >
            {activeAccount ? <Monitor className="h-4 w-4 text-accent" /> : <Globe className="h-4 w-4 text-profit" />}
            <span className="text-xs font-mono font-semibold">
              {activeAccount ? `Account: #${activeAccount.login}` : 'Global Analytics'}
            </span>
            <ChevronDown className={cn("h-3 w-3 text-text-muted transition-transform", isOpen && "rotate-180")} />
          </button>

          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <div className="absolute right-0 mt-2 w-72 bg-surface border border-border rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="p-2 border-b border-border bg-elevated/50">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
                    <input 
                      className="w-full bg-surface border border-border rounded px-8 py-1.5 text-xs text-text-primary focus:outline-none focus:border-accent"
                      placeholder="Search accounts..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {/* Global Option */}
                  <button
                    onClick={() => handleSelect(null)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 hover:bg-elevated transition-colors text-left border-b border-border/50",
                      !activeAccount && "bg-profit/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center shrink-0",
                        !activeAccount ? "bg-profit text-white" : "bg-elevated text-text-muted"
                      )}>
                        <Globe className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold italic">Global View</span>
                        <span className="text-[10px] text-text-muted">Aggregated analytics (All Accounts)</span>
                      </div>
                    </div>
                    {!activeAccount && <Check className="h-4 w-4 text-profit" />}
                  </button>

                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((acc) => (
                      <button
                        key={acc.id}
                        onClick={() => handleSelect(acc)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 hover:bg-elevated transition-colors text-left",
                          activeAccount?.id === acc.id && "bg-accent/5"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "h-7 w-7 rounded-full flex items-center justify-center shrink-0",
                            activeAccount?.id === acc.id ? "bg-accent text-white" : "bg-elevated text-text-muted"
                          )}>
                            <User className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold">#{acc.login}</span>
                            <span className="text-[10px] text-text-muted">{acc.currency} • {formatCurrency(acc.balance)}</span>
                          </div>
                        </div>
                        {activeAccount?.id === acc.id && <Check className="h-4 w-4 text-accent" />}
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-text-muted italic">No accounts found</div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="hidden sm:flex items-center gap-2 bg-surface border border-border rounded-md px-3 py-1.5 cursor-pointer hover:bg-elevated transition-colors">
          <Calendar className="h-4 w-4 text-text-secondary" />
          <span className="text-xs font-mono font-medium">YTD</span>
        </div>

        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleRefresh}
          className={cn("shrink-0", isRefreshing && "text-accent")}
        >
          <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
        </Button>

        <div className="h-4 w-[1px] bg-border mx-1" />

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="shrink-0 text-text-muted hover:text-text-primary"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 transition-all" />
          ) : (
            <Moon className="h-4 w-4 transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
}
