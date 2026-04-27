import { 
  TradeCycle, 
  AccountSummary, 
  EquityPoint, 
  KpiSummary, 
  HeatmapCell, 
  Filters 
} from "@/types/trading";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

function buildUrl(endpoint: string, filters?: Filters, params?: Record<string, string | number>) {
  const url = new URL(`${API_BASE}${endpoint}`);
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
}

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} - ${res.statusText}`);
  }

  return res.json();
}

export const fetchKpiSummary = async (filters: Filters): Promise<KpiSummary> => {
  return fetcher<KpiSummary>(buildUrl("/v1/kpi", filters));
};

export const fetchTradeCycles = async (
  filters: Filters,
  page: number = 1,
  pageSize: number = 25,
  sort?: string
): Promise<{ data: TradeCycle[], total: number }> => {
  return fetcher(buildUrl("/v1/trades", filters, { page, pageSize, ...(sort && { sort }) }));
};

export const fetchEquityCurve = async (
  login: string,
  dateFrom?: string,
  dateTo?: string
): Promise<EquityPoint[]> => {
  return fetcher<EquityPoint[]>(buildUrl("/v1/equity", { login, dateFrom, dateTo }));
};

export const fetchHeatmapData = async (
  login: string,
  metric: "winRate" | "netProfit" | "tradeCount"
): Promise<HeatmapCell[]> => {
  return fetcher<HeatmapCell[]>(buildUrl("/v1/heatmap", { login }, { metric }));
};

export const fetchBehaviorStats = async (login: string): Promise<any> => {
  return fetcher(buildUrl("/v1/behavior", { login }));
};

export const fetchRiskProfile = async (login: string): Promise<any> => {
  return fetcher(buildUrl("/v1/risk", { login }));
};

export const fetchInstrumentBreakdown = async (login: string): Promise<any> => {
  return fetcher(buildUrl("/v1/instruments", { login }));
};

export const fetchRegimePerformance = async (login: string): Promise<any> => {
  return fetcher(buildUrl("/v1/regimes", { login }));
};

export const fetchAccounts = async (): Promise<AccountSummary[]> => {
  return fetcher<AccountSummary[]>(`${API_BASE}/v1/accounts`);
};
