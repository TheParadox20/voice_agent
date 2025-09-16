import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { StatsCard } from "@/app/components/stats-card";
import { Phone, TrendingUp, Clock, Star, Users, Calendar, Zap, Headphones, UserCheck } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitor your voice AI platform performance and manage campaigns
            </p>
          </div>
          <div className="flex space-x-3">
            <Link href="/live-voice-session">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Zap className="mr-2 h-4 w-4" />
                Start Voice Session
              </Button>
            </Link>
            <Link href="/surveys">
              <Button variant="outline">Create Survey</Button>
            </Link>
            <Link href="/campaigns">
              <Button variant="outline">New Campaign</Button>
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/surveys">
                <Button className="w-full h-20 flex flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Create Survey</span>
                </Button>
              </Link>
              <Link href="/campaigns">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Campaign</span>
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>View Analytics</span>
                </Button>
              </Link>
              <Link href="/customers">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Manage Customers</span>
                </Button>
              </Link>
              <Link href="/live-agents">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 border-analytics text-analytics hover:bg-analytics/10">
                  <UserCheck className="h-6 w-6" />
                  <span>Live Agents</span>
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline" className="w-full h-20 flex flex-col space-y-2 border-success text-success hover:bg-success/10">
                  <Headphones className="h-6 w-6" />
                  <span>Get Support</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Active Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Customer Satisfaction Q1 2025</h4>
                    <p className="text-sm text-muted-foreground">73.9% complete (1,847/2,500)</p>
                  </div>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Payment Reminders</h4>
                    <p className="text-sm text-muted-foreground">Starts tomorrow 9:00 AM</p>
                  </div>
                  <Badge variant="secondary">Scheduled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Product Introduction</h4>
                    <p className="text-sm text-muted-foreground">Completed last week</p>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Activity */}
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
                    <Phone className="h-4 w-4 text-success-foreground" />
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
                    <Zap className="h-4 w-4 text-analytics-foreground" />
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
                    <TrendingUp className="h-4 w-4 text-warning-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">High engagement detected</p>
                    <p className="text-xs text-muted-foreground">Morning campaigns showing 15% better performance</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">5 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
