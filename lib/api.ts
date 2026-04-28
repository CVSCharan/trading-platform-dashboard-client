import { 
  TradeCycle, 
  AccountSummary, 
  EquityPoint, 
  KpiSummary, 
  HeatmapCell, 
  Filters,
  InstrumentPerformance,
  RegimePerformance
} from "@/types/trading";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

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

async function fetcher<T>(url: string): Promise<ApiResponse<T>> {
  console.log(`[API Request] Fetching: ${url}`);
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const json = await res.json();
    console.log(`[API Response] ${url}:`, json);

    if (!res.ok || json.success === false) {
      throw new Error(json.error?.message || `API Error: ${res.status} - ${res.statusText}`);
    }

    return json;
  } catch (error) {
    console.error(`[API Error] ${url}:`, error);
    throw error;
  }
}

export const fetchKpiSummary = async (filters: Filters): Promise<KpiSummary> => {
  const response = await fetcher<KpiSummary>(buildUrl("/analytics/kpi", filters));
  return response.data;
};

export const fetchTradeCycles = async (
  filters: Filters,
  page: number = 1,
  pageSize: number = 25,
  sort?: string
): Promise<{ data: TradeCycle[], total: number }> => {
  const response = await fetcher<TradeCycle[]>(buildUrl("/trades", filters, { page, pageSize, ...(sort && { sort }) }));
  return {
    data: response.data,
    total: response.meta?.total || response.data.length
  };
};

export const fetchEquityCurve = async (
  accountId?: string,
  dateFrom?: string,
  dateTo?: string
): Promise<EquityPoint[]> => {
  const response = await fetcher<EquityPoint[]>(buildUrl("/analytics/equity-curve", { accountId, dateFrom, dateTo }));
  return response.data;
};

export const fetchHeatmapData = async (
  accountId?: string,
  metric: "winRate" | "netProfit" | "tradeCount" = "tradeCount"
): Promise<HeatmapCell[]> => {
  const response = await fetcher<HeatmapCell[]>(buildUrl("/analytics/heatmap", { accountId }, { metric }));
  return response.data;
};

export const fetchBehaviorStats = async (accountId?: string): Promise<any> => {
  const response = await fetcher(buildUrl("/analytics/behavior", { accountId }));
  return response.data;
};

export const fetchRiskProfile = async (accountId?: string): Promise<any> => {
  const response = await fetcher(buildUrl("/analytics/risk", { accountId }));
  return response.data;
};

export const fetchInstrumentPerformance = async (filters: Filters): Promise<InstrumentPerformance[]> => {
  const response = await fetcher<InstrumentPerformance[]>(buildUrl("/analytics/instruments", filters));
  return response.data;
};

export const fetchRegimePerformance = async (filters: Filters): Promise<RegimePerformance[]> => {
  const response = await fetcher<RegimePerformance[]>(buildUrl("/analytics/regimes", filters));
  return response.data;
};

export const fetchInsights = async (filters: Filters): Promise<Insight[]> => {
  const response = await fetcher<Insight[]>(buildUrl("/analytics/insights", filters));
  return response.data;
};

export const fetchAccounts = async (): Promise<AccountSummary[]> => {
  const response = await fetcher<AccountSummary[]>(`${API_BASE}/accounts`);
  return response.data;
};
