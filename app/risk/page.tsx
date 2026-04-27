"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RiskPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-sans font-bold text-text-primary tracking-tight">Risk & Attribution</h1>
        <p className="text-text-muted text-sm">Measure capital exposure, risk-reward modeling, and market regime performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-surface border-border p-6 flex flex-col items-center justify-center text-center gap-4">
          <div className="relative h-32 w-32 rounded-full border-[12px] border-accent/20 flex flex-col items-center justify-center">
            <span className="text-2xl font-mono font-bold">1.8%</span>
            <span className="text-[10px] uppercase tracking-wider text-text-muted absolute -bottom-6">Avg Risk / Trade</span>
          </div>
        </Card>
        <Card className="bg-surface border-border p-6 flex flex-col items-center justify-center text-center gap-4">
          <div className="relative h-32 w-32 rounded-full border-[12px] border-profit/20 flex flex-col items-center justify-center">
            <span className="text-2xl font-mono font-bold">2.4%</span>
            <span className="text-[10px] uppercase tracking-wider text-text-muted absolute -bottom-6">Over-Leveraged Trades</span>
          </div>
        </Card>
        <Card className="bg-surface border-border p-6 flex flex-col items-center justify-center text-center gap-4">
          <div className="relative h-32 w-32 rounded-full border-[12px] border-warning/20 flex flex-col items-center justify-center">
            <span className="text-2xl font-mono font-bold">64%</span>
            <span className="text-[10px] uppercase tracking-wider text-text-muted absolute -bottom-6">Avg Margin Util</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-surface border-border h-[400px]">
          <CardHeader>
            <CardTitle>P&L Waterfall</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center text-text-muted italic">
             Waterfall Chart goes here
          </CardContent>
        </Card>
        
        <Card className="bg-surface border-border h-[400px]">
          <CardHeader>
            <CardTitle>Risk vs Reward Scatter</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center text-text-muted italic">
             ScatterChart goes here
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-surface border-border h-[350px]">
          <CardHeader>
             <CardTitle>Market Regime Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center text-text-muted italic">
             Grouped BarChart goes here
          </CardContent>
        </Card>
        
        <Card className="bg-surface border-border h-[350px]">
          <CardHeader>
             <CardTitle>Risk × Style Matrix</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center text-text-muted italic">
             TanStack Table matrix goes here
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
