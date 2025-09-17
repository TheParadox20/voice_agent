'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useToast } from '@/app/hooks/use-toast';

export default function MicrophoneTestPage() {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null | undefined>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    // Get available audio devices
    navigator.mediaDevices.enumerateDevices()
      .then(deviceList => {
        const audioInputs = deviceList.filter(device => device.kind === 'audioinput');
        setDevices(audioInputs);
        console.log('Available microphones:', audioInputs);
      })
      .catch(err => console.error('Failed to get devices:', err));

    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      const constraints: MediaStreamConstraints = {
        audio: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          sampleRate: 44100
        }
      };

      console.log('Requesting microphone with constraints:', constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      streamRef.current = stream;
      
      // Log stream details
      const tracks = stream.getAudioTracks();
      console.log('Stream tracks:', tracks.length);
      tracks.forEach((track, i) => {
        console.log(`Track ${i}:`, {
          enabled: track.enabled,
          muted: track.muted,
          readyState: track.readyState,
          label: track.label
        });
      });
      
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass({ sampleRate: 44100 });
      
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
        console.log('Audio context resumed');
      }
      
      // Create analyser with specific settings
      analyserRef.current = audioContextRef.current!.createAnalyser();
      analyserRef.current.fftSize = 1024; // Smaller for better performance
      analyserRef.current.smoothingTimeConstant = 0.1; // Less smoothing for quicker response
      analyserRef.current.minDecibels = -90;
      analyserRef.current.maxDecibels = -10;
      
      console.log('Analyser created with fftSize:', analyserRef.current.fftSize);
      console.log('Frequency bin count:', analyserRef.current.frequencyBinCount);
      
      // Connect stream to analyser
      const source = audioContextRef.current!.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      console.log('Audio source connected to analyser');
      
      setIsRecording(true);
      startMonitoring();
      
      toast({
        title: "Recording Started",
        description: "Microphone is now active. Speak to test audio levels.",
      });
      
    } catch (error) {
      console.error('Failed to start recording:', error);
      toast({
        title: "Recording Failed", 
        description: `Could not access microphone: ${error}`,
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    setIsRecording(false);
    setAudioLevel(0);
    
    toast({
      title: "Recording Stopped",
      description: "Microphone has been disconnected.",
    });
  };

  const startMonitoring = () => {
    if (!analyserRef.current) {
      console.log('No analyser for monitoring');
      return;
    }
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const timeDataArray = new Uint8Array(bufferLength);
    const freqDataArray = new Uint8Array(bufferLength);
    
    console.log('Starting monitoring with buffer length:', bufferLength);
    
    const monitor = () => {
      if (!analyserRef.current || !isRecording) {
        console.log('Stopping monitor - analyser or recording stopped');
        return;
      }
      
      // Get both time domain and frequency domain data
      analyserRef.current.getByteTimeDomainData(timeDataArray);
      analyserRef.current.getByteFrequencyData(freqDataArray);
      
      // Time domain analysis (waveform)
      let timeSum = 0;
      let timePeak = 0;
      for (let i = 0; i < bufferLength; i++) {
        const sample = Math.abs(timeDataArray[i] - 128);
        timeSum += sample;
        timePeak = Math.max(timePeak, sample);
      }
      const timeAverage = timeSum / bufferLength;
      
      // Frequency domain analysis (volume)
      let freqSum = 0;
      let freqPeak = 0;
      for (let i = 0; i < bufferLength; i++) {
        freqSum += freqDataArray[i];
        freqPeak = Math.max(freqPeak, freqDataArray[i]);
      }
      const freqAverage = freqSum / bufferLength;
      
      // Use multiple detection methods
      const timeLevel = (timeAverage / 128) * 100 * 4;
      const freqLevel = (freqAverage / 255) * 100;
      const peakLevel = Math.max((timePeak / 128) * 100, (freqPeak / 255) * 100);
      
      // Take the highest reading for best sensitivity
      const finalLevel = Math.max(timeLevel, freqLevel, peakLevel);
      
      console.log(`Audio - Time: ${timeLevel.toFixed(1)}, Freq: ${freqLevel.toFixed(1)}, Peak: ${peakLevel.toFixed(1)}, Final: ${finalLevel.toFixed(1)}`);
      
      setAudioLevel(Math.min(100, finalLevel));
      
      if (isRecording) {
        requestAnimationFrame(monitor);
      }
    };
    
    monitor();
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Microphone Test</h1>
        <p className="text-muted-foreground mt-2">Test your microphone to ensure it's working properly</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Microphone Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Microphone Device</label>
            <select 
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="w-full p-2 border rounded"
              disabled={isRecording}
            >
              <option value="">Default microphone</option>
              {devices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Microphone ${device.deviceId.slice(0, 8)}`}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Audio Level</span>
              <Badge variant={audioLevel > 0 ? "default" : "secondary"}>
                {Math.round(audioLevel)}%
              </Badge>
            </div>
            <Progress value={audioLevel} className="h-4" />
            
            {isRecording && audioLevel === 0 && (
              <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                ⚠️ No audio detected. Try speaking loudly or check microphone settings.
              </div>
            )}
            
            {isRecording && audioLevel > 0 && audioLevel < 10 && (
              <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                📊 Low audio detected. Consider speaking louder.
              </div>
            )}
            
            {isRecording && audioLevel >= 10 && (
              <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✓ Good audio levels detected!
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              variant={isRecording ? "destructive" : "default"}
              className="w-full"
            >
              {isRecording ? (
                <>
                  <MicOff className="h-4 w-4 mr-2" />
                  Stop Test
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  Start Test
                </>
              )}
            </Button>
            
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Refresh Page
            </Button>
          </div>

          {isRecording && (
            <div className="text-xs text-muted-foreground">
              Microphone is active. Speak normally to test audio levels.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-blue-800 mb-2">Troubleshooting Tips</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Make sure your microphone is not muted in system settings</li>
            <li>• Check if other applications are using your microphone</li>
            <li>• Try selecting a different microphone device from the dropdown</li>
            <li>• Refresh the page and grant microphone permissions again</li>
            <li>• Check your browser's microphone settings in site permissions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}