'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { StatsCard } from "@/app/components/stats-card";
import { Progress } from "@/app/components/ui/progress";
import { Phone, TrendingUp, Clock, Star, BarChart3, Users, Zap, AlertTriangle } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Real-time Analytics & Insights</h1>
          <p className="text-muted-foreground mt-2">
            Monitor campaign performance and customer engagement metrics
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total Calls Today"
            value="2,847"
            subtitle="+12.3% from yesterday"
            icon={Phone}
            color="analytics"
          />
          <StatsCard
            title="Response Rate"
            value="87.5%"
            subtitle="+5.2% improvement"
            icon={TrendingUp}
            color="success"
          />
          <StatsCard
            title="Avg Call Duration"
            value="3:42"
            subtitle="Optimal range"
            icon={Clock}
            color="warning"
          />
          <StatsCard
            title="Customer Satisfaction"
            value="4.6/5"
            subtitle="Excellent rating"
            icon={Star}
            color="success"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Language Usage Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Language Usage Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-analytics rounded-full mr-3"></div>
                    <span>English</span>
                  </div>
                  <span className="font-semibold">45%</span>
                </div>
                <Progress value={45} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-success rounded-full mr-3"></div>
                    <span>Swahili</span>
                  </div>
                  <span className="font-semibold">40%</span>
                </div>
                <Progress value={40} className="h-2" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-warning rounded-full mr-3"></div>
                    <span>Mixed Languages</span>
                  </div>
                  <span className="font-semibold">15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              
              <div className="mt-6 text-center">
                <div className="text-2xl font-bold">2,847</div>
                <div className="text-sm text-muted-foreground">Total Calls</div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Sentiment Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Positive</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Neutral</span>
                    <span>21%</span>
                  </div>
                  <Progress value={21} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Negative</span>
                    <span>7%</span>
                  </div>
                  <Progress value={7} className="h-3" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Key Insights</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Highest satisfaction in morning calls</li>
                  <li>• Swahili speakers show 8% higher engagement</li>
                  <li>• Payment reminder success rate: 94%</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "9:00 AM", calls: 245, rate: 92 },
                  { time: "11:00 AM", calls: 389, rate: 89 },
                  { time: "2:00 PM", calls: 456, rate: 94 },
                  { time: "4:00 PM", calls: 312, rate: 87 },
                  { time: "6:00 PM", calls: 198, rate: 85 },
                ].map((hour) => (
                  <div key={hour.time} className="flex items-center justify-between">
                    <span className="text-sm">{hour.time}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{hour.calls} calls</span>
                      <div className="w-16">
                        <Progress value={hour.rate} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{hour.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voice Agent Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Female (Kenyan English)", status: "active", load: 87 },
                  { name: "Male (Swahili)", status: "active", load: 92 },
                  { name: "Female (Swahili)", status: "active", load: 78 },
                  { name: "Male (Kenyan English)", status: "maintenance", load: 0 },
                ].map((agent) => (
                  <div key={agent.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{agent.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        agent.status === "active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                    <Progress value={agent.load} className="h-2" />
                    <div className="text-xs text-muted-foreground">{agent.load}% capacity</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { region: "Nairobi", calls: 1247, percentage: 44 },
                  { region: "Mombasa", calls: 487, percentage: 17 },
                  { region: "Kisumu", calls: 356, percentage: 13 },
                  { region: "Nakuru", calls: 289, percentage: 10 },
                  { region: "Other", calls: 468, percentage: 16 },
                ].map((region) => (
                  <div key={region.region} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{region.region}</span>
                      <span className="text-sm font-medium">{region.calls} calls</span>
                    </div>
                    <Progress value={region.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Activity Feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Activity Feed</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center mr-3">
                    <Star className="h-4 w-4 text-success-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Survey completed by +254712345678</p>
                    <p className="text-xs text-muted-foreground">Customer satisfaction: 5/5 stars</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">Just now</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-analytics/10 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-analytics rounded-full flex items-center justify-center mr-3">
                    <Phone className="h-4 w-4 text-analytics-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Outbound campaign started</p>
                    <p className="text-xs text-muted-foreground">Target: 500 customers, Language: Swahili</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center mr-3">
                    <AlertTriangle className="h-4 w-4 text-warning-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Voice quality alert</p>
                    <p className="text-xs text-muted-foreground">Packet loss detected on agent 'SW-Female-01'</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">5 min ago</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI model update completed</p>
                    <p className="text-xs text-muted-foreground">Swahili language model v2.1 deployed</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
