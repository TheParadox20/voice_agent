import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LanguageDistributionProps {
  data: {
    english: number;
    swahili: number;
    mixed: number;
    total: number;
  };
}

export function LanguageDistributionChart({ data }: LanguageDistributionProps) {
  const englishPercentage = Math.round((data.english / data.total) * 100);
  const swahiliPercentage = Math.round((data.swahili / data.total) * 100);
  const mixedPercentage = Math.round((data.mixed / data.total) * 100);

  return (
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
            <span className="font-semibold">{englishPercentage}%</span>
          </div>
          <Progress value={englishPercentage} className="h-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-success rounded-full mr-3"></div>
              <span>Swahili</span>
            </div>
            <span className="font-semibold">{swahiliPercentage}%</span>
          </div>
          <Progress value={swahiliPercentage} className="h-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-warning rounded-full mr-3"></div>
              <span>Mixed Languages</span>
            </div>
            <span className="font-semibold">{mixedPercentage}%</span>
          </div>
          <Progress value={mixedPercentage} className="h-2" />
        </div>
        
        <div className="mt-6 text-center">
          <div className="text-2xl font-bold">{data.total.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Calls</div>
        </div>
      </CardContent>
    </Card>
  );
}

interface SentimentAnalysisProps {
  data: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export function SentimentAnalysisChart({ data }: SentimentAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Positive</span>
              <span>{data.positive}%</span>
            </div>
            <Progress value={data.positive} className="h-3" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Neutral</span>
              <span>{data.neutral}%</span>
            </div>
            <Progress value={data.neutral} className="h-3" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Negative</span>
              <span>{data.negative}%</span>
            </div>
            <Progress value={data.negative} className="h-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface HourlyPerformanceProps {
  data: Array<{
    time: string;
    calls: number;
    rate: number;
  }>;
}

export function HourlyPerformanceChart({ data }: HourlyPerformanceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hourly Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((hour) => (
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
  );
}

interface VoiceAgentPerformanceProps {
  data: Array<{
    name: string;
    status: "active" | "maintenance";
    load: number;
  }>;
}

export function VoiceAgentPerformanceChart({ data }: VoiceAgentPerformanceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Voice Agent Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((agent) => (
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
  );
}

interface RegionalDistributionProps {
  data: Array<{
    region: string;
    calls: number;
    percentage: number;
  }>;
}

export function RegionalDistributionChart({ data }: RegionalDistributionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((region) => (
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
  );
}
