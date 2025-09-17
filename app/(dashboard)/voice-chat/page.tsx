'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Label } from '@/app/components/ui/label';
import { Progress } from '@/app/components/ui/progress';
import { Mic, MicOff, Volume2, VolumeX, Bot, User, Phone, PhoneOff, Settings } from 'lucide-react';
import { useToast } from '@/app/hooks/use-toast';
import { apiRequest } from '@/app/lib/queryClient';

// Web Speech API type declarations
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    AudioContext: any;
    webkitAudioContext: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface VoiceSession {
  sessionId: string;
  isActive: boolean;
  language: string;
  department: string;
}

export default function VoiceChatInterfacePage() {
  const { toast } = useToast();
  
  // Voice session state
  const [voiceSession, setVoiceSession] = useState<VoiceSession | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  
  // Configuration
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedDepartment, setSelectedDepartment] = useState('general');
  const [voiceVolume, setVoiceVolume] = useState(0.8);
  
  // Conversation state
  const [conversationLog, setConversationLog] = useState<Array<{
    speaker: 'user' | 'ai';
    text: string;
    timestamp: string;
    audioUrl?: string;
  }>>([]);
  
  // Web Audio API references
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null | undefined>(null);
  const speechRecognitionRef = useRef<any>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);

  // Initialize Web Audio API and Speech Recognition
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        // Initialize Speech Recognition
        console.log('Checking speech recognition support...');
        console.log('webkitSpeechRecognition available:', 'webkitSpeechRecognition' in window);
        console.log('SpeechRecognition available:', 'SpeechRecognition' in window);
        
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          speechRecognitionRef.current = new SpeechRecognition();
          
          speechRecognitionRef.current.continuous = true;
          speechRecognitionRef.current.interimResults = true;
          speechRecognitionRef.current.lang = selectedLanguage === 'sw' ? 'sw-KE' : 'en-US';
          
          speechRecognitionRef.current.onresult = handleSpeechResult;
          speechRecognitionRef.current.onerror = handleSpeechError;
          speechRecognitionRef.current.onend = handleSpeechEnd;
          speechRecognitionRef.current.onstart = () => {
            console.log('Speech recognition started successfully');
            setIsListening(true);
          };
          
          console.log('Speech recognition initialized with language:', speechRecognitionRef.current.lang);
        } else {
          console.error('Speech recognition not supported in this browser');
          throw new Error('Speech recognition not supported');
        }
        
        // Initialize Audio Context for microphone visualization
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass();
          analyserRef.current = audioContextRef?.current?.createAnalyser();
        //   analyserRef.current.fftSize = 256;
        }
        
      } catch (error) {
        console.error('Audio initialization failed:', error);
        toast({
          title: "Audio Setup Failed",
          description: "Please check microphone permissions and try again",
          variant: "destructive"
        });
      }
    };

    initializeAudio();

    return () => {
      stopListening();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [selectedLanguage]);

  // Handle speech recognition results
  const handleSpeechResult = useCallback((event: SpeechRecognitionEvent) => {
    console.log('Speech recognition triggered, results:', event.results.length);
    let finalTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      }
    }
    
    console.log('Final transcript:', finalTranscript);
    if (finalTranscript.trim()) {
      console.log('Processing speech input:', finalTranscript.trim());
      processSpeechInput(finalTranscript.trim());
    }
  }, []);

  // Handle speech recognition errors
  const handleSpeechError = useCallback((event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error);
    setIsListening(false);
    
    if (event.error === 'not-allowed') {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use voice chat",
        variant: "destructive"
      });
    }
  }, []);

  // Handle speech recognition end
  const handleSpeechEnd = useCallback(() => {
    console.log('Speech recognition ended');
    console.log('Voice session active:', voiceSession?.isActive);
    console.log('Currently listening:', isListening);
    
    if (voiceSession?.isActive) {
      // Restart listening if session is still active
      console.log('Restarting speech recognition in 500ms...');
      setTimeout(() => {
        if (speechRecognitionRef.current && voiceSession?.isActive) {
          try {
            speechRecognitionRef.current.start();
            console.log('Speech recognition restarted');
          } catch (error) {
            console.error('Failed to restart speech recognition:', error);
          }
        }
      }, 500);
    } else {
      setIsListening(false);
    }
  }, [voiceSession, isListening]);

  // Process user speech input and get AI response
  const processSpeechInput = async (transcript: string) => {
    if (!voiceSession) return;
    
    // Add user message to conversation
    const userMessage = {
      speaker: 'user' as const,
      text: transcript,
      timestamp: new Date().toISOString()
    };
    
    setConversationLog(prev => [...prev, userMessage]);
    
    try {
      console.log('=== Sending API Request ===');
      console.log('Request payload:', {
        transcript: transcript,
        language: selectedLanguage,
        department: selectedDepartment,
        session_id: voiceSession.sessionId
      });
      
      // Send to AI backend for processing
      const response = await apiRequest('POST', '/api/voice/process-speech', {
        transcript: transcript,
        language: selectedLanguage,
        department: selectedDepartment,
        session_id: voiceSession.sessionId
      });
      
      console.log('API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }
      
      const aiResponse = await response.json();
      console.log('AI Response received:', aiResponse);
      
      if (!aiResponse.response_text) {
        console.error('No response_text in AI response:', aiResponse);
        throw new Error('Invalid AI response format');
      }
      
      // Generate AI voice response using TTS
      console.log('Generating AI voice response with text:', aiResponse.response_text);
      await generateAIVoiceResponse(aiResponse.response_text);
      console.log('AI voice response generation completed');
      
    } catch (error) {
      console.error('=== Error Processing Speech ===');
      console.error('Error details:', error);
      toast({
        title: "Processing Error",
        description: `Failed to process your voice input: ${error}`,
        variant: "destructive"
      });
    }
  };

  // Generate AI voice response using Web Speech API
  const generateAIVoiceResponse = async (responseText: string) => {
    try {
      setIsSpeaking(true);
      
      // Add AI message to conversation
      const aiMessage = {
        speaker: 'ai' as const,
        text: responseText,
        timestamp: new Date().toISOString()
      };
      
      setConversationLog(prev => [...prev, aiMessage]);
      
      // Use Web Speech API for text-to-speech
      await speakText(responseText);
      
    } catch (error) {
      console.error('Error generating AI voice:', error);
      toast({
        title: "Voice Generation Error",
        description: "Failed to generate AI voice response",
        variant: "destructive"
      });
    } finally {
      setIsSpeaking(false);
    }
  };

  // Text-to-speech using Web Speech API
  const speakText = (text: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice settings
      utterance.volume = voiceVolume;
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0;
      
      // Set language
      utterance.lang = selectedLanguage === 'sw' ? 'sw-KE' : 'en-US';
      
      // Try to select appropriate voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.includes(selectedLanguage === 'sw' ? 'sw' : 'en') &&
        voice.name.toLowerCase().includes('female')
      ) || voices.find(voice => 
        voice.lang.includes(selectedLanguage === 'sw' ? 'sw' : 'en')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));

      speechSynthesis.speak(utterance);
    });
  };

  // Load available voices when component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
      };
      
      speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices(); // Try to load immediately
    }
  }, []);

  // Start voice session
  const startVoiceSession = async () => {
    try {
      // Request microphone access with explicit permissions
      console.log('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        } 
      });
      
      console.log('Microphone access granted');
      audioStreamRef.current = stream;
      
      // Audio context not needed for MediaRecorder approach
      console.log('Skipping audio context setup - using MediaRecorder method');
      
      // Create voice session first
      const response = await apiRequest('POST', '/api/voice/create-session', {
        language: selectedLanguage,
        department: selectedDepartment
      });
      
      const sessionData = await response.json();
      
      setVoiceSession({
        sessionId: sessionData.session_id,
        isActive: true,
        language: selectedLanguage,
        department: selectedDepartment
      });
      
      console.log('Voice session created:', sessionData.session_id);
      
      // Start audio level monitoring using the reliable MediaRecorder method
      startAudioLevelMonitoring();
      
      // Start speech recognition
      startListening();
      
      toast({
        title: "Voice Chat Started",
        description: "Microphone active - speak now to interact with the AI agent",
      });
      
      // AI greeting
      setTimeout(() => {
        const greeting = getGreeting(selectedDepartment, selectedLanguage);
        generateAIVoiceResponse(greeting);
      }, 1500);
      
    } catch (error) {
      console.error('Failed to start voice session:', error);
      let errorMessage = "Could not access microphone or start voice chat";
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = "Microphone access denied. Please allow microphone permissions and try again.";
        } else if (error.name === 'NotFoundError') {
          errorMessage = "No microphone found. Please check your audio devices.";
        } else if (error.name === 'NotReadableError') {
          errorMessage = "Microphone is already in use by another application.";
        }
      }
      
      toast({
        title: "Session Start Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  // Stop voice session
  const stopVoiceSession = () => {
    stopListening();
    
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
      audioStreamRef.current = null;
    }
    
    setVoiceSession(null);
    setAudioLevel(0);
    
    toast({
      title: "Voice Chat Ended",
      description: "Session terminated successfully",
    });
  };

  // Start speech recognition
  const startListening = () => {
    if (speechRecognitionRef.current) {
      try {
        console.log('Starting speech recognition...');
        speechRecognitionRef.current.start();
        setIsListening(true);
        console.log('Speech recognition started successfully');
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        toast({
          title: "Speech Recognition Error",
          description: `Could not start speech recognition: ${error}`,
          variant: "destructive"
        });
      }
    } else {
      console.error('No speech recognition available');
      toast({
        title: "Speech Recognition Not Available",
        description: "Speech recognition is not initialized",
        variant: "destructive"
      });
    }
  };

  // Stop speech recognition
  const stopListening = () => {
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Monitor audio levels using MediaRecorder data analysis (reliable method)
  const startAudioLevelMonitoring = () => {
    if (!audioStreamRef.current) {
      console.log('No audio stream available for monitoring');
      return;
    }
    
    console.log('Starting MediaRecorder-based audio level monitoring for Voice Chat');
    
    try {
      // Create MediaRecorder for real-time audio data analysis
      const volumeRecorder = new MediaRecorder(audioStreamRef.current, { 
        mimeType: 'audio/webm',
        audioBitsPerSecond: 16000
      });
      
      volumeRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Calculate volume based on audio data size
          const dataSize = event.data.size;
          const volumeLevel = Math.min(100, (dataSize / 1000) * 30); // Increased scale for better visibility
          
          console.log(`Voice Chat - Audio data: ${dataSize} bytes = ${volumeLevel.toFixed(1)}% volume`);
          setAudioLevel(volumeLevel);
        }
      };
      
      volumeRecorder.onerror = (event) => {
        console.error('MediaRecorder error in Voice Chat:', event);
      };
      
      // Record in small chunks for real-time monitoring
      volumeRecorder.start(200);
      
      // Store reference for cleanup
      (audioStreamRef.current as any)._volumeRecorder = volumeRecorder;
      
      console.log('Voice Chat MediaRecorder started successfully');
      
    } catch (error) {
      console.error('Failed to start MediaRecorder in Voice Chat:', error);
      toast({
        title: "Audio Monitoring Failed",
        description: "Could not start audio level detection",
        variant: "destructive"
      });
    }
  };

  // Get department-specific greeting
  const getGreeting = (department: string, language: string) => {
    const greetings = {
      general: {
        en: "Hello! I'm Sarah, your AI assistant from BM Services. How can I help you today?",
        sw: "Hujambo! Mimi ni Sarah, msaidizi wako wa AI kutoka BM Services. Niwezaje kukusaidia leo?"
      },
      billing: {
        en: "Hello! I'm Sarah from BM Services billing department. I'm here to help with your account and billing questions.",
        sw: "Hujambo! Mimi ni Sarah kutoka idara ya malipo ya BM Services. Nipo hapa kukusaidia na maswali ya akaunti na malipo."
      },
      support: {
        en: "Hello! I'm Sarah from BM Services technical support. I'm ready to help you resolve any technical issues.",
        sw: "Hujambo! Mimi ni Sarah kutoka msaada wa kiufundi wa BM Services. Niko tayari kukusaidia kutatua matatizo yoyote ya kiufundi."
      }
    };
    
    return greetings[department as keyof typeof greetings]?.[language as keyof typeof greetings.general] || 
           greetings.general.en;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Voice Chat Interface</h1>
        <p className="text-muted-foreground mt-2">Real voice-to-voice AI interaction with Tortoise TTS</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voice Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Voice Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Department</Label>
              <Select 
                value={selectedDepartment} 
                onValueChange={setSelectedDepartment}
                disabled={voiceSession?.isActive}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Support</SelectItem>
                  <SelectItem value="billing">Billing Department</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Language</Label>
              <Select 
                value={selectedLanguage} 
                onValueChange={setSelectedLanguage}
                disabled={voiceSession?.isActive}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sw">Swahili</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>AI Voice Volume</Label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voiceVolume}
                onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {!voiceSession?.isActive ? (
              <Button onClick={startVoiceSession} className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Start Voice Chat
              </Button>
            ) : (
              <div className="space-y-2">
                <Button onClick={stopVoiceSession} variant="destructive" className="w-full">
                  <PhoneOff className="h-4 w-4 mr-2" />
                  End Voice Chat
                </Button>
                
                {/* Debug buttons for testing */}
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => processSpeechInput("Hello, can you help me?")} 
                    variant="outline" 
                    size="sm"
                  >
                    Test AI Response
                  </Button>
                  <Button 
                    onClick={startListening} 
                    variant="outline" 
                    size="sm"
                    disabled={isListening}
                  >
                    {isListening ? 'Listening...' : 'Start Listening'}
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground text-center">
                  {audioLevel > 0 ? '🎤 Microphone active' : '🎤 Speak to test microphone'}
                  <br />
                  {isListening ? '👂 Listening for speech...' : '⏸️ Not listening'}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Voice Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {voiceSession?.isActive ? (
              <>
                <div className="flex items-center justify-between">
                  <span>Session Active</span>
                  <Badge variant="default">Connected</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Microphone Level</span>
                    <span className="text-sm font-mono">{Math.round(audioLevel)}%</span>
                  </div>
                  <Progress value={audioLevel} className="h-3" />
                  {audioLevel === 0 && (
                    <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                      ⚠️ No audio detected. Try speaking loudly - using same method as Advanced Mic Test.
                    </div>
                  )}
                  {audioLevel > 0 && audioLevel < 5 && (
                    <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                      ✓ Audio detected! Your microphone is working ({audioLevel.toFixed(1)}%)
                    </div>
                  )}
                  {audioLevel >= 5 && (
                    <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                      ✅ Great audio levels! Microphone working perfectly ({audioLevel.toFixed(1)}%)
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-center p-2 rounded-lg border">
                    {isListening ? (
                      <Mic className="h-4 w-4 text-green-500" />
                    ) : (
                      <MicOff className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="ml-2 text-sm">
                      {isListening ? "Listening" : "Not listening"}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center p-2 rounded-lg border">
                    {isSpeaking ? (
                      <Volume2 className="h-4 w-4 text-blue-500" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="ml-2 text-sm">
                      {isSpeaking ? "AI Speaking" : "AI Silent"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Mic className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Voice chat not active</p>
                <p className="text-sm">Configure settings and start voice chat</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Conversation Log */}
      <Card>
        <CardHeader>
          <CardTitle>Live Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {conversationLog.length > 0 ? (
              conversationLog.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    message.speaker === 'ai'
                      ? 'bg-blue-50 border-l-4 border-blue-400'
                      : 'bg-gray-50 border-l-4 border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.speaker === 'ai' ? (
                      <Bot className="h-4 w-4 text-blue-600" />
                    ) : (
                      <User className="h-4 w-4 text-gray-600" />
                    )}
                    <span className="font-medium">
                      {message.speaker === 'ai' ? 'AI Agent' : 'You'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p>{message.text}</p>
                  {message.audioUrl && (
                    <audio controls className="mt-2 w-full h-8">
                      <source src={message.audioUrl} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Start a voice chat to see the conversation</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* TTS Status */}
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
            <div>
              <h3 className="font-semibold text-purple-800">Tortoise TTS Integration</h3>
              <p className="text-purple-700 text-sm">
                High-quality neural voice synthesis for realistic AI responses
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}