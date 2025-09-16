// Frontend simulation service - replaces all backend API calls
import { 
  mockUsers, 
  mockTelephonyConfigs, 
  mockSurveys, 
  mockCampaigns, 
  mockCustomers, 
  mockAgents, 
  mockInteractions,
  mockAnalytics 
} from './mock-data';

// Simulate network delay for realistic experience
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const STORAGE_KEYS = {
  users: 'bm_users',
  telephonyConfigs: 'bm_telephony_configs',
  surveys: 'bm_surveys',
  campaigns: 'bm_campaigns',
  customers: 'bm_customers',
  agents: 'bm_agents',
  interactions: 'bm_interactions',
  currentUser: 'bm_current_user',
  authToken: 'bm_auth_token'
};

// Initialize local storage with mock data
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.telephonyConfigs)) {
    localStorage.setItem(STORAGE_KEYS.telephonyConfigs, JSON.stringify(mockTelephonyConfigs));
  }
  if (!localStorage.getItem(STORAGE_KEYS.surveys)) {
    localStorage.setItem(STORAGE_KEYS.surveys, JSON.stringify(mockSurveys));
  }
  if (!localStorage.getItem(STORAGE_KEYS.campaigns)) {
    localStorage.setItem(STORAGE_KEYS.campaigns, JSON.stringify(mockCampaigns));
  }
  if (!localStorage.getItem(STORAGE_KEYS.customers)) {
    localStorage.setItem(STORAGE_KEYS.customers, JSON.stringify(mockCustomers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.agents)) {
    localStorage.setItem(STORAGE_KEYS.agents, JSON.stringify(mockAgents));
  }
  if (!localStorage.getItem(STORAGE_KEYS.interactions)) {
    localStorage.setItem(STORAGE_KEYS.interactions, JSON.stringify(mockInteractions));
  }
};

// Generic storage functions
const getFromStorage = <T>(key: string, defaultValue: T[] = []): T[] => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const generateId = (): number => Date.now();

// Simulation Service Class
export class SimulationService {
  constructor() {
    initializeStorage();
  }

  // Authentication Services
  async login(email: string, password: string): Promise<any> {
    await delay();
    
    console.log('🔧 Simulation login attempt:', { email, password, availableUsers: Object.keys(mockUsers) });
    
    if (mockUsers[email as keyof typeof mockUsers] && password === 'demo123') {
      const user = mockUsers[email as keyof typeof mockUsers];
      const token = `mock_token_${Date.now()}`;
      
      localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.authToken, token);
      
      console.log('✅ Simulation login successful:', user);
      
      return {
        access_token: token,
        user: user
      };
    }
    
