export interface Instrument {
  id?: string;
  symbol: string;
  displayName: string;
  assetClass: string;
  instrumentType?: string;
}

export interface TradeCycle {
  id: string;
  accountId: string;
  symbol: string;
  direction: "long" | "short" | "BUY" | "SELL";
  volumeEntry: number;
  volumeExit: number;
  priceEntry: number;
  priceExit: number;
  timeEntry: string;
  timeExit: string;
  grossProfit: number;
  totalCommission: number;
  swap: number;
  netProfit: number;
  durationSeconds: number;
  isWin: boolean;
  tradeStyle: "Scalp" | "Day" | "Swing" | "Position" | "Day Trade";
  riskPct: number;
  isRevengeTrade: boolean;
  isHoldingLoser: boolean;
  isCuttingWinner: boolean;
  
  session: "SYDNEY" | "TOKYO" | "LONDON" | "NEW_YORK" | string;
  equityAtEntry: number;
  marketRegime: "Bull" | "Bear" | "Neutral" | "Ranging" | string;
  priceDelta: number;
  isPartialClose: boolean;
  isOverTradeHour: boolean;
  cycleGroupKey?: string;
}

export interface AccountSummary {
  id: string;
  login: number;
  currency: string;
  balance: number;
  equity: number;
  status: string;
  type: string;
  usedMargin: number;
  freeMargin: number;
  marginLevel: number;
  leverage: number;
}

export interface EquityPoint {
  date: string;
  runningPnl: number;
  peakPnl: number;
  drawdownPct: number;
}

export interface KpiSummary {
  netProfit: number;
  grossProfit: number;
  winRate: number;
  profitFactor: number;
  totalTrades: number;
  avgDurationSeconds: number;
  avgRiskPct: number;
  revengeTradePct: number;
  holdingLoserLoss: number;
  cuttingWinnerCount: number;
  expectancy: number;
  maxDrawdownPct: number;
  sharpeProxy: number;
}

export interface Insight {
  type: "positive" | "negative" | "neutral";
  category: "session" | "behavior" | "regime" | "risk";
  message: string;
  impact?: number;
}

export interface HeatmapCell {
  dayOfWeek: number;
  dayName: string;
  hour: number;
  value: number;
  tradeCount: number;
  winCount: number;
}

export interface InstrumentPerformance {
  symbol: string;
  netProfit: number;
  tradeCount: number;
  winRate: number;
  profitFactor: number;
}

export interface RegimePerformance {
  regime: string;
  netProfit: number;
  tradeCount: number;
  winRate: number;
}

export interface Filters {
  accountId?: string;
  dateFrom?: string;
  dateTo?: string;
  symbol?: string;
  assetClass?: string;
  tradeStyle?: string;
  direction?: "long" | "short" | "BUY" | "SELL";
}
