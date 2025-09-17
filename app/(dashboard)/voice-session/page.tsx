'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { useToast } from "@/app/hooks/use-toast";
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Users, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

interface CallSession {
  id: string;
  customer: {
    name: string;
    phone: string;
    language: string;
  };
  status: 'connecting' | 'active' | 'completed' | 'failed';
  duration: number;
  responses: Array<{
    question: string;
    answer: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    confidence: number;
  }>;
}

export default function VoiceSessionPage() {
  const [session, setSession] = useState<CallSession | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const { toast } = useToast();

  // Simulate voice session
  const startVoiceSession = () => {
    const mockSession: CallSession = {
      id: `session_${Date.now()}`,
      customer: {
        name: "Grace Wanjiku",
        phone: "+254712345678",
        language: "Swahili"
      },
      status: 'connecting',
      duration: 0,
      responses: []
    };

    setSession(mockSession);
    setIsConnected(true);
    setIsRecording(true);

    // Simulate connection process
    setTimeout(() => {
      setSession(prev => prev ? { ...prev, status: 'active' } : null);
      toast({
        title: "Call Connected",
        description: "Voice session started with Grace Wanjiku",
      });
      
      // Simulate survey responses coming in
      simulateSurveyResponses();
    }, 2000);
  };

  const simulateSurveyResponses = () => {
    const responses = [
      {
        question: "Hali gani? Je, umeona huduma zetu za benki?",
        answer: "Nzuri sana, huduma ni nzuri",
        sentiment: 'positive' as const,
        confidence: 0.87
      },
      {
        question: "Je, ungependa kujua kuhusu mikopo yetu?",
        answer: "Ndio, nahitaji mkopo wa biashara",
        sentiment: 'positive' as const,
        confidence: 0.92
      },
      {
        question: "Ni kiasi gani unachohitaji?",
        answer: "Nafikiri shilingi laki moja",
        sentiment: 'neutral' as const,
        confidence: 0.78
      }
    ];

    responses.forEach((response, index) => {
      setTimeout(() => {
        setSession(prev => prev ? {
          ...prev,
          responses: [...prev.responses, response]
        } : null);
      }, (index + 1) * 3000);
    });

    // Complete session after all responses
    setTimeout(() => {
      setSession(prev => prev ? { ...prev, status: 'completed' } : null);
      setIsRecording(false);
      toast({
        title: "Survey Completed",
        description: "Voice session ended successfully. Data saved to analytics.",
      });
    }, 12000);
  };

  const endSession = () => {
    setSession(prev => prev ? { ...prev, status: 'completed' } : null);
    setIsConnected(false);
    setIsRecording(false);
    toast({
      title: "Session Ended",
      description: "Voice session terminated",
      variant: "destructive"
    });
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected && session?.status === 'active') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected, session?.status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Voice Session</h1>
            <p className="text-muted-foreground">Real-time AI voice interactions</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Session Control */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Voice Session Control</span>
                </CardTitle>
                <CardDescription>
                  Manage your live voice AI interactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!session ? (
                  <div className="text-center py-12">
                    <div className="p-6 bg-success/10 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Phone className="h-12 w-12 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Start Voice Session</h3>
                    <p className="text-muted-foreground mb-6">
                      Begin an AI-powered voice interaction with a customer
                    </p>
                    <Button onClick={startVoiceSession} className="bg-success hover:bg-success/90">
                      <Phone className="mr-2 h-4 w-4" />
                      Start Session
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Session Info */}
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-success rounded-full">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{session.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{session.customer.phone}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                          {session.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {formatTime(callDuration)}
                        </p>
                      </div>
                    </div>

                    {/* Session Controls */}
                    <div className="flex justify-center space-x-4">
                      <Button
                        variant={isMuted ? "destructive" : "outline"}
                        size="lg"
                        onClick={() => setIsMuted(!isMuted)}
                        className="rounded-full w-16 h-16"
                      >
                        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                      </Button>
                      
                      <Button
                        variant={isRecording ? "default" : "outline"}
                        size="lg"
                        className="rounded-full w-16 h-16 bg-success hover:bg-success/90"
                        disabled={session.status !== 'active'}
                      >
                        {isRecording ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                      </Button>
                      
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={endSession}
                        className="rounded-full w-16 h-16"
                      >
                        <PhoneOff className="h-6 w-6" />
                      </Button>
                    </div>

                    {/* Connection Status */}
                    {session.status === 'connecting' && (
                      <div className="text-center py-4">
                        <div className="animate-pulse mb-2">
                          <div className="w-4 h-4 bg-success rounded-full mx-auto"></div>
                        </div>
                        <p className="text-sm text-muted-foreground">Connecting to customer...</p>
                      </div>
                    )}

                    {session.status === 'active' && (
                      <div className="text-center py-4">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-success">Live</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Voice session active</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Session Analytics */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Live Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Response Rate</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sentiment Score</span>
                    <span>8.4/10</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Engagement</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Real-time Responses */}
            {session && session.responses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Live Responses</CardTitle>
                  <CardDescription>Customer answers in real-time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-h-80 overflow-y-auto">
                  {session.responses.map((response, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <p className="text-sm font-medium">{response.question}</p>
                      <p className="text-sm text-muted-foreground italic">"{response.answer}"</p>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={
                            response.sentiment === 'positive' ? 'default' : 
                            response.sentiment === 'negative' ? 'destructive' : 
                            'secondary'
                          }
                          className="text-xs"
                        >
                          {response.sentiment}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {Math.round(response.confidence * 100)}% confident
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}