'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Clock, MessageSquare, User } from 'lucide-react';
import { useToast } from '@/app/hooks/use-toast';
import { apiRequest } from '@/app/lib/queryClient';

interface CustomerCall {
  call_id: string;
  customer_phone: string;
  status: string;
  started_at: string;
  agent_type: 'ai' | 'human';
}

export default function CustomerCallSimulator() {
  const { toast } = useToast();
  
  // Call state
  const [customerCall, setCustomerCall] = useState<CustomerCall | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  
  // Customer info
  const [customerPhone, setCustomerPhone] = useState('+254700000000');
  const [customerName, setCustomerName] = useState('John Doe');
  const [inquiryType, setInquiryType] = useState('general');
  const [language, setLanguage] = useState('en');
  
  // Conversation state
  const [conversationLog, setConversationLog] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [conversationStep, setConversationStep] = useState(0);

  // Simulated AI responses based on inquiry type
  const getAIResponse = (step: number, type: string) => {
    const responses = {
      general: [
        "Hello! Thank you for calling BM Services. My name is Sarah, your AI assistant. How can I help you today?",
        "I understand you have a general inquiry. Let me assist you with that. Could you please provide more details?",
        "That's a great question. Based on our services, I can help you with that. Would you like me to explain our options?",
        "Perfect! I've noted your requirements. Is there anything else I can help you with today?",
        "Thank you for calling BM Services. Have a wonderful day!"
      ],
      billing: [
        "Hello! Thank you for calling BM Services billing department. I'm Sarah, your AI assistant. I can help you with billing inquiries.",
        "I can see your account details. What specific billing question do you have today?",
        "Let me check that information for you. I can see your recent transactions and payment history.",
        "I've updated your account. You should receive a confirmation email shortly. Is there anything else I can help with?",
        "Thank you for calling about your billing inquiry. Have a great day!"
      ],
      support: [
        "Hello! You've reached BM Services technical support. I'm Sarah, your AI assistant. What issue can I help you resolve today?",
        "I understand the technical issue you're experiencing. Let me walk you through some troubleshooting steps.",
        "Great! It sounds like we're making progress. Can you try the next step I mentioned?",
        "Excellent! The issue should be resolved now. Is everything working as expected?",
        "Thank you for contacting technical support. Don't hesitate to call if you need further assistance!"
      ]
    };
    
    return responses[type as keyof typeof responses]?.[step] || responses.general[step] || "Thank you for your patience.";
  };

  // Start inbound call simulation
  const startInboundCall = () => {}

  // End call
  const endCall = () => {}

  const startCallTimer = () => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  };

  const stopCallTimer = () => {
    setCallDuration(0);
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (!currentMessage.trim() || !customerCall) return;
    
    const newLog = [...conversationLog];
    
    // Add customer message
    newLog.push(`👤 You: ${currentMessage}`);
    
    // Simulate AI processing and response
    setTimeout(() => {
      const nextStep = conversationStep + 1;
      const aiResponse = getAIResponse(nextStep, inquiryType);
      newLog.push(`🤖 AI Agent: ${aiResponse}`);
      
      setConversationLog([...newLog]);
      setConversationStep(nextStep);
    }, 1500);
    
    setConversationLog(newLog);
    setCurrentMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Unmuted" : "Muted",
      description: isMuted ? "Your microphone is now on" : "Your microphone is now off",
    });
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    toast({
      title: isSpeakerOn ? "Speaker Off" : "Speaker On",
      description: isSpeakerOn ? "Audio output disabled" : "Audio output enabled",
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Call Simulator</h1>
        <p className="text-muted-foreground mt-2">Test calling BM Services as a customer</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Info & Call Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer_name">Your Name</Label>
              <Input
                id="customer_name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="John Doe"
                disabled={!!customerCall}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer_phone">Your Phone Number</Label>
              <Input
                id="customer_phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+254700000000"
                disabled={!!customerCall}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inquiry_type">Department</Label>
              <Select value={inquiryType} onValueChange={setInquiryType} disabled={!!customerCall}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="billing">Billing Department</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select value={language} onValueChange={setLanguage} disabled={!!customerCall}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sw">Swahili</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!customerCall ? (
              <Button
                onClick={() => {}}
                disabled={false}
                className="w-full"
              >
                <Phone className="h-4 w-4 mr-2" />
                {false ? 'Calling...' : 'Call BM Services'}
              </Button>
            ) : (
              <Button
                onClick={() => {}}
                variant="destructive"
                className="w-full"
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                Hang Up
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Call Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {customerCall ? <Phone className="h-5 w-5 text-green-500" /> : <PhoneOff className="h-5 w-5" />}
              Call Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {customerCall ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">BM Services</div>
                    <div className="text-sm text-muted-foreground">
                      {inquiryType.charAt(0).toUpperCase() + inquiryType.slice(1)} Department
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="default">Connected</Badge>
                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDuration(callDuration)}
                    </div>
                  </div>
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
                <p>Not connected</p>
                <p className="text-sm">Fill in your details and call BM Services</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Live Conversation */}
      {customerCall && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Live Conversation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-4">
              {conversationLog.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-sm ${
                    message.includes('🤖') 
                      ? 'bg-blue-50 border-l-4 border-blue-400' 
                      : 'bg-gray-50 border-l-4 border-gray-400'
                  }`}
                >
                  {message}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message and press Enter..."
                className="flex-1"
                rows={2}
              />
              <Button onClick={sendMessage} disabled={!currentMessage.trim()}>
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Status */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div>
              <h3 className="font-semibold text-blue-800">Customer Simulation Active</h3>
              <p className="text-blue-700 text-sm">
                Testing inbound call flow - this simulates how customers will interact with your AI agents
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}