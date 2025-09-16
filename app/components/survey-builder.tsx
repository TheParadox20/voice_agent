import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Play, Save, Plus, Edit, Trash2, GitBranch } from "lucide-react";

interface Question {
  id: string;
  type: "multiple_choice" | "rating" | "open_text" | "yes_no";
  question: string;
  questionSwahili?: string;
  options?: string[];
  required: boolean;
}

export function SurveyBuilder() {
  const [surveyTitle, setSurveyTitle] = useState("Customer Satisfaction Survey");
  const [selectedLanguage, setSelectedLanguage] = useState("en-KE");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      type: "multiple_choice",
      question: "How satisfied are you with our banking services?",
      questionSwahili: "Je, una ridhaa gani na huduma zetu za benki?",
      options: [
        "Very Satisfied / Nina ridhaa sana",
        "Satisfied / Nina ridhaa",
        "Neutral / Si huko wala huko",
        "Dissatisfied / Sina ridhaa"
      ],
      required: true,
    },
    {
      id: "2",
      type: "rating",
      question: "Rate our customer service (1-5 stars)",
      questionSwahili: "Kadiria huduma zetu kwa wateja (nyota 1-5)",
      required: true,
    },
  ]);

  const questionTypes = [
    { value: "multiple_choice", label: "Multiple Choice", icon: "📋" },
    { value: "rating", label: "Rating Scale", icon: "⭐" },
    { value: "open_text", label: "Open Text", icon: "✏️" },
    { value: "yes_no", label: "Yes/No", icon: "🔘" },
  ];

  const addQuestion = (type: string) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: type as Question["type"],
      question: "New question",
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  return (
    <div className="space-y-8">
      {/* Survey Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <Input
                  value={surveyTitle}
                  onChange={(e) => setSurveyTitle(e.target.value)}
                  className="text-lg font-semibold border-none p-0 h-auto bg-transparent"
                />
                <Badge variant="default" className="bg-success text-success-foreground mt-2">
                  Live
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-KE">English (Kenya)</SelectItem>
                  <SelectItem value="sw-KE">Kiswahili (Kenya)</SelectItem>
                  <SelectItem value="en-TZ">English (Tanzania)</SelectItem>
                  <SelectItem value="sw-TZ">Kiswahili (Tanzania)</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => alert("Starting voice preview...")}>
                <Play className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" onClick={() => alert("Survey saved successfully!")}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Question Types Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Question Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {questionTypes.map((type) => (
                <div
                  key={type.value}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => addQuestion(type.value)}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.label}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Voice Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Voice Type</Label>
                <Select defaultValue="female-kenyan">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female-kenyan">Female (Kenyan English)</SelectItem>
                    <SelectItem value="male-kenyan">Male (Kenyan English)</SelectItem>
                    <SelectItem value="female-swahili">Female (Kiswahili)</SelectItem>
                    <SelectItem value="male-swahili">Male (Kiswahili)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium">Speech Rate</Label>
                <input
                  type="range"
                  className="w-full mt-2"
                  min="0.5"
                  max="2"
                  step="0.1"
                  defaultValue="1"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Survey Canvas */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Survey Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <Card key={question.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-analytics border-analytics">
                          Question {index + 1}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => alert(`Edit question ${index + 1}`)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(question.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Input
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                          placeholder="Enter your question"
                        />
                        {question.questionSwahili && (
                          <Input
                            value={question.questionSwahili}
                            onChange={(e) => updateQuestion(question.id, { questionSwahili: e.target.value })}
                            placeholder="Swahili translation"
                            className="text-muted-foreground"
                          />
                        )}
                      </div>

                      {question.type === "multiple_choice" && question.options && (
                        <div className="mt-3 space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                              <div className="w-3 h-3 border border-muted-foreground rounded-full"></div>
                              <span className="text-sm">{option}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "rating" && (
                        <div className="mt-3 flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star} className="text-warning text-lg">⭐</div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {/* Conditional Logic Example */}
                <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <GitBranch className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                        Conditional Logic
                      </span>
                    </div>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      If rating ≤ 2 stars → Ask follow-up question about specific issues
                    </p>
                  </CardContent>
                </Card>

                {/* Add Question Area */}
                <Card className="border-dashed">
                  <CardContent className="p-8 text-center">
                    <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Drag a question type here or click to add</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Survey Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium">Campaign Type</Label>
                <Select defaultValue="inbound">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inbound">Inbound Voice Survey</SelectItem>
                    <SelectItem value="outbound">Outbound Voice Campaign</SelectItem>
                    <SelectItem value="mixed">Mixed Mode (Voice + SMS)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Target Audience</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="existing" defaultChecked />
                    <Label htmlFor="existing" className="text-sm">Existing Customers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="prospective" />
                    <Label htmlFor="prospective" className="text-sm">Prospective Customers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="vip" />
                    <Label htmlFor="vip" className="text-sm">VIP Clients</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Schedule</Label>
                <Input type="datetime-local" className="mt-2" />
                <div className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="timezone" />
                    <Label htmlFor="timezone" className="text-sm">Respect customer time zones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="holidays" />
                    <Label htmlFor="holidays" className="text-sm">Avoid public holidays</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
