import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Phone, Radio, Check } from "lucide-react";

interface VoiceAgentCardProps {
  type: "inbound" | "outbound";
  title: string;
  description: string;
  features: string[];
  buttonText: string;
}

export function VoiceAgentCard({ type, title, description, features, buttonText }: VoiceAgentCardProps) {
  const Icon = type === "inbound" ? Phone : Radio;
  const colorClass = type === "inbound" ? "text-success bg-success/10" : "text-analytics bg-analytics/10";

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${colorClass}`}>
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <Check className={`h-4 w-4 mr-3 ${type === "inbound" ? "text-success" : "text-analytics"}`} />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full" onClick={() => alert(`${buttonText} configuration would open`)}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
