'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  User, 
  HeadphonesIcon,
  BookOpen,
  Search,
  Download,
  ExternalLink
} from "lucide-react";

export default function SupportPage() {
  const [activeTickets, setActiveTickets] = useState([
    {
      id: "TICK-001",
      subject: "Voice quality issues during peak hours",
      status: "in-progress",
      priority: "high",
      created: "2025-01-23",
      lastUpdate: "2 hours ago",
      agent: "Sarah M."
    },
    {
      id: "TICK-002", 
      subject: "Billing inquiry - usage overage",
      status: "waiting-response",
      priority: "medium",
      created: "2025-01-22",
      lastUpdate: "1 day ago",
      agent: "John K."
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "",
    description: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress": return "bg-analytics text-analytics-foreground";
      case "waiting-response": return "bg-warning text-warning-foreground";
      case "resolved": return "bg-success text-success-foreground";
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

  const handleSubmitTicket = () => {
    if (!newTicket.subject || !newTicket.category || !newTicket.description) {
      alert("Please fill in all required fields");
      return;
    }
    alert(`Support ticket created: ${newTicket.subject}\nOur team will respond within 2-4 hours for ${newTicket.priority} priority tickets.`);
    setNewTicket({ subject: "", category: "", priority: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Customer Support Center</h1>
          <p className="text-muted-foreground mt-2">
            Get help with your BM Voice AI platform - we're here 24/7 to assist you
          </p>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => alert("Live chat widget would open")}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">Get instant help from our support team</p>
              <Badge className="bg-success text-success-foreground">Available Now</Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => alert("Phone support: +254-700-123-456")}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-analytics rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-4">Talk directly to our experts</p>
              <Badge className="bg-analytics text-analytics-foreground">24/7 Available</Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => alert("Email: support@bm-voice.ai")}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">Detailed assistance via email</p>
              <Badge className="bg-warning text-warning-foreground">2-4 Hour Response</Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="new-ticket">Create Ticket</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeadphonesIcon className="h-5 w-5 mr-2" />
                  Your Support Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeTickets.map((ticket) => (
                    <Card key={ticket.id} className="border-l-4 border-l-analytics">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                              <Badge className={getStatusColor(ticket.status)}>
                                {ticket.status.replace('-', ' ')}
                              </Badge>
                              <Badge className={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                              </Badge>
                            </div>
                            <h3 className="font-semibold mb-2">{ticket.subject}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>Created: {ticket.created}</span>
                              <span>Last update: {ticket.lastUpdate}</span>
                              <span>Agent: {ticket.agent}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => alert(`View ticket ${ticket.id} details`)}>
                              View Details
                            </Button>
                            <Button size="sm" onClick={() => alert(`Add reply to ticket ${ticket.id}`)}>
                              Reply
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

          <TabsContent value="new-ticket" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Support Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input 
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category *</Label>
                    <Select value={newTicket.category} onValueChange={(value) => setNewTicket({...newTicket, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issues</SelectItem>
                        <SelectItem value="billing">Billing & Payments</SelectItem>
                        <SelectItem value="voice-quality">Voice Quality</SelectItem>
                        <SelectItem value="integration">API Integration</SelectItem>
                        <SelectItem value="training">Training & Onboarding</SelectItem>
                        <SelectItem value="feature-request">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Priority</Label>
                    <Select value={newTicket.priority} onValueChange={(value) => setNewTicket({...newTicket, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General inquiry</SelectItem>
                        <SelectItem value="medium">Medium - Service affecting</SelectItem>
                        <SelectItem value="high">High - Business critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description"
                    placeholder="Please provide detailed information about your issue..."
                    rows={6}
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  />
                </div>

                <Button onClick={handleSubmitTicket} className="w-full">
                  Submit Support Ticket
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Knowledge Base
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search knowledge base..." className="pl-10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Getting Started</h3>
                    <div className="space-y-3">
                      {[
                        "Setting up your first voice campaign",
                        "Creating multilingual surveys",
                        "Understanding billing and pricing",
                        "Voice agent configuration guide"
                      ].map((article, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer" onClick={() => alert(`Opening article: ${article}`)}>
                          <span className="text-sm">{article}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Troubleshooting</h3>
                    <div className="space-y-3">
                      {[
                        "Voice quality optimization tips",
                        "API integration troubleshooting",
                        "Payment and billing issues",
                        "Campaign performance optimization"
                      ].map((article, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer" onClick={() => alert(`Opening article: ${article}`)}>
                          <span className="text-sm">{article}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="text-center">
                  <Button variant="outline" onClick={() => alert("Downloading user manual PDF...")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download User Manual (PDF)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-success mr-3" />
                      <span className="font-medium">All Systems Operational</span>
                    </div>
                    <Badge className="bg-success text-success-foreground">Healthy</Badge>
                  </div>

                  <div className="space-y-4">
                    {[
                      { service: "Voice Processing Engine", status: "operational", uptime: "99.98%" },
                      { service: "API Gateway", status: "operational", uptime: "99.95%" },
                      { service: "Campaign Management", status: "operational", uptime: "100%" },
                      { service: "Analytics Dashboard", status: "operational", uptime: "99.92%" },
                      { service: "Payment Processing", status: "operational", uptime: "99.99%" }
                    ].map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-success rounded-full mr-3"></div>
                          <span>{service.service}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted-foreground">{service.uptime} uptime</span>
                          <Badge className={getStatusColor(service.status)}>
                            {service.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">Recent Incidents</h3>
                    <div className="text-center text-muted-foreground py-8">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
                      <p>No recent incidents to report</p>
                      <p className="text-sm">All systems have been running smoothly</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}