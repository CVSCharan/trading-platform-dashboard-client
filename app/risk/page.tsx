"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRiskProfile, fetchRegimePerformance } from "@/lib/api";
import { useFiltersStore } from "@/store/filtersStore";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { KPICard } from "@/components/trading/KPICard";
import { Shield, Zap, Percent, BarChart3, PieChart } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, Legend, PieChart as RechartsPieChart, Pie
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

export default function RiskPage() {
  const { filters } = useFiltersStore();
  
  const { data: riskData, isLoading: riskLoading } = useQuery({
    queryKey: ['risk', filters],
    queryFn: () => fetchRiskProfile(filters.accountId || ""),
    enabled: true
  });

  const { data: regimeData, isLoading: regimeLoading } = useQuery({
    queryKey: ['regimes', filters],
    queryFn: () => fetchRegimePerformance(filters),
  });

  if (riskLoading || regimeLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48 bg-elevated" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 bg-elevated rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] bg-elevated rounded-xl" />
          <Skeleton className="h-[400px] bg-elevated rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-sans font-bold text-text-primary tracking-tight">Risk & Attribution</h1>
        <p className="text-text-muted text-sm">Measure capital exposure, risk-reward modeling, and market regime performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard 
          title="Avg Risk / Trade" 
          value={riskData?.avgRiskPct || 0} 
          type="percent" 
          icon={Shield}
        />
        <KPICard 
          title="Max Exposure" 
          value={riskData?.maxRiskPct || 0} 
          type="percent" 
          icon={Zap}
          colorCondition="warning-threshold"
        />
        <KPICard 
          title="Profit Attribution" 
          value={riskData?.netProfit || 0} 
          type="currency" 
          icon={BarChart3}
        />
        <KPICard 
          title="Avg Margin Use" 
          value={riskData?.avgMarginUsage || 0} 
          type="percent" 
          icon={Percent}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle>Market Regime Performance</CardTitle>
            <CardDescription>Net P&L across different market conditions (Bull/Bear/Neutral).</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] relative w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="regime" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  cursor={{ fill: 'var(--color-elevated)', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                />
                <Bar dataKey="netProfit" radius={[4, 4, 0, 0]}>
                  {regimeData?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.netProfit >= 0 ? 'var(--color-profit)' : 'var(--color-loss)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle>Trade Outcome Distribution</CardTitle>
            <CardDescription>Winning vs Losing trade frequency by regime.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] relative w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regimeData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis type="number" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="regime" type="category" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  />
                  <Legend iconType="circle" />
                  <Bar name="Total Trades" dataKey="tradeCount" fill="var(--color-accent)" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-surface border-border">
          <CardHeader>
             <CardTitle>Risk Exposure Attribution</CardTitle>
             <CardDescription>Breakdown of costs and profit components.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] relative w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Gross Profit', value: riskData?.grossProfit || 0 },
                  { name: 'Commissions', value: Math.abs(riskData?.totalCommission || 0) * -1 },
                  { name: 'Swaps', value: riskData?.totalSwap || 0 },
                  { name: 'Net Profit', value: riskData?.netProfit || 0 },
                ]}>
                   <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                   <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                   <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                   <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                     <Cell fill="var(--color-profit)" />
                     <Cell fill="var(--color-loss)" />
                     <Cell fill="var(--color-accent)" />
                     <Cell fill="var(--color-text-primary)" />
                   </Bar>
                </BarChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-surface border-border">
          <CardHeader>
             <CardTitle>Win Rate by Regime</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
               <RechartsPieChart>
                  <Pie
                    data={regimeData}
                    dataKey="winRate"
                    nameKey="regime"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {regimeData?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={['#00D4FF', '#00FF9F', '#FF6B6B', '#FFD43B'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
               </RechartsPieChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
