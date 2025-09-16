import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { simulationService } from "./simulation-service";

// Simulation query function - replaces real API calls
export const getSimulationQueryFn: <T>() => QueryFunction<T> = () => async ({ queryKey }) => {
  const [endpoint, ...params] = queryKey as string[];
  
  // Route simulation requests based on endpoint
  switch (endpoint) {
    case '/api/auth':
      if (params[0] === 'profile') {
        return await simulationService.getCurrentUser();
      }
      break;
      
    case '/api/telephony':
      if (params[0] === 'configs') {
        return await simulationService.getTelephonyConfigs();
      }
      break;
      
    case '/api/surveys':
      return await simulationService.getSurveys();
      
    case '/api/campaigns':
      return await simulationService.getCampaigns();
      
    case '/api/customers':
      return await simulationService.getCustomers();
      
    case '/api/agents':
      return await simulationService.getAgents();
      
    case '/api/analytics':
      if (params[0] === 'dashboard') {
        return await simulationService.getDashboardAnalytics();
      } else if (params[0] === 'campaigns') {
        return await simulationService.getCampaignAnalytics();
      }
      break;
      
    default:
      console.warn(`Unhandled simulation endpoint: ${endpoint}`);
      return null;
  }
  
  return null;
};

// Simulation API request function - replaces real fetch calls  
export async function simulationApiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  const [, , endpoint, ...pathParts] = url.split('/');
  const id = pathParts.length > 0 ? parseInt(pathParts[0]) : undefined;
  
  // Route simulation requests based on method and endpoint
  switch (method.toUpperCase()) {
    case 'GET':
      // Already handled by query function
      throw new Error('GET requests should use query function');
      
    case 'POST':
      if (endpoint === 'auth') {
        if (pathParts[0] === 'login') {
          const { username, email, password } = data as any;
          // Use email if provided, otherwise use username (for compatibility)
          const loginEmail = email || username;
          return { json: async () => await simulationService.login(loginEmail, password) };
        } else if (pathParts[0] === 'logout') {
          await simulationService.logout();
          return { json: async () => ({ success: true }) };
        } else if (pathParts[0] === 'register') {
          return { json: async () => await simulationService.register(data) };
        }
      } else if (endpoint === 'telephony' && pathParts[0] === 'configs') {
        if (pathParts[1] && pathParts[2] === 'test') {
          // Test configuration
          const configId = parseInt(pathParts[1]);
          return { json: async () => await simulationService.testTelephonyConfig(configId) };
        } else {
          // Create new configuration
          return { json: async () => await simulationService.createTelephonyConfig(data) };
        }
      } else if (endpoint === 'surveys') {
        return { json: async () => await simulationService.createSurvey(data) };
      } else if (endpoint === 'campaigns') {
        return { json: async () => await simulationService.createCampaign(data) };
      } else if (endpoint === 'customers') {
        return { json: async () => await simulationService.createCustomer(data) };
      } else if (endpoint === 'agents') {
        return { json: async () => await simulationService.createAgent(data) };
      } else if (endpoint === 'voice' && pathParts[0] === 'sessions') {
        return { json: async () => await simulationService.startVoiceSession(data) };
      } else if (endpoint === 'files' && pathParts[0] === 'upload') {
        return { json: async () => await simulationService.uploadFile(data as File) };
      }
      break;
      
    case 'PUT':
    case 'PATCH':
      if (endpoint === 'telephony' && pathParts[0] === 'configs' && id) {
        return { json: async () => await simulationService.updateTelephonyConfig(id, data) };
      }
      break;
      
    case 'DELETE':
      if (endpoint === 'telephony' && pathParts[0] === 'configs' && id) {
        await simulationService.deleteTelephonyConfig(id);
        return { json: async () => ({ success: true }) };
      }
      break;
  }
  
  console.warn(`Unhandled simulation request: ${method} ${url}`);
  return { json: async () => ({ success: true, message: 'Simulation response' }) };
}

// Create simulation query client
export const simulationQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getSimulationQueryFn(),
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