"use client";

import * as React from "react";
import { Download, Search, SlidersHorizontal } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TradeTable, tradeColumns } from "@/components/tables/TradeTable";
import { useQuery } from "@tanstack/react-query";
import { fetchTradeCycles } from "@/lib/api";
import { useFiltersStore } from "@/store/filtersStore";
import { Skeleton } from "@/components/ui/skeleton";

export default function TradesLogPage() {
  const { filters } = useFiltersStore();
  const [page, setPage] = React.useState(1);
  const pageSize = 25;

  const { data, isLoading, error } = useQuery({
    queryKey: ['trades', filters, page],
    queryFn: () => fetchTradeCycles(filters, page, pageSize),
    enabled: !!filters.accountId,
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-sans font-bold text-text-primary tracking-tight">Trade Log</h1>
        <p className="text-text-muted text-sm">Detailed history of all executions, with behavioral flags and market regime context.</p>
      </div>

      <Card className="bg-surface border-border flex-1 min-h-[600px] flex flex-col overflow-hidden">
        <CardHeader className="border-b border-border py-4 bg-surface/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input 
                placeholder="Search symbols..." 
                className="pl-9 bg-elevated border-border text-text-primary placeholder:text-text-muted" 
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" className="gap-2 border-border bg-elevated text-text-secondary hover:text-accent">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" className="gap-2 border-border bg-elevated text-text-secondary hover:text-accent">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col relative">
          {isLoading ? (
            <div className="p-8 space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full bg-elevated" />
              ))}
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center text-loss p-8">
              Error loading trades: {(error as any).message}
            </div>
          ) : (
            <TradeTable 
              columns={tradeColumns} 
              data={data?.data || []} 
            />
          )}
        </CardContent>
        {!isLoading && !error && (
           <div className="p-4 flex items-center justify-between text-sm text-text-muted border-t border-border bg-surface/50">
             <div>
               Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, data?.total || 0)} of {data?.total || 0} entries
             </div>
             <div className="flex gap-2">
               <Button 
                variant="outline" 
                size="sm" 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="bg-elevated border-border"
               >
                 Previous
               </Button>
               <Button 
                variant="outline" 
                size="sm" 
                disabled={!data?.total || page * pageSize >= data.total}
                onClick={() => setPage(p => p + 1)}
                className="bg-elevated border-border"
               >
                 Next
               </Button>
             </div>
           </div>
        )}
      </Card>
    </div>
  );
}
