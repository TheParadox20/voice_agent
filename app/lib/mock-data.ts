// Mock data for frontend simulation - no backend required

export const mockUsers = {
  "demo@bm.co.ke": {
    id: 1,
    email: "demo@bm.co.ke",
    username: "demo",
    profile: {
      firstName: "Demo",
      lastName: "User",
      phone: "+254712345678",
      avatar: null,
      timezone: "Africa/Nairobi",
      language: "en"
    },
    company: {
      name: "Demo Company Ltd",
      industry: "Telecommunications",
      size: "50-100",
      logo: null
    },
    preferences: {
      onboardingCompleted: true,
      theme: "light",
      notifications: {
        email: true,
        sms: true,
        inApp: true
      }
    },
    subscription: {
      plan: "pro",
      status: "active",
      expiresAt: "2025-12-31T23:59:59Z"
    }
  }
};

export const mockTelephonyConfigs = [
  {
    id: 1,
    userId: 1,
    name: "Twilio Production SIP",
    provider: "twilio_sip",
    type: "sip_trunk", 
    status: "ready",
    isDefault: true,
    connection: {
      sipUri: "sip.twilio.com",
      registrar: "sip.twilio.com:5060",
      outboundProxy: "sip.twilio.com:5060",
      transport: "UDP",
      codecs: ["PCMU", "PCMA", "G722"],
      dtmfMode: "rfc2833"
    },
    credentials: {
      username: "demo_user",
      accountSid: "AC***masked***",
      authToken: "***masked***"
    },
    routing: {
      inboundDids: ["+254712345678", "+254798765432"],
      outboundCallerId: "+254712345678"
    },
    agentServices: [
      "account_transaction",
      "appointment_scheduling", 
      "support_assistance",
      "notifications_alerts"
    ],
    lastCheckedAt: "2025-01-15T10:30:00Z",
    createdAt: "2025-01-10T08:00:00Z",
    updatedAt: "2025-01-15T10:30:00Z"
  },
  {
    id: 2,
    userId: 1,
    name: "Backup SIP Configuration",
    provider: "generic_sip",
    type: "sip_trunk",
    status: "unverified", 
    isDefault: false,
    connection: {
      sipUri: "backup.sip.com",
      registrar: "backup.sip.com:5060",
      outboundProxy: "backup.sip.com:5060", 
      transport: "TCP",
      codecs: ["PCMU", "G729"],
      dtmfMode: "inband"
    },
    credentials: {
      username: "backup_user",
      password: "***masked***"
    },
    routing: {
      inboundDids: ["+254700123456"],
      outboundCallerId: "+254700123456"
    },
    agentServices: [
      "emergency_crisis",
      "verification_security"
    ],
    lastCheckedAt: null,
    createdAt: "2025-01-12T14:20:00Z",
    updatedAt: "2025-01-12T14:20:00Z"
  }
];

export const mockSurveys = [
  {
    id: 1,
    userId: 1,
    title: "Customer Satisfaction Survey",
    description: "Quarterly customer satisfaction assessment",
    language: "en",
    questions: [
      {
        id: "q1",
        type: "rating",
        text: "How satisfied are you with our service?",
        options: ["1", "2", "3", "4", "5"],
        validation: { required: true }
      },
      {
        id: "q2", 
        type: "open_ended",
        text: "What can we improve?",
        validation: { required: false, maxLength: 500 }
      }
    ],
    settings: {
      maxDuration: 300,
      retryAttempts: 2,
      voiceSpeed: 1.0,
      sentimentAnalysis: true
    },
    status: "active",
    version: 1,
    createdAt: "2025-01-08T12:00:00Z",
    updatedAt: "2025-01-08T12:00:00Z"
  }
];

export const mockCampaigns = [
  {
    id: 1,
    userId: 1,
    surveyId: 1,
    name: "Q1 Customer Feedback Campaign",
    type: "outbound",
    status: "active",
    targeting: {
      customerSegments: ["vip", "regular"],
      sampleSize: 1000,
      filters: { lastInteraction: "> 30 days ago" }
    },
    schedule: {
      startDate: "2025-01-15T09:00:00Z",
      endDate: "2025-01-30T17:00:00Z",
      timeWindows: [{ start: "09:00", end: "17:00" }],
      timezone: "Africa/Nairobi"
    },
    budget: {
      maxCalls: 1000,
      maxCost: 500.00,
      costPerCall: 0.50
    },
    metrics: {
      totalContacts: 1000,
      completedContacts: 156,
      responseRate: 0.156,
      avgDuration: 180,
      costSoFar: 78.00
    },
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-15T16:30:00Z"
  }
];

