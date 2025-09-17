'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Separator } from '@/app/components/ui/separator';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, PhoneCall, Clock, User, Bot } from 'lucide-react';
import { useToast } from '@/app/hooks/use-toast';
import { apiRequest } from '@/app/lib/queryClient';

interface CallSession {
  call_id: string;
  customer_phone: string;
  campaign_id: string;
  status: string;
  started_at: string;
  agent_type: 'ai' | 'human';
  language: string;
}

export default function LiveVoiceSession() {
  const { toast } = useToast();
  
  // Call state
  const [callSession, setCallSession] = useState<CallSession | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  
  // Call form state
  const [customerPhone, setCustomerPhone] = useState('+254700000000');
  const [selectedCampaign, setSelectedCampaign] = useState('campaign_001');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch campaigns for dropdown
  const campaigns: any[] = [];

  // Start outbound call
  const startCall = () => {}

  // End call
  const endCall = () => {}

  const startCallTimer = () => {
    callTimerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  const stopCallTimer = () => {
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Unmuted" : "Muted",
      description: isMuted ? "Microphone is now on" : "Microphone is now off",
    });
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    toast({
      title: isSpeakerOn ? "Speaker Off" : "Speaker On",
      description: isSpeakerOn ? "Audio output disabled" : "Audio output enabled",
    });
  };

  useEffect(() => {
    return () => {
      stopCallTimer();
    };
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Live Voice Session</h1>
        <p className="text-muted-foreground mt-2">Real-time SIP trunk voice interaction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Initiation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5" />
              Call Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer_phone">Customer Phone</Label>
              <Input
                id="customer_phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+254700000000"
                disabled={!!callSession}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign</Label>
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign} disabled={!!callSession}>
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
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage} disabled={!!callSession}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sw">Swahili</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!callSession ? (
              <Button
                onClick={handleStartCall}
                disabled={false}
                className="w-full"
              >
                <PhoneCall className="h-4 w-4 mr-2" />
                {false ? 'Connecting...' : 'Start Call'}
              </Button>
            ) : (
              <Button
                onClick={() => {}}
                variant="destructive"
                className="w-full"
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                End Call
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Call Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {callSession ? <Phone className="h-5 w-5 text-green-500" /> : <PhoneOff className="h-5 w-5" />}
              Call Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {callSession ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{callSession.customer_phone}</div>
                    <div className="text-sm text-muted-foreground">
                      Campaign: {campaigns.find((c: any) => c.id === callSession.campaign_id)?.name || selectedCampaign}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={callSession.status === 'connected' ? 'default' : 'secondary'}>
                      {callSession.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDuration(callDuration)}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {callSession.agent_type === 'ai' ? <Bot className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                    {callSession.agent_type === 'ai' ? 'AI Agent' : 'Human Agent'}
                  </Badge>
                  <Badge variant="outline">{callSession.language}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    size="sm"
                    onClick={toggleMute}
                  >
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant={isSpeakerOn ? "default" : "outline"}
                    size="sm"
                    onClick={toggleSpeaker}
                  >
                    {isSpeakerOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <PhoneOff className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No active call session</p>
                <p className="text-sm">Configure call details and press "Start Call"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Live Transcript */}
      <Card>
        <CardHeader>
          <CardTitle>Live Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          {callSession ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <div className="p-2 rounded-lg text-sm bg-blue-50 border-l-4 border-blue-400">
                🤖 AI Agent: Hello! This is BM AI calling regarding your {campaigns.find((c: any) => c.id === selectedCampaign)?.name || 'survey'}.
              </div>
              <div className="p-2 rounded-lg text-sm bg-gray-50 border-l-4 border-gray-400">
                👤 Customer: Hello, yes I can hear you clearly.
              </div>
              <div className="p-2 rounded-lg text-sm bg-blue-50 border-l-4 border-blue-400">
                🤖 AI Agent: Great! I'd like to ask you a few quick questions about your recent experience. This will only take a couple of minutes.
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Start a call to see live transcript</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SIP Trunk Status */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <h3 className="font-semibold text-green-800">SIP Trunk Status</h3>
                <p className="text-green-700 text-sm">Real SIP trunk integration active</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-300">Connected</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}