    console.error('❌ Simulation login failed - Invalid credentials');
    throw new Error('401: Invalid credentials');
  }

  async logout(): Promise<void> {
    await delay(100);
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    localStorage.removeItem(STORAGE_KEYS.authToken);
  }

  async getCurrentUser(): Promise<any> {
    await delay(100);
    const user = localStorage.getItem(STORAGE_KEYS.currentUser);
    return user ? JSON.parse(user) : null;
  }

  async register(userData: any): Promise<any> {
    await delay();
    const newUser = {
      id: generateId(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    // In a real simulation, you'd store this
    return { success: true, user: newUser };
  }

  // Telephony Configuration Services
  async getTelephonyConfigs(): Promise<any[]> {
    await delay();
    return getFromStorage(STORAGE_KEYS.telephonyConfigs, mockTelephonyConfigs);
  }

  async createTelephonyConfig(configData: any): Promise<any> {
    await delay();
    const configs = getFromStorage(STORAGE_KEYS.telephonyConfigs, mockTelephonyConfigs);
    const newConfig = {
      id: generateId(),
      userId: 1, // Mock user ID
      ...configData,
      status: 'unverified',
      isDefault: configs.length === 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    configs.push(newConfig);
    saveToStorage(STORAGE_KEYS.telephonyConfigs, configs);
    
    return newConfig;
  }

  async updateTelephonyConfig(id: number, updates: any): Promise<any> {
    await delay();
    const configs = getFromStorage(STORAGE_KEYS.telephonyConfigs, mockTelephonyConfigs);
    const index = configs.findIndex(c => c.id === id);
    
    if (index === -1) {
      throw new Error('404: Configuration not found');
    }
    
    configs[index] = {
      ...configs[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    saveToStorage(STORAGE_KEYS.telephonyConfigs, configs);
    return configs[index];
  }

  async deleteTelephonyConfig(id: number): Promise<void> {
    await delay();
    const configs = getFromStorage(STORAGE_KEYS.telephonyConfigs, mockTelephonyConfigs);
    const filtered = configs.filter(c => c.id !== id);
    saveToStorage(STORAGE_KEYS.telephonyConfigs, filtered);
  }

  async testTelephonyConfig(id: number): Promise<any> {
    await delay(1000); // Simulate longer test time
    // Simulate test results
    const success = Math.random() > 0.2; // 80% success rate
    
    if (success) {
      // Update config status to ready
      await this.updateTelephonyConfig(id, { 
        status: 'ready', 
        lastCheckedAt: new Date().toISOString() 
      });
      
      return {
        success: true,
        message: 'Telephony configuration test successful',
        details: {
          sipRegistration: 'Connected',
          audioCodecs: 'Supported',
          dtmfTesting: 'Passed'
        }
      };
    } else {
      await this.updateTelephonyConfig(id, { 
        status: 'error', 
        lastCheckedAt: new Date().toISOString() 
      });
      
      throw new Error('Connection test failed: Unable to establish SIP connection');
    }
  }

  // Survey Services
  async getSurveys(): Promise<any[]> {
    await delay();
    return getFromStorage(STORAGE_KEYS.surveys, mockSurveys);
  }

  async createSurvey(surveyData: any): Promise<any> {
    await delay();
    const surveys = getFromStorage(STORAGE_KEYS.surveys, mockSurveys);
    const newSurvey = {
      id: generateId(),
      userId: 1,
      ...surveyData,
      status: 'draft',
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    surveys.push(newSurvey);
    saveToStorage(STORAGE_KEYS.surveys, surveys);
    return newSurvey;
  }

  // Campaign Services  
  async getCampaigns(): Promise<any[]> {
    await delay();
    return getFromStorage(STORAGE_KEYS.campaigns, mockCampaigns);
  }

  async createCampaign(campaignData: any): Promise<any> {
    await delay();
    const campaigns = getFromStorage(STORAGE_KEYS.campaigns, mockCampaigns);
    const newCampaign = {
      id: generateId(),
      userId: 1,
      ...campaignData,
      status: 'draft',
      metrics: {
        totalContacts: 0,
        completedContacts: 0,
        responseRate: 0,
        avgDuration: 0,
        costSoFar: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    campaigns.push(newCampaign);
    saveToStorage(STORAGE_KEYS.campaigns, campaigns);
    return newCampaign;
  }

  // Customer Services
  async getCustomers(): Promise<any[]> {
    await delay();
    return getFromStorage(STORAGE_KEYS.customers, mockCustomers);
  }

  async createCustomer(customerData: any): Promise<any> {
    await delay();
    const customers = getFromStorage(STORAGE_KEYS.customers, mockCustomers);
    const newCustomer = {
      id: generateId(),
      userId: 1,
      ...customerData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    customers.push(newCustomer);
    saveToStorage(STORAGE_KEYS.customers, customers);
    return newCustomer;
  }

  // Agent Services
  async getAgents(): Promise<any[]> {
    await delay();
    return getFromStorage(STORAGE_KEYS.agents, mockAgents);
  }

  async createAgent(agentData: any): Promise<any> {
    await delay();
    const agents = getFromStorage(STORAGE_KEYS.agents, mockAgents);
    const newAgent = {
      id: generateId(),
      userId: 1,
      ...agentData,
      isActive: true,
      deploymentUrl: `https://agent${generateId()}.demo.com/api`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    agents.push(newAgent);
    saveToStorage(STORAGE_KEYS.agents, agents);
    return newAgent;
  }

  // Analytics Services
  async getDashboardAnalytics(): Promise<any> {
    await delay();
    return mockAnalytics.dashboard;
  }

  async getCampaignAnalytics(): Promise<any> {
    await delay();
    return mockAnalytics.campaigns;
  }

  // Voice Session Services (simulation)
  async startVoiceSession(sessionData: any): Promise<any> {
    await delay();
    return {
      sessionId: `ses_${generateId()}`,
      status: 'active',
      startTime: new Date().toISOString()
    };
  }

  async processVoiceInput(sessionId: string, audioData: any): Promise<any> {
    await delay();
    // Simulate AI processing
    return {
      transcript: "This is a simulated voice response",
      response: "Thank you for your input. How can I help you further?",
      sentiment: "neutral",
      confidence: 0.87
    };
  }

  // File Upload Simulation
  async uploadFile(file: File): Promise<any> {
    await delay(1500); // Simulate upload time
    return {
      id: generateId(),
      filename: file.name,
      size: file.size,
      url: `https://storage.demo.com/files/${generateId()}_${file.name}`,
      uploadedAt: new Date().toISOString()
    };
  }
}

// Create singleton instance
export const simulationService = new SimulationService();