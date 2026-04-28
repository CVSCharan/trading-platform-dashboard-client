"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { KPICard } from "@/components/trading/KPICard";
import { AlertCircle, Activity, Crosshair, Scale, Brain } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useFiltersStore } from "@/store/filtersStore";
import { fetchBehaviorStats } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ZAxis, Cell 
} from "recharts";

export default function BehaviorPage() {
  const { filters } = useFiltersStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['behavior', filters],
    queryFn: () => fetchBehaviorStats(filters.accountId || ""),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48 bg-elevated" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 bg-elevated rounded-xl" />)}
        </div>
        <Skeleton className="h-[400px] bg-elevated rounded-xl" />
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-loss">Error loading behavior analytics: {(error as any).message}</div>;
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-sans font-bold text-text-primary tracking-tight">Behavior Analysis</h1>
        <p className="text-text-muted text-sm">Analyze trading psychology, tilt indicators, and execution consistency.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <KPICard 
           title="Revenge Trade Win Rate" 
           value={data?.revengeTradeWinRate || 0} 
           type="percent" 
           icon={AlertCircle}
           colorCondition="warning-threshold"
         />
         <KPICard 
           title="Holding Loser Loss" 
           value={data?.holdingLoserLoss || 0} 
           type="currency" 
           icon={Scale}
           colorCondition="profit-loss"
         />
         <KPICard 
           title="Over-Trade Impact" 
           value={data?.overTradeHourNetPnl || 0} 
           type="currency" 
           icon={Brain}
           colorCondition="profit-loss"
         />
         <KPICard 
           title="Max Drawdown Streak" 
           value={data?.maxConsecutiveLosses || 0} 
           type="number" 
           icon={Activity}
           colorCondition="neutral"
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-surface border-border">
          <CardHeader>
            <CardTitle>Trade Execution Psychology</CardTitle>
            <CardDescription>Correlation between trade duration, volume, and profitability.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] relative w-full">
            <ResponsiveContainer width="100%" height="100%">
               <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                 <XAxis 
                    type="number" 
                    dataKey="duration" 
                    name="duration" 
                    unit="s" 
                    stroke="var(--color-text-muted)" 
                    fontSize={12}
                    tickFormatter={(val) => `${(val / 60).toFixed(0)}m`}
                 />
                 <YAxis 
                    type="number" 
                    dataKey="pnl" 
                    name="pnl" 
                    stroke="var(--color-text-muted)" 
                    fontSize={12}
                    tickFormatter={(val) => `$${val}`}
                 />
                 <ZAxis type="number" dataKey="volume" range={[50, 400]} />
                 <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                 />
                 <Scatter name="Trades" data={data?.scatterData || []}>
                    {data?.scatterData?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? 'var(--color-profit)' : 'var(--color-loss)'} fillOpacity={0.6} />
                    ))}
                 </Scatter>
               </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle>Behavior Breakdown</CardTitle>
            <CardDescription>Percentage of trades exhibiting specific behaviors.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
             <BehaviorMetric 
                label="Revenge Trading" 
                value={data?.revengeTradePct || 0} 
                color="text-loss" 
                description="Trades taken immediately after a loss."
             />
             <BehaviorMetric 
                label="Holding Losers" 
                value={data?.holdingLoserPct || 0} 
                color="text-warning" 
                description="Trades held significantly past stop loss."
             />
             <BehaviorMetric 
                label="Cutting Winners" 
                value={data?.cuttingWinnerPct || 0} 
                color="text-accent" 
                description="Trades closed before reaching target."
             />
             <BehaviorMetric 
                label="Over-Trading" 
                value={data?.overTradeHourPct || 0} 
                color="text-purple" 
                description="Trades taken during low-probability hours."
             />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BehaviorMetric({ label, value, color, description }: { label: string, value: number, color: string, description: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-bold text-text-primary">{label}</p>
          <p className="text-[10px] text-text-muted">{description}</p>
        </div>
        <span className={cn("text-lg font-mono font-bold", color)}>{value.toFixed(1)}%</span>
      </div>
      <div className="h-1.5 w-full bg-elevated rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-1000", color.replace('text-', 'bg-'))} 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
