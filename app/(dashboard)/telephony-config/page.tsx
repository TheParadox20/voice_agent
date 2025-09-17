'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { Separator } from '@/app/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Checkbox } from '@/app/components/ui/checkbox';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Plus, Edit, Trash2, Settings, Check, X, Phone, Shield, Zap, Star, TestTube, Bot, Users, Calendar, Bell, HelpCircle, Activity, Clock, UserCheck, Gift, AlertTriangle } from 'lucide-react';
import { useToast } from '@/app/hooks/use-toast';
import { apiRequest } from '@/app/lib/queryClient';

interface TelephonyConfig {
  id: number;
  name: string;
  provider: string;
  credentials: {
    username?: string;
    password?: string;
    accountSid?: string;
    authToken?: string;
    apiKey?: string;
    webhookSecret?: string;
  };
  serverUrl: string;
  port: number;
  protocol: string;
  agentServices: string[];
  isDefault: boolean;
  status: 'active' | 'inactive' | 'testing';
  createdAt: string;
  updatedAt: string;
}

interface ConfigFormData {
  name: string;
  provider: string;
  credentials: {
    username: string;
    password: string;
    accountSid: string;
    authToken: string;
    apiKey: string;
    webhookSecret: string;
  };
  serverUrl: string;
  port: number;
  protocol: string;
  agentServices: string[];
}

const providerOptions = [
  { value: 'twilio_sip', label: 'Twilio SIP', description: 'Enterprise-grade voice platform' },
  { value: 'generic_sip', label: 'Generic SIP', description: 'Standard SIP trunk provider' },
  { value: 'plivo', label: 'Plivo', description: 'Cloud communication platform' },
  { value: 'vonage', label: 'Vonage', description: 'Global communications leader' },
  { value: 'livekit_gateway', label: 'LiveKit Gateway', description: 'Real-time communication infrastructure' }
];

const agentServiceOptions = [
  { 
    id: 'account_transaction', 
    label: 'Account & Transaction Services', 
    description: 'Handle customer inquiries about balances, transactions, payments, and billing',
    icon: Bot
  },
  { 
    id: 'appointment_scheduling', 
    label: 'Appointment & Scheduling', 
    description: 'Coordinate calendar management, booking confirmations, and schedule changes',
    icon: Calendar
  },
  { 
    id: 'notifications_alerts', 
    label: 'Notifications & Alerts', 
    description: 'Deliver time-sensitive information including emergency alerts and service updates',
    icon: Bell
  },
  { 
    id: 'support_assistance', 
    label: 'Support & Assistance', 
    description: 'Provide first-line customer service and technical troubleshooting',
    icon: HelpCircle
  },
  { 
    id: 'surveys_engagement', 
    label: 'Surveys & Engagement', 
    description: 'Conduct market research, satisfaction surveys, and feedback collection',
    icon: Activity
  },
  { 
    id: 'status_tracking', 
    label: 'Status Updates & Tracking', 
    description: 'Keep customers informed about application progress and service requests',
    icon: Clock
  },
  { 
    id: 'followup_care', 
    label: 'Follow-up & Care Services', 
    description: 'Maintain ongoing customer relationships through proactive outreach',
    icon: Users
  },
  { 
    id: 'verification_security', 
    label: 'Verification & Security', 
    description: 'Authenticate customer identity and verify transactions',
    icon: UserCheck
  },
  { 
    id: 'programs_promotions', 
    label: 'Programs & Promotions', 
    description: 'Enroll customers in loyalty programs and deliver promotional offers',
    icon: Gift
  },
  { 
    id: 'emergency_crisis', 
    label: 'Emergency & Crisis Management', 
    description: 'Coordinate urgent responses and emergency assistance',
    icon: AlertTriangle
  }
];