export const mockCustomers = [
  {
    id: 1,
    userId: 1,
    profile: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+254722123456",
      address: {
        city: "Nairobi",
        country: "Kenya"
      }
    },
    preferences: {
      language: "en",
      contactMethod: "phone",
      bestCallTime: { start: "10:00", end: "16:00" }
    },
    segmentation: {
      segment: "vip",
      tags: ["high-value", "tech-savvy"],
      score: 85
    },
    interactionHistory: {
      totalInteractions: 12,
      lastInteraction: "2025-01-10T14:30:00Z",
      satisfactionRating: 4.2,
      responseRate: 0.75
    },
    createdAt: "2024-06-15T08:00:00Z",
    updatedAt: "2025-01-10T14:30:00Z"
  },
  {
    id: 2,
    userId: 1,
    profile: {
      firstName: "Jane",
      lastName: "Smith", 
      email: "jane.smith@example.com",
      phone: "+254733987654",
      address: {
        city: "Mombasa",
        country: "Kenya"
      }
    },
    preferences: {
      language: "sw", // Swahili
      contactMethod: "phone",
      bestCallTime: { start: "14:00", end: "18:00" }
    },
    segmentation: {
      segment: "regular",
      tags: ["loyal-customer"],
      score: 72
    },
    interactionHistory: {
      totalInteractions: 8,
      lastInteraction: "2025-01-05T11:15:00Z",
      satisfactionRating: 3.8,
      responseRate: 0.625
    },
    createdAt: "2024-08-22T10:30:00Z", 
    updatedAt: "2025-01-05T11:15:00Z"
  }
];

export const mockAgents = [
  {
    id: 1,
    userId: 1,
    name: "Customer Service Agent",
    type: "inbound",
    language: "en",
    voiceConfig: {
      voiceType: "female",
      accent: "kenyan",
      speed: 1.0,
      pitch: 1.0
    },
    personality: {
      tone: "professional",
      style: "conversational",
      empathyLevel: 8
    },
    capabilities: ["support_assistance", "account_transaction"],
    isActive: true,
    deploymentUrl: "https://agent1.demo.com/api",
    createdAt: "2025-01-08T09:00:00Z",
    updatedAt: "2025-01-08T09:00:00Z"
  }
];

export const mockInteractions = [
  {
    id: 1,
    customerId: 1,
    campaignId: 1,
    agentId: 1,
    callSession: {
      sessionId: "ses_123456",
      startTime: "2025-01-15T10:30:00Z",
      endTime: "2025-01-15T10:33:30Z",
      duration: 210,
      status: "completed",
      direction: "outbound"
    },
    audio: {
      recordingUrl: "https://storage.demo.com/recordings/rec_123456.wav",
      transcript: "Thank you for taking our survey. How satisfied are you with our service on a scale of 1 to 5? I would rate it a 4. Thank you for your feedback.",
      languageDetected: "en",
      qualityScore: 0.92
    },
    responses: [
      {
        questionId: "q1",
        answer: "4",
        confidence: 0.95,
        responseTime: 3.2
      }
    ],
    analysis: {
      sentiment: "positive",
      satisfactionScore: 4.0,
      completionRate: 1.0,
      escalated: false
    },
    createdAt: "2025-01-15T10:33:30Z"
  }
];

// Analytics data
export const mockAnalytics = {
  dashboard: {
    totalCustomers: 2847,
    activeCampaigns: 3,
    completedCalls: 1256,
    avgSatisfaction: 4.2,
    recentActivity: [
      { type: "call_completed", message: "Survey call completed successfully", timestamp: "2025-01-15T16:30:00Z" },
      { type: "campaign_started", message: "Q1 Customer Feedback Campaign started", timestamp: "2025-01-15T09:00:00Z" },
      { type: "config_updated", message: "Twilio SIP configuration updated", timestamp: "2025-01-14T14:15:00Z" }
    ]
  },
  campaigns: {
    performance: [
      { campaignId: 1, name: "Q1 Customer Feedback", responseRate: 0.156, avgDuration: 180, satisfaction: 4.1 }
    ]
  }
};