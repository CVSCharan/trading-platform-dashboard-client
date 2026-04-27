"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  fetchKpiSummary, 
  fetchEquityCurve, 
  fetchInstrumentBreakdown 
} from "@/lib/api";
import { useFiltersStore } from "@/store/filtersStore";
import { KPICard } from "@/components/trading/KPICard";
import { 
  DollarSign, 
  Target, 
  Activity, 
  TrendingDown, 
  Briefcase 
} from "lucide-react";

// Recharts components (assuming installed, otherwise will fail nicely in dev)
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  ComposedChart, Line
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardKpis() {
  const { filters } = useFiltersStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['kpi', filters],
    queryFn: () => fetchKpiSummary(filters),
  });

  if (isLoading) return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-[120px] bg-elevated rounded-xl" />
      ))}
    </div>
  );

  if (error || !data) return <div className="text-loss text-sm p-4 bg-loss/10 rounded-md border border-loss/20">Error loading KPIs</div>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <KPICard 
        title="Net P&L" 
        value={data.netProfit} 
        type="currency" 
        trendValue={data.netProfit * 0.12} // Example delta
        icon={DollarSign} 
        colorCondition="profit-loss" 
      />
      <KPICard 
        title="Win Rate" 
        value={data.winRate} 
        type="percent" 
        trendValue={2.4} 
        icon={Target} 
      />
      <KPICard 
        title="Profit Factor" 
        value={data.profitFactor} 
        type="ratio" 
        icon={Activity} 
      />
      <KPICard 
        title="Max Drawdown" 
        value={data.maxDrawdownPct} 
        type="percent" 
        trendType="negative-is-good"
        icon={TrendingDown} 
        colorCondition="profit-loss"
      />
      <KPICard 
        title="Expectancy" 
        value={data.expectancy} 
        type="currency" 
        icon={Briefcase} 
      />
    </div>
  );
}

function EquityChart() {
  const { filters } = useFiltersStore();
  const { data, isLoading } = useQuery({
    queryKey: ['equity', filters],
    queryFn: () => fetchEquityCurve(filters.login || "demo"),
  });

  if (isLoading) return <Skeleton className="h-[320px] w-full bg-elevated rounded-xl" />;
  if (!data || data.length === 0) return <div className="p-8 text-center text-text-muted">No equity data available</div>;

  return (
    <Card className="bg-surface border-border overflow-hidden h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Cumulative Equity</CardTitle>
        <CardDescription>Account growth over time.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
            <YAxis yAxisId="right" orientation="right" stroke="var(--color-loss)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--color-text-primary)' }}
            />
            <Area yAxisId="left" type="monotone" dataKey="equity" stroke="var(--color-accent)" fillOpacity={1} fill="url(#colorEquity)" strokeWidth={2} />
            <Line yAxisId="right" type="monotone" dataKey="drawdownPct" stroke="var(--color-loss)" strokeDasharray="5 5" strokeWidth={1} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-sans font-bold text-text-primary tracking-tight">Executive Overview</h1>
        <p className="text-text-muted text-sm">High-level insights into your trading performance and equity growth.</p>
      </div>

      <DashboardKpis />
      
      <EquityChart />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 bg-surface border-border h-[350px]">
          <CardHeader>
             <CardTitle>Instrument P&L</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center text-text-muted italic">
             BarChart implementation goes here
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-surface border-border h-[350px]">
          <CardHeader>
             <CardTitle>Asset Class Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center text-text-muted italic">
             RadarChart goes here
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
