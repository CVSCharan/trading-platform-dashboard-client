export interface Instrument {
  symbol: string;
  assetClass: string;
  displayName: string;
}

export interface TradeCycle {
  id: string;
  cycleGroupKey: string;
  login: string;
  symbol: string;
  direction: "BUY" | "SELL";
  tradeStyle: "Scalp" | "Day" | "Swing" | "Position";
  volumeEntry: number;
  volumeExit: number;
  priceEntry: number;
  priceExit: number;
  grossProfit: number;
  commission: number;
  swap: number;
  netProfit: number;
  durationSeconds: number;
  equityAtEntry: number;
  riskPct: number;
  priceDelta: number;
  isWin: boolean;
  isPartialClose: boolean;
  isRevengeTrade: boolean;
  isHoldingLoser: boolean;
  isCuttingWinner: boolean;
  isOverTradeHour: boolean;
  timeEntry: string;
  timeExit: string;
  instrument: Instrument;
  marketRegime: "Bull" | "Bear" | "Neutral" | "Ranging";
  session: string;
}

export interface AccountSummary {
  login: string;
  balance: number;
  equity: number;
  usedMargin: number;
  freeMargin: number;
  marginLevel: number;
  currency: string;
  leverage: number;
}

export interface EquityPoint {
  date: string;
  equity: number;
  balance: number;
  drawdownPct: number;
}

export interface KpiSummary {
  netProfit: number;
  winRate: number;
  profitFactor: number;
  expectancy: number;
  maxDrawdownPct: number;
  totalTrades: number;
  sharpeProxy: number;
  avgRiskPct: number;
  revengeTradePct: number;
  holdingLoserLoss: number;
  cuttingWinnerCount: number;
}

export interface HeatmapCell {
  dayOfWeek: number;
  hour: number;
  winRate: number;
  tradeCount: number;
  netProfit: number;
}

export interface Filters {
  login?: string;
  dateFrom?: string;
  dateTo?: string;
  symbol?: string;
  assetClass?: string;
  tradeStyle?: string;
  direction?: "BUY" | "SELL";
}