export default function TelephonyConfig() {
  const { toast } = useToast();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<TelephonyConfig | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<ConfigFormData>({
    name: '',
    provider: 'twilio_sip',
    credentials: {
      username: '',
      password: '',
      accountSid: '',
      authToken: '',
      apiKey: '',
      webhookSecret: ''
    },
    serverUrl: '',
    port: 5060,
    protocol: 'UDP',
    agentServices: []
  });

  // Fetch telephony configurations
  const configs: TelephonyConfig[] = []

  // Ensure configs is always an array to prevent crashes
  const safeConfigs = Array.isArray(configs) ? configs : [];

  // Create configuration
  const createConfig = () => {}

  // Update configuration
  const updateConfig = () => {}

  // Delete configuration
  const deleteConfig = () => {}

  // Set default configuration
  const setDefaultConfig = () => {}

  // Test connection
  const testConnection = () => {}

  const resetForm = () => {
    setFormData({
      name: '',
      provider: 'twilio_sip',
      credentials: {
        username: '',
        password: '',
        accountSid: '',
        authToken: '',
        apiKey: '',
        webhookSecret: ''
      },
      serverUrl: '',
      port: 5060,
      protocol: 'UDP',
      agentServices: []
    });
  };

  const handleEdit = (config: TelephonyConfig) => {
    setEditingConfig(config);
    setFormData({
      name: config.name,
      provider: config.provider,
      credentials: {
        username: config.credentials.username || '',
        password: config.credentials.password || '',
        accountSid: config.credentials.accountSid || '',
        authToken: config.credentials.authToken || '',
        apiKey: config.credentials.apiKey || '',
        webhookSecret: config.credentials.webhookSecret || ''
      },
      serverUrl: config.serverUrl,
      port: config.port,
      protocol: config.protocol,
      agentServices: config.agentServices || []
    });
    setIsEditDialogOpen(true);
  };

  const handleTestConnection = async (id: number) => {
    setIsTestingConnection(id);
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'twilio_sip': return <Phone className="h-4 w-4" />;
      case 'generic_sip': return <Settings className="h-4 w-4" />;
      case 'plivo': return <Zap className="h-4 w-4" />;
      case 'vonage': return <Shield className="h-4 w-4" />;
      case 'livekit_gateway': return <Star className="h-4 w-4" />;
      default: return <Phone className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'testing': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const renderCredentialFields = (provider: string) => {
    switch (provider) {
      case 'twilio_sip':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountSid">Account SID</Label>
                <Input
                  id="accountSid"
                  value={formData.credentials.accountSid}
                  onChange={(e) => setFormData({
                    ...formData,
                    credentials: { ...formData.credentials, accountSid: e.target.value }
                  })}
                  placeholder="AC..."
                  data-testid="input-account-sid"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authToken">Auth Token</Label>
                <Input
                  id="authToken"
                  type="password"
                  value={formData.credentials.authToken}
                  onChange={(e) => setFormData({
                    ...formData,
                    credentials: { ...formData.credentials, authToken: e.target.value }
                  })}
                  placeholder="Your auth token"
                  data-testid="input-auth-token"
                />
              </div>
            </div>
          </>
        );
      case 'generic_sip':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.credentials.username}
                onChange={(e) => setFormData({
                  ...formData,
                  credentials: { ...formData.credentials, username: e.target.value }
                })}
                placeholder="SIP username"
                data-testid="input-username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.credentials.password}
                onChange={(e) => setFormData({
                  ...formData,
                  credentials: { ...formData.credentials, password: e.target.value }
                })}
                placeholder="SIP password"
                data-testid="input-password"
              />
            </div>
          </div>
        );
      case 'plivo':
      case 'vonage':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                value={formData.credentials.apiKey}
                onChange={(e) => setFormData({
                  ...formData,
                  credentials: { ...formData.credentials, apiKey: e.target.value }
                })}
                placeholder="Your API key"
                data-testid="input-api-key"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookSecret">Webhook Secret</Label>
              <Input
                id="webhookSecret"
                type="password"
                value={formData.credentials.webhookSecret}
                onChange={(e) => setFormData({
                  ...formData,
                  credentials: { ...formData.credentials, webhookSecret: e.target.value }
                })}
                placeholder="Webhook secret"
                data-testid="input-webhook-secret"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (false) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Telephony Configuration</h1>
          <p className="text-muted-foreground">
            Manage SIP trunk providers and telephony settings for voice campaigns
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-config">
              <Plus className="h-4 w-4 mr-2" />
              Add Configuration
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Telephony Configuration</DialogTitle>
              <DialogDescription>
                Configure a new SIP trunk provider for voice communications
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Configuration Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="My SIP Configuration"
                    data-testid="input-config-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider">Provider</Label>
                  <Select
                    value={formData.provider}
                    onValueChange={(value) => setFormData({ ...formData, provider: value })}
                  >
                    <SelectTrigger data-testid="select-provider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {providerOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            {getProviderIcon(option.value)}
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-xs text-muted-foreground">{option.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Provider-specific credential fields */}
              {renderCredentialFields(formData.provider)}

              {/* AI Agent Services Selection */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">AI Agent Services</h3>
                  <p className="text-sm text-muted-foreground">Select the AI agent services this telephony configuration will support</p>
                </div>
                <ScrollArea className="h-64 p-4 border rounded-md">
                  <div className="space-y-4">
                    {agentServiceOptions.map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <div key={service.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={`service-${service.id}`}
                            checked={formData.agentServices.includes(service.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({
                                  ...formData,
                                  agentServices: [...formData.agentServices, service.id]
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  agentServices: formData.agentServices.filter(id => id !== service.id)
                                });
                              }
                            }}
                            data-testid={`checkbox-agent-${service.id}`}
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center space-x-2">
                              <IconComponent className="h-4 w-4 text-primary" />
                              <Label htmlFor={`service-${service.id}`} className="font-medium cursor-pointer">
                                {service.label}
                              </Label>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{formData.agentServices.length} of {agentServiceOptions.length} services selected</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const allSelected = formData.agentServices.length === agentServiceOptions.length;
                      setFormData({
                        ...formData,
                        agentServices: allSelected ? [] : agentServiceOptions.map(s => s.id)
                      });
                    }}
                    data-testid="button-toggle-all-services"
                  >
                    {formData.agentServices.length === agentServiceOptions.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serverUrl">Server URL</Label>
                  <Input
                    id="serverUrl"
                    value={formData.serverUrl}
                    onChange={(e) => setFormData({ ...formData, serverUrl: e.target.value })}
                    placeholder="sip.example.com"
                    data-testid="input-server-url"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    type="number"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value) || 5060 })}
                    placeholder="5060"
                    data-testid="input-port"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="protocol">Protocol</Label>
                  <Select
                    value={formData.protocol}
                    onValueChange={(value) => setFormData({ ...formData, protocol: value })}
                  >
                    <SelectTrigger data-testid="select-protocol">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UDP">UDP</SelectItem>
                      <SelectItem value="TCP">TCP</SelectItem>
                      <SelectItem value="TLS">TLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} data-testid="button-cancel">
                  Cancel
                </Button>
                <Button 
                  onClick={() => {}}
                  disabled={false}
                  data-testid="button-save-config"
                >
                  {false ? 'Creating...' : 'Create Configuration'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Configurations Grid */}
      {safeConfigs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Phone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Telephony Configurations</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first SIP trunk configuration
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-create-first-config">
              <Plus className="h-4 w-4 mr-2" />
              Create Configuration
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeConfigs.map((config) => (
            <Card key={config.id} className="relative">
              {config.isDefault && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                    <Star className="h-3 w-3 mr-1" />
                    Default
                  </Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getProviderIcon(config.provider)}
                    <CardTitle className="text-lg">{config.name}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(config.status)}>
                    {config.status}
                  </Badge>
                </div>
                <CardDescription>
                  {providerOptions.find(p => p.value === config.provider)?.label || config.provider}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Server:</span>
                    <span className="font-mono">{config.serverUrl}:{config.port}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Protocol:</span>
                    <span>{config.protocol}</span>
                  </div>
                  <Separator />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTestConnection(config.id)}
                      disabled={isTestingConnection === config.id}
                      data-testid={`button-test-${config.id}`}
                    >
                      <TestTube className="h-3 w-3 mr-1" />
                      {isTestingConnection === config.id ? 'Testing...' : 'Test'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(config)}
                      data-testid={`button-edit-${config.id}`}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    {!config.isDefault && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {}}
                        data-testid={`button-set-default-${config.id}`}
                      >
                        <Star className="h-3 w-3 mr-1" />
                        Set Default
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {}}
                      data-testid={`button-delete-${config.id}`}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Telephony Configuration</DialogTitle>
            <DialogDescription>
              Update your SIP trunk provider settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Configuration Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="My SIP Configuration"
                  data-testid="input-edit-config-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-provider">Provider</Label>
                <Select
                  value={formData.provider}
                  onValueChange={(value) => setFormData({ ...formData, provider: value })}
                >
                  <SelectTrigger data-testid="select-edit-provider">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {providerOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          {getProviderIcon(option.value)}
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs text-muted-foreground">{option.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Provider-specific credential fields */}
            {renderCredentialFields(formData.provider)}

            {/* AI Agent Services Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">AI Agent Services</h3>
                <p className="text-sm text-muted-foreground">Select the AI agent services this telephony configuration will support</p>
              </div>
              <ScrollArea className="h-64 p-4 border rounded-md">
                <div className="space-y-4">
                  {agentServiceOptions.map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <div key={service.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <Checkbox
                          id={`edit-service-${service.id}`}
                          checked={formData.agentServices.includes(service.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                agentServices: [...formData.agentServices, service.id]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                agentServices: formData.agentServices.filter(id => id !== service.id)
                              });
                            }
                          }}
                          data-testid={`checkbox-edit-agent-${service.id}`}
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4 text-primary" />
                            <Label htmlFor={`edit-service-${service.id}`} className="font-medium cursor-pointer">
                              {service.label}
                            </Label>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{formData.agentServices.length} of {agentServiceOptions.length} services selected</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const allSelected = formData.agentServices.length === agentServiceOptions.length;
                    setFormData({
                      ...formData,
                      agentServices: allSelected ? [] : agentServiceOptions.map(s => s.id)
                    });
                  }}
                  data-testid="button-edit-toggle-all-services"
                >
                  {formData.agentServices.length === agentServiceOptions.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-serverUrl">Server URL</Label>
                <Input
                  id="edit-serverUrl"
                  value={formData.serverUrl}
                  onChange={(e) => setFormData({ ...formData, serverUrl: e.target.value })}
                  placeholder="sip.example.com"
                  data-testid="input-edit-server-url"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-port">Port</Label>
                <Input
                  id="edit-port"
                  type="number"
                  value={formData.port}
                  onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value) || 5060 })}
                  placeholder="5060"
                  data-testid="input-edit-port"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-protocol">Protocol</Label>
                <Select
                  value={formData.protocol}
                  onValueChange={(value) => setFormData({ ...formData, protocol: value })}
                >
                  <SelectTrigger data-testid="select-edit-protocol">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UDP">UDP</SelectItem>
                    <SelectItem value="TCP">TCP</SelectItem>
                    <SelectItem value="TLS">TLS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} data-testid="button-cancel-edit">
                Cancel
              </Button>
              <Button 
                onClick={() => {}}
                disabled={false}
                data-testid="button-save-edit"
              >
                {false ? 'Updating...' : 'Update Configuration'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}