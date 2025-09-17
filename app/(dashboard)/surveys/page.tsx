import { SurveyBuilder } from "@/app/components/survey-builder";

export default function SurveysPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Survey Builder</h1>
          <p className="text-muted-foreground mt-2">
            Create intelligent voice surveys with multilingual support and advanced logic
          </p>
        </div>
        
        <SurveyBuilder />
      </div>
    </div>
  );
}
