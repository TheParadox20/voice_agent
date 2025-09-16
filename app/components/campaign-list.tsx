import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, BarChart3, Download, Copy, Users, Phone, Clock } from "lucide-react";
import type { Campaign } from "@shared/schema";

interface CampaignListProps {
  campaigns: Campaign[];
  onStartCampaign?: (id: number) => void;
  onPauseCampaign?: (id: number) => void;
  onViewAnalytics?: (id: number) => void;
  onExportReport?: (id: number) => void;
  onDuplicateCampaign?: (id: number) => void;
}

export function CampaignList({ 
  campaigns, 
  onStartCampaign,
  onPauseCampaign,
  onViewAnalytics,
  onExportReport,
  onDuplicateCampaign
}: CampaignListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "scheduled":
        return "bg-warning text-warning-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      case "paused":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "inbound" ? "bg-success text-success-foreground" : "bg-analytics text-analytics-foreground";
  };

  const getTypeLabel = (type: string) => {
    return type === "inbound" ? "Inbound" : "Outbound";
  };

  const getCampaignDescription = (campaign: Campaign) => {
    if (campaign.name.toLowerCase().includes("satisfaction")) {
      return "Quarterly customer satisfaction survey targeting all active bank customers";
    } else if (campaign.name.toLowerCase().includes("payment")) {
      return "Automated payment reminders for customers with upcoming loan installments";
    } else if (campaign.name.toLowerCase().includes("product")) {
      return "Introduction campaign for new digital savings product targeting young professionals";
    }
    return "Voice campaign for customer engagement and feedback collection";
  };

  const getProgressPercentage = (campaign: Campaign) => {
    const total = campaign.totalContacts || 0;
    const completed = campaign.completedContacts || 0;
    if (total === 0) return 0;
    return (completed / total) * 100;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold">{campaign.name}</h3>
                  <Badge className={getStatusColor(campaign.status || 'draft')}>
                    {(campaign.status || 'draft').charAt(0).toUpperCase() + (campaign.status || 'draft').slice(1)}
                  </Badge>
                  <Badge className={getTypeColor(campaign.type)}>
                    {getTypeLabel(campaign.type)}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-2">
                  {getCampaignDescription(campaign)}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>
                    <Users className="inline h-4 w-4 mr-1" />
                    {(campaign.totalContacts || 0).toLocaleString()} contacts
                  </span>
                  <span>
                    <Phone className="inline h-4 w-4 mr-1" />
                    {(campaign.completedContacts || 0).toLocaleString()} completed
                  </span>
                  <span>
                    <Clock className="inline h-4 w-4 mr-1" />
                    {formatDate(campaign.createdAt?.toString() || "")}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                {campaign.status === "active" && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => onViewAnalytics?.(campaign.id)}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onPauseCampaign?.(campaign.id)}>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  </>
                )}
                {(campaign.status === "scheduled" || campaign.status === "paused") && (
                  <>
                    <Button size="sm" onClick={() => onStartCampaign?.(campaign.id)}>
                      <Play className="h-4 w-4 mr-2" />
                      Start Now
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </>
                )}
                {campaign.status === "completed" && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => onExportReport?.(campaign.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onDuplicateCampaign?.(campaign.id)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Progress Bar for Active/Scheduled Campaigns */}
            {campaign.status !== "completed" && (campaign.totalContacts || 0) > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Campaign Progress</span>
                  <span>
                    {getProgressPercentage(campaign).toFixed(1)}%
                    ({(campaign.completedContacts || 0).toLocaleString()}/{(campaign.totalContacts || 0).toLocaleString()})
                  </span>
                </div>
                <Progress 
                  value={getProgressPercentage(campaign)} 
                  className="h-2"
                />
              </div>
            )}

            {/* Campaign Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-success">
                  {campaign.status === "completed" ? "95.1%" : "87.5%"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {campaign.status === "completed" ? "Final Response" : "Response Rate"}
                </div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-analytics">3:42</div>
                <div className="text-xs text-muted-foreground">Avg Duration</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-warning">4.6/5</div>
                <div className="text-xs text-muted-foreground">Satisfaction</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-purple-500">68%</div>
                <div className="text-xs text-muted-foreground">Swahili Pref</div>
              </div>
            </div>

            {/* Special Info for Scheduled Campaigns */}
            {campaign.status === "scheduled" && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-warning/10 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-warning">Next Run</div>
                  <div className="text-sm text-muted-foreground">Tomorrow, 9:00 AM EAT</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-warning">Expected Duration</div>
                  <div className="text-sm text-muted-foreground">~2.5 hours</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-warning">Success Rate</div>
                  <div className="text-sm text-muted-foreground">87% (historical)</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
