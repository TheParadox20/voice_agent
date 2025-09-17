'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Progress } from "@/app/components/ui/progress";
import { Plus, Play, Pause, BarChart3, Download, Copy, Filter, Users, Phone, Clock, Calendar } from "lucide-react";

export default function CampaignsPage() {
  const campaigns = [
    {
      id: 1,
      name: "Customer Satisfaction Survey Q1 2025",
      type: "inbound",
      status: "active",
      targetContacts: 2500,
      completedContacts: 1847,
      responseRate: 94.2,
      avgDuration: "3:24",
      satisfaction: 4.7,
      swahiliPreference: 68,
      startDate: "2 days ago",
      languages: ["English", "Swahili"],
    },
    {
      id: 2,
      name: "Loan Payment Reminders",
      type: "outbound",
      status: "scheduled",
      targetContacts: 892,
      completedContacts: 0,
      responseRate: 87,
      avgDuration: "2:15",
      satisfaction: 4.2,
      swahiliPreference: 45,
      startDate: "Tomorrow, 9:00 AM EAT",
      languages: ["English"],
    },
    {
      id: 3,
      name: "New Product Introduction - Digital Savings",
      type: "outbound",
      status: "completed",
      targetContacts: 5000,
      completedContacts: 4756,
      responseRate: 95.1,
      avgDuration: "4:12",
      satisfaction: 4.3,
      swahiliPreference: 72,
      startDate: "1 week ago",
      languages: ["English", "Swahili"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "scheduled":
        return "bg-warning text-warning-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string, languages: string[]) => {
    if (languages.length > 1) {
      return "bg-purple-500 text-white";
    }
    return type === "inbound" ? "bg-success text-success-foreground" : "bg-analytics text-analytics-foreground";
  };

  const getTypeLabel = (type: string, languages: string[]) => {
    if (languages.length > 1) return "Bilingual";
    return type === "inbound" ? "Inbound" : "Outbound";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Campaign Management</h1>
            <p className="text-muted-foreground mt-2">
              Schedule, monitor, and optimize your voice campaigns
            </p>
          </div>
          <Button onClick={() => alert("New Campaign modal would open here")}>
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Input placeholder="Search campaigns..." className="pl-10" />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Select defaultValue="all-status">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-types">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-types">All Types</SelectItem>
                    <SelectItem value="inbound">Inbound</SelectItem>
                    <SelectItem value="outbound">Outbound</SelectItem>
                    <SelectItem value="bilingual">Bilingual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign List */}
        <div className="space-y-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                      <Badge className={getTypeColor(campaign.type, campaign.languages)}>
                        {getTypeLabel(campaign.type, campaign.languages)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">
                      {campaign.type === "inbound" 
                        ? "Quarterly customer satisfaction survey targeting all active bank customers"
                        : campaign.name.includes("Payment")
                        ? "Automated payment reminders for customers with upcoming loan installments"
                        : "Introduction campaign for new digital savings product targeting young professionals"
                      }
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>
                        <Users className="inline h-4 w-4 mr-1" />
                        {campaign.targetContacts.toLocaleString()} contacts
                      </span>
                      <span>
                        <Phone className="inline h-4 w-4 mr-1" />
                        {campaign.completedContacts.toLocaleString()} completed
                      </span>
                      <span>
                        <Clock className="inline h-4 w-4 mr-1" />
                        {campaign.startDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                    {campaign.status === "active" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => alert(`View analytics for ${campaign.name}`)}>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => alert(`Pausing ${campaign.name}`)}>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                      </>
                    )}
                    {campaign.status === "scheduled" && (
                      <>
                        <Button size="sm" onClick={() => alert(`Starting ${campaign.name} now`)}>
                          <Play className="h-4 w-4 mr-2" />
                          Start Now
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => alert(`Edit ${campaign.name}`)}>
                          Edit
                        </Button>
                      </>
                    )}
                    {campaign.status === "completed" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => alert(`Exporting report for ${campaign.name}`)}>
                          <Download className="h-4 w-4 mr-2" />
                          Export Report
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => alert(`Duplicating ${campaign.name}`)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress Bar for Active/Scheduled Campaigns */}
                {campaign.status !== "completed" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Campaign Progress</span>
                      <span>
                        {((campaign.completedContacts / campaign.targetContacts) * 100).toFixed(1)}%
                        ({campaign.completedContacts.toLocaleString()}/{campaign.targetContacts.toLocaleString()})
                      </span>
                    </div>
                    <Progress 
                      value={(campaign.completedContacts / campaign.targetContacts) * 100} 
                      className="h-2"
                    />
                  </div>
                )}

                {/* Campaign Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-success">{campaign.responseRate}%</div>
                    <div className="text-xs text-muted-foreground">
                      {campaign.status === "completed" ? "Final Response" : "Response Rate"}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-analytics">{campaign.avgDuration}</div>
                    <div className="text-xs text-muted-foreground">Avg Duration</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-warning">{campaign.satisfaction}/5</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-bold text-purple-500">{campaign.swahiliPreference}%</div>
                    <div className="text-xs text-muted-foreground">Swahili Pref</div>
                  </div>
                  {campaign.status === "completed" && (
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-success">340%</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                  )}
                </div>

                {/* Special Info for Scheduled Campaigns */}
                {campaign.status === "scheduled" && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-warning/10 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-warning">Next Run</div>
                      <div className="text-sm text-muted-foreground">{campaign.startDate}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-warning">Expected Duration</div>
                      <div className="text-sm text-muted-foreground">~2.5 hours</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-warning">Success Rate</div>
                      <div className="text-sm text-muted-foreground">{campaign.responseRate}% (historical)</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
