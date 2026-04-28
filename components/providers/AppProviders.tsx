"use client";

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { fetchAccounts } from '@/lib/api';
import { useFiltersStore } from '@/store/filtersStore';
import { ThemeProvider } from './ThemeProvider';

function AccountInitializer({ children }: { children: React.ReactNode }) {
  const { setActiveAccount, setFilter, activeAccount } = useFiltersStore();
  
  const { data: accounts, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: fetchAccounts,
  });

  useEffect(() => {
    if (accounts && accounts.length > 0 && !activeAccount) {
      const firstAccount = accounts[0];
      setActiveAccount(firstAccount);
      setFilter('accountId', firstAccount.id);
      console.log("[AccountInitializer] Auto-selected account:", firstAccount.id);
    }
  }, [accounts, activeAccount, setActiveAccount, setFilter]);

  if (isLoading && !accounts) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-page text-text-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="font-mono text-sm animate-pulse">Initializing Terminal...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AccountInitializer>
          {children}
        </AccountInitializer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
