import { isServer, QueryClient } from "@tanstack/react-query";
import { isApiError } from "@/api/mutator/api-error";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Avoid an immediate client refetch of data prefetched on the server.
        staleTime: 60 * 1000,
        retry: (failureCount, error) => {
          // Client errors (4xx) won't succeed on retry.
          if (isApiError(error) && error.status >= 400 && error.status < 500)
            return false;
          return failureCount < 2;
        },
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/** New client per server request; one shared client in the browser. */
export function getQueryClient() {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
