import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { getSimulationQueryFn, simulationApiRequest } from "./simulation-query-client";

// Check if we're in simulation mode
export const isSimulationMode = import.meta.env.VITE_SIMULATION_MODE === 'true';

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Use simulation service if in simulation mode
  if (isSimulationMode) {
    return await simulationApiRequest(method, url, data) as Response;
  }

  // Get JWT token from localStorage if available
  const token = localStorage.getItem('bm_auth_token');
  
  // Connect to the Express server on the same port as frontend (5000)
  const fullUrl = url.startsWith('http') ? url : url;
  
  const headers: Record<string, string> = {
    ...(data ? { "Content-Type": "application/json" } : {}),
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };

  const res = await fetch(fullUrl, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async (context) => {
    // Use simulation service if in simulation mode
    if (isSimulationMode) {
      return await getSimulationQueryFn()(context);
    }
    
    const { queryKey } = context;

    // Get JWT token from localStorage if available
    const token = localStorage.getItem('bm_auth_token');
    
    // Connect to the Express server on the same port as frontend
    const url = queryKey.join("/") as string;
    const fullUrl = url.startsWith('http') ? url : url;
    
    const headers: Record<string, string> = {
      ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };

    const res = await fetch(fullUrl, {
      headers,
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

