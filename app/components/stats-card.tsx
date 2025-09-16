import { Card, CardContent } from "@/app/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: "success" | "analytics" | "warning" | "default";
}

export function StatsCard({ title, value, subtitle, icon: Icon, color }: StatsCardProps) {
  const colorClasses = {
    success: "text-success bg-success/10",
    analytics: "text-analytics bg-analytics/10",
    warning: "text-warning bg-warning/10",
    default: "text-muted-foreground bg-muted",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-success">{subtitle}</p>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
