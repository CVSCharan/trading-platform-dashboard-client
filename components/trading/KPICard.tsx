import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/formatters";

interface KPICardProps {
  title: string;
  value: number | string;
  type: "currency" | "percent" | "number" | "ratio";
  trendValue?: number;
  trendType?: "positive-is-good" | "negative-is-good" | "neutral";
  icon: LucideIcon;
  colorCondition?: "profit-loss" | "warning-threshold" | "neutral";
}

export function KPICard({ 
  title, 
  value, 
  type, 
  trendValue, 
  trendType = "positive-is-good",
  icon: Icon,
  colorCondition = "neutral"
}: KPICardProps) {
  
  // Format the main value
  const formattedValue = React.useMemo(() => {
    if (typeof value === "string") return value;
    if (type === "currency") return formatCurrency(value);
    if (type === "percent") return formatPercentage(value, false);
    if (type === "ratio") return value.toFixed(2);
    return value.toLocaleString();
  }, [value, type]);

  // Determine colors based on condition
  let valueColor = "text-text-primary";
  if (colorCondition === "profit-loss") {
    if (typeof value === "number") {
      if (value > 0) valueColor = "text-profit";
      else if (value < 0) valueColor = "text-loss";
    }
  }

  // Trend formatting
  const formattedTrend = React.useMemo(() => {
    if (trendValue === undefined) return null;
    if (type === "percent") return formatPercentage(trendValue, true);
    if (type === "currency") return (trendValue > 0 ? "+" : "") + formatCurrency(trendValue);
    return (trendValue > 0 ? "+" : "") + trendValue;
  }, [trendValue, type]);

  let trendColor = "text-text-muted";
  let TrendIcon = null;
  if (trendValue !== undefined) {
    if (trendValue > 0) {
      TrendIcon = TrendingUp;
      trendColor = trendType === "positive-is-good" ? "text-profit" : "text-loss";
      if (trendType === "neutral") trendColor = "text-accent";
    } else if (trendValue < 0) {
      TrendIcon = TrendingDown;
      trendColor = trendType === "negative-is-good" ? "text-profit" : "text-loss";
      if (trendType === "neutral") trendColor = "text-warning";
    }
  }

  return (
    <Card className="bg-surface border-border overflow-hidden ring-1 ring-border/50 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-text-secondary">{title}</CardTitle>
        <div className="p-1.5 bg-elevated rounded-md border border-border/50">
          <Icon className="h-4 w-4 text-accent" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-mono font-bold tracking-tight", valueColor)}>
          {formattedValue}
        </div>
        {trendValue !== undefined && formattedTrend && (
          <div className="mt-2 flex items-center gap-1.5">
            {TrendIcon && <TrendIcon className={cn("h-3.5 w-3.5", trendColor)} />}
            <span className={cn("text-xs font-semibold", trendColor)}>
              {formattedTrend}
            </span>
            <span className="text-[10px] text-text-muted uppercase tracking-wider ml-1">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
