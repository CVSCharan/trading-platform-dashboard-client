"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  fetchKpiSummary, 
  fetchEquityCurve,
  fetchInsights
} from "@/lib/api";
import { useFiltersStore } from "@/store/filtersStore";
import { KPICard } from "@/components/trading/KPICard";
import { 
  DollarSign, 
  Target, 
  Activity, 
  TrendingDown, 
  Briefcase,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Zap
} from "lucide-react";

import { 
  XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  ComposedChart, Line, Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";

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

  if (error || !data) {
    return <div className="text-loss text-sm p-4 bg-loss/10 rounded-md border border-loss/20">Error loading KPIs: {(error as any)?.message}</div>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <KPICard 
        title="Net P&L" 
        value={data.netProfit} 
        type="currency" 
        trendValue={data.netProfit * 0.12} 
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

function TradingInsights() {
  const { filters } = useFiltersStore();
  const { data: insights, isLoading } = useQuery({
    queryKey: ['insights', filters],
    queryFn: () => fetchInsights(filters),
  });

  if (isLoading) return <Skeleton className="h-[200px] w-full bg-elevated rounded-xl" />;
  
  // Ensure insights is always an array
  const insightsArray = Array.isArray(insights) 
    ? insights 
    : insights && typeof insights === 'object' 
      ? [insights] 
      : [];

  if (insightsArray.length === 0) return null;

  return (
    <Card className="bg-surface border-border overflow-hidden">
      <CardHeader className="border-b border-border/50 bg-elevated/30">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-accent" />
          <CardTitle className="text-lg">Actionable Intelligence</CardTitle>
        </div>
        <CardDescription>Synthesized session performance and behavioral leaks.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="p-4 space-y-4">
            <h4 className="text-[10px] uppercase font-bold text-profit tracking-widest flex items-center gap-2">
              <TrendingUp className="h-3 w-3" />
              Primary Strengths
            </h4>
            <div className="space-y-3">
              {insightsArray.filter(i => i.type === 'positive').map((insight, idx) => (
                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-profit/5 border border-profit/10">
                  <div className="mt-0.5">
                    <Lightbulb className="h-4 w-4 text-profit" />
                  </div>
                  <div>
                    <p className="text-sm text-text-primary leading-relaxed">{insight.message}</p>
                    {insight.impact && (
                      <span className="text-[10px] font-bold text-profit mt-1 block">
                        EST. IMPACT: +{formatCurrency(insight.impact)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 space-y-4">
            <h4 className="text-[10px] uppercase font-bold text-loss tracking-widest flex items-center gap-2">
              <AlertTriangle className="h-3 w-3" />
              Behavioral Leaks
            </h4>
            <div className="space-y-3">
              {insightsArray.filter(i => i.type === 'negative').map((insight, idx) => (
                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-loss/5 border border-loss/10">
                  <div className="mt-0.5">
                    <AlertTriangle className="h-4 w-4 text-loss" />
                  </div>
                  <div>
                    <p className="text-sm text-text-primary leading-relaxed">{insight.message}</p>
                    {insight.impact && (
                      <span className="text-[10px] font-bold text-loss mt-1 block">
                        LEAKAGE: -{formatCurrency(insight.impact)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EquityChart() {
  const { filters } = useFiltersStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['equity', filters],
    queryFn: () => fetchEquityCurve(filters.accountId),
  });

  if (isLoading) return <Skeleton className="h-[320px] w-full bg-elevated rounded-xl" />;
  if (error) return <div className="p-8 text-center text-loss">Error loading equity chart: {(error as any)?.message}</div>;
  if (!data || data.length === 0) return <div className="p-8 text-center text-text-muted">No equity data available (data length 0)</div>;

  return (
    <Card className="bg-surface border-border overflow-hidden h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Cumulative Equity</CardTitle>
        <CardDescription>Account growth over time.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 relative w-full">
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
            <Area yAxisId="left" type="monotone" dataKey="runningPnl" stroke="var(--color-accent)" fillOpacity={1} fill="url(#colorEquity)" strokeWidth={2} />
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
        <p className="text-text-muted text-sm">Actionable intelligence and high-level performance insights.</p>
      </div>

      <DashboardKpis />

      <TradingInsights />
      
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
