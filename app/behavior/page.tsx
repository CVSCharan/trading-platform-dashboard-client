"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { KPICard } from "@/components/trading/KPICard";
import { AlertCircle, Activity, Crosshair, Scale } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useFiltersStore } from "@/store/filtersStore";
import { fetchBehaviorStats } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";

export default function BehaviorPage() {
  const { filters } = useFiltersStore();
  const { data, isLoading } = useQuery({
    queryKey: ['behavior', filters],
    queryFn: () => fetchBehaviorStats(filters.login || "demo"),
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-sans font-bold text-text-primary tracking-tight">Behavior Analysis</h1>
        <p className="text-text-muted text-sm">Analyze trading psychology, tilt indicators, and execution consistency.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <KPICard 
           title="Revenge Trade Win Rate" 
           value={14.2} 
           type="percent" 
           trendValue={-5.1}
           trendType="negative-is-good"
           icon={AlertCircle}
           colorCondition="warning-threshold"
         />
         <KPICard 
           title="Holding Loser Loss" 
           value={-1240.50} 
           type="currency" 
           icon={Scale}
           colorCondition="profit-loss"
         />
         <KPICard 
           title="Cutting Winner Cost" 
           value={850.00} 
           type="currency" 
           icon={Crosshair}
           colorCondition="neutral"
         />
         <KPICard 
           title="Consecutive Loss Max" 
           value={8} 
           type="number" 
           icon={Activity}
           colorCondition="warning-threshold"
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-surface border-border h-[400px]">
          <CardHeader>
            <CardTitle>Duration vs P&L Scatter</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <ResponsiveContainer width="100%" height={300}>
               <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                 <XAxis type="number" dataKey="duration" name="duration" scale="log" domain={['auto', 'auto']} stroke="var(--color-text-muted)" />
                 <YAxis type="number" dataKey="pnl" name="pnl" stroke="var(--color-text-muted)" />
                 <ZAxis type="number" dataKey="volume" range={[60, 400]} />
                 <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'var(--color-surface)' }} />
                 <Scatter name="Wins" data={[{duration: 5, pnl: 100, volume: 1}, {duration: 60, pnl: 500, volume: 2}]} fill="var(--color-profit)" />
                 <Scatter name="Losses" data={[{duration: 15, pnl: -200, volume: 1.5}, {duration: 120, pnl: -800, volume: 3}]} fill="var(--color-loss)" />
               </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-surface border-border h-[400px]">
          <CardHeader>
            <CardTitle>Win Rate Heatmap (Day × Hour)</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center text-text-muted italic">
             Custom SVG 7x24 grid component (Pending implementation)
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
