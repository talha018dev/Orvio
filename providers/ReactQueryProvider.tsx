"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
// import { persistQueryClient } from '@tanstack/react-query-persist-client';
// import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions:
      {
        queries:
        {
          retry: 0,
          retryDelay: 5000,
          refetchOnMount: true,
          refetchOnWindowFocus: false,
          staleTime: 60 * 5 * 1000,
        }
      }
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
