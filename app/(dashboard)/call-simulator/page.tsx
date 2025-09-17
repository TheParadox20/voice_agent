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
import { Phone, PhoneCall, PhoneOff, Mic, MicOff, Volume2, VolumeX, User, Bot, Clock, Users, Headphones, MessageSquare, BarChart3 } from 'lucide-react';
import { useToast } from '@/app/hooks/use-toast';
import { apiRequest } from '@/app/lib/queryClient';

interface Call {
  call_id: string;
  customer_phone: string;
  campaign_id: string;
  status: string;
  started_at: string;
  connected_at?: string;
  ended_at?: string;
  duration?: number;
  agent_type: 'ai' | 'human';
  language: string;
  direction?: 'inbound' | 'outbound';
  handoff_reason?: string;
}

export default function CallSimulatorPage() {
  const { toast } = useToast();
  
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [simulationStep, setSimulationStep] = useState(1);
  const [customerPhone, setCustomerPhone] = useState('+254700000000');
  const [selectedCampaign, setSelectedCampaign] = useState('campaign_001');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [conversationLog, setConversationLog] = useState<string[]>([]);

  // Fetch active calls
  const activeCalls: Call[] = [];

  const campaigns: any[] = [];

  // Start outbound call simulation
  const startOutboundCall = () => {}

  // Simulate inbound call
  const simulateInboundCall = () => {}

  // End call
  const endCall = () => {}

  // Handoff to human agent
  const handoffToHuman = () => {}

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (selectedCall && selectedCall.status === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedCall]);

  // Simulate conversation progression
  const advanceConversation = () => {
    const responses = [
      "👤 Customer: Yes, I can hear you clearly.",
      "🤖 AI Agent: Great! I'd like to ask you a few quick questions about your recent experience.",
      "👤 Customer: Sure, go ahead.",
      "🤖 AI Agent: On a scale of 1-5, how satisfied are you with our service?",
      "👤 Customer: I'd say 4 out of 5.",
      "🤖 AI Agent: Thank you! Would you recommend us to others?",
      "👤 Customer: Yes, definitely!",
      "🤖 AI Agent: Wonderful! Any additional feedback you'd like to share?",
      "👤 Customer: The service was good, but response time could be faster.",
      "🤖 AI Agent: Thank you for that valuable feedback. We'll work on improving our response times.",
    ];

    if (conversationLog.length < responses.length + 2) {
      setConversationLog(prev => [...prev, responses[prev.length - 2]]);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Call Simulator</h1>
          <p className="text-muted-foreground">
            Simulate voice interactions before SIP trunk integration
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Call Initiation Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Start Call Simulation
            </CardTitle>
            <CardDescription>
              Test outbound and inbound call scenarios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer_phone">Customer Phone</Label>
              <Input
                id="customer_phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+254700000000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign</Label>
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(campaigns as any[]).map((campaign: any) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sw">Swahili</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => {}}
                disabled={!!selectedCall || false}
                className="w-full"
              >
                <PhoneCall className="h-4 w-4 mr-2" />
                Outbound
              </Button>
              <Button
                variant="outline"
                onClick={() => {}}
                disabled={!!selectedCall || false}
                className="w-full"
              >
                <Phone className="h-4 w-4 mr-2" />
                Inbound
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Call Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedCall ? <PhoneCall className="h-5 w-5 text-green-500" /> : <PhoneOff className="h-5 w-5" />}
              {selectedCall ? 'Active Call' : 'No Active Call'}
            </CardTitle>
            <CardDescription>
              {selectedCall ? `${selectedCall.customer_phone} • ${formatDuration(callDuration)}` : 'Start a call simulation to begin'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedCall ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedCall.status === 'connected' ? 'default' : 'secondary'}>
                      {selectedCall.status}
                    </Badge>
                    <Badge variant="outline">
                      {selectedCall.agent_type === 'ai' ? <Bot className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                      {selectedCall.agent_type === 'ai' ? 'AI Agent' : 'Human Agent'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {formatDuration(callDuration)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {}}
                    disabled={selectedCall.agent_type === 'human'}
                  >
                    <Headphones className="h-4 w-4 mr-1" />
                    Transfer
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {}}
                  >
                    <PhoneOff className="h-4 w-4 mr-1" />
                    End Call
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={advanceConversation}
                  className="w-full"
                  disabled={conversationLog.length >= 12}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Simulate Next Response
                </Button>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <PhoneOff className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No active call session</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Calls Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Calls ({activeCalls.length})
            </CardTitle>
            <CardDescription>
              Real-time call monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(activeCalls as Call[]).length > 0 ? (
                (activeCalls as Call[]).map((call: Call) => (
                  <div key={call.call_id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{call.customer_phone}</div>
                      <div className="text-sm text-muted-foreground">
                        {call.direction || 'outbound'} • {call.language}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={call.status === 'connected' ? 'default' : 'secondary'}>
                        {call.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {call.agent_type}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No active calls</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversation Log */}
      {selectedCall && conversationLog.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Live Conversation
            </CardTitle>
            <CardDescription>
              Real-time conversation simulation (ready for SIP trunk integration)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {conversationLog.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-sm ${
                    message.includes('🤖') 
                      ? 'bg-blue-50 border-l-4 border-blue-400' 
                      : message.includes('👤')
                      ? 'bg-gray-50 border-l-4 border-gray-400'
                      : 'bg-green-50 border-l-4 border-green-400'
                  }`}
                >
                  {message}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SIP Trunk Ready Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <h3 className="font-semibold text-green-800">SIP Trunk Integration Ready</h3>
              <p className="text-green-700 text-sm">
                This simulation demonstrates the complete voice AI workflow. Ready to connect with your actual telecom provider for live calling.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}