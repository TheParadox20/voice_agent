'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Switch } from "@/app/components/ui/switch";
import { Progress } from "@/app/components/ui/progress";
import { 
  Phone, 
  PhoneCall,
  PhoneOff,
  Users, 
  Clock, 
  Star,
  Headphones,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Pause,
  Play,
  Volume2,
  Mic,
  MicOff,
  Settings,
  BarChart3
} from "lucide-react";

export default function LiveAgentsPage() {
  const [agents, setAgents] = useState([
    {
      id: "AGT-001",
      name: "Sarah Mwangi",
      status: "active",
      currentCall: {
        customer: "+254712345678",
        duration: "00:05:42",
        type: "billing_inquiry",
        escalated: false
      },
      todayStats: {
        callsHandled: 23,
        avgDuration: "4:32",
        satisfaction: 4.8,
        availability: 95
      },
      skills: ["English", "Swahili", "Billing", "Technical Support"],
      shift: "08:00 - 17:00"
    },
    {
      id: "AGT-002", 
      name: "John Kamau",
      status: "on-break",
      currentCall: null,
      todayStats: {
        callsHandled: 18,
        avgDuration: "5:12",
        satisfaction: 4.6,
        availability: 88
      },
      skills: ["English", "Swahili", "Customer Service", "Product Support"],
      shift: "09:00 - 18:00"
    },
    {
      id: "AGT-003",
      name: "Grace Wanjiku", 
      status: "busy",
      currentCall: {
        customer: "+254722987654",
        duration: "00:12:15",
        type: "technical_support",
        escalated: true
      },
      todayStats: {
        callsHandled: 31,
        avgDuration: "3:48",
        satisfaction: 4.9,
        availability: 98
      },
      skills: ["English", "Swahili", "Technical Support", "Escalations"],
      shift: "07:00 - 16:00"
    }
  ]);

  const [queueCalls, setQueueCalls] = useState([
    {
      id: "CALL-001",
      customer: "+254711223344",
      waitTime: "00:02:34",
      type: "billing_inquiry",
      priority: "medium",
      language: "English",
      previousInteractions: 2
    },
    {
      id: "CALL-002",
      customer: "+254733445566", 
      waitTime: "00:04:12",
      type: "technical_support",
      priority: "high",
      language: "Swahili",
      previousInteractions: 0
    },
    {
      id: "CALL-003",
      customer: "+254744556677",
      waitTime: "00:01:45", 
      type: "general_inquiry",
      priority: "low",
      language: "English",
      previousInteractions: 5
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "busy": return "bg-warning text-warning-foreground";
      case "on-break": return "bg-muted text-muted-foreground";
      case "offline": return "bg-red-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500 text-white";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleAssignCall = (callId: string, agentId: string) => {
    alert(`Assigning call ${callId} to agent ${agentId}`);
  };

  const handleEscalateCall = (agentId: string) => {
    alert(`Escalating current call for agent ${agentId} to supervisor`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Live Agent Management</h1>
          <p className="text-muted-foreground mt-2">
            Real-time management of human agents handling customer calls and AI handoffs
          </p>
        </div>

        {/* Real-time Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Active Agents</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Calls in Queue</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-analytics rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">2:47</div>
              <div className="text-sm text-muted-foreground">Avg Wait Time</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agents">Live Agents</TabsTrigger>
            <TabsTrigger value="queue">Call Queue</TabsTrigger>
            <TabsTrigger value="handoff">AI Handoff Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Headphones className="h-5 w-5 mr-2" />
                  Agent Status Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {agents.map((agent) => (
                    <Card key={agent.id} className="border-l-4 border-l-analytics">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h3 className="text-lg font-semibold">{agent.name}</h3>
                              <Badge className={getStatusColor(agent.status)}>
                                {agent.status.replace('-', ' ')}
                              </Badge>
                              {agent.currentCall && (
                                <Badge variant="outline" className="text-analytics border-analytics">
                                  In Call: {agent.currentCall.duration}
                                </Badge>
                              )}
                            </div>
                            
                            {agent.currentCall ? (
                              <div className="bg-muted rounded-lg p-3 mb-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium">Current Call</span>
                                  {agent.currentCall.escalated && (     
                                    <Badge className="bg-red-500 text-white">Escalated</Badge>
                                  )}
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <div className="text-muted-foreground">Customer</div>
                                    <div className="font-medium">{agent.currentCall.customer}</div>
                                  </div>
                                  <div>
                                    <div className="text-muted-foreground">Duration</div>
                                    <div className="font-medium">{agent.currentCall.duration}</div>
                                  </div>
                                  <div>
                                    <div className="text-muted-foreground">Type</div>
                                    <div className="font-medium">{agent.currentCall.type.replace('_', ' ')}</div>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => alert(`Monitor call for ${agent.name}`)}>
                                      <Volume2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleEscalateCall(agent.id)}>
                                      <AlertTriangle className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground mb-3">
                                Available for calls • Shift: {agent.shift}
                              </div>
                            )}

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div>
                                <div className="font-medium">{agent.todayStats.callsHandled}</div>
                                <div className="text-muted-foreground">Calls Today</div>
                              </div>
                              <div>
                                <div className="font-medium">{agent.todayStats.avgDuration}</div>
                                <div className="text-muted-foreground">Avg Duration</div>
                              </div>
                              <div>
                                <div className="font-medium">{agent.todayStats.satisfaction}/5</div>
                                <div className="text-muted-foreground">Satisfaction</div>
                              </div>
                              <div>
                                <div className="font-medium">{agent.todayStats.availability}%</div>
                                <div className="text-muted-foreground">Availability</div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                              {agent.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => alert(`View ${agent.name} performance`)}>
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => alert(`Agent ${agent.name} settings`)}>
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Live Call Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {queueCalls.map((call) => (
                    <Card key={call.id} className="border-l-4 border-l-warning">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="font-mono text-sm text-muted-foreground">{call.id}</span>
                              <Badge className={getPriorityColor(call.priority)}>
                                {call.priority} priority
                              </Badge>
                              <Badge variant="outline">
                                {call.language}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Customer</div>
                                <div className="font-medium">{call.customer}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Wait Time</div>
                                <div className="font-medium text-warning">{call.waitTime}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Issue Type</div>
                                <div className="font-medium">{call.type.replace('_', ' ')}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">History</div>
                                <div className="font-medium">{call.previousInteractions} calls</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Select onValueChange={(agentId) => handleAssignCall(call.id, agentId)}>
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Assign to..." />
                              </SelectTrigger>
                              <SelectContent>
                                {agents.filter(a => a.status === 'active' && !a.currentCall).map(agent => (
                                  <SelectItem key={agent.id} value={agent.id}>
                                    {agent.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button variant="outline" size="sm" onClick={() => alert(`View ${call.customer} history`)}>
                              <UserCheck className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="handoff" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI to Human Handoff Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Customer requests human agent</h4>
                      <p className="text-sm text-muted-foreground">Immediate handoff when customer asks for human</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Complex billing inquiries</h4>
                      <p className="text-sm text-muted-foreground">Escalate billing disputes above KES 10,000</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Technical issues</h4>
                      <p className="text-sm text-muted-foreground">Handoff after 2 failed AI resolution attempts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">VIP customer detection</h4>
                      <p className="text-sm text-muted-foreground">Priority routing for high-value customers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Emotional distress detection</h4>
                      <p className="text-sm text-muted-foreground">Handoff when AI detects customer frustration</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Queue Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="maxWaitTime">Maximum Wait Time (minutes)</Label>
                      <Input id="maxWaitTime" type="number" defaultValue="5" />
                    </div>
                    <div>
                      <Label htmlFor="priorityThreshold">High Priority Threshold</Label>
                      <Select defaultValue="billing_dispute">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="billing_dispute">Billing Disputes</SelectItem>
                          <SelectItem value="service_outage">Service Outages</SelectItem>
                          <SelectItem value="security_concern">Security Concerns</SelectItem>
                          <SelectItem value="vip_customer">VIP Customers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button onClick={() => alert("Handoff rules saved successfully!")}>
                  Save Handoff Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}