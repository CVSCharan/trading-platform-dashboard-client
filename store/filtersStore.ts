import { create } from 'zustand';
import { Filters, AccountSummary } from '@/types/trading';

interface FiltersState {
  filters: Filters;
  activeAccount: AccountSummary | null;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  setActiveAccount: (account: AccountSummary | null) => void;
}

const defaultFilters: Filters = {};

export const useFiltersStore = create<FiltersState>((set) => ({
  filters: defaultFilters,
  activeAccount: null,
  setFilter: (key, value) => 
    set((state) => ({ 
      filters: { ...state.filters, [key]: value } 
    })),
  resetFilters: () => 
    set((state) => ({ 
      filters: { login: state.filters.login } // Keep login when resetting
    })),
  setActiveAccount: (account) => 
    set({ activeAccount: account }),
}));
