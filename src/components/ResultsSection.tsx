import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Brain, 
  TrendingUp, 
  Award, 
  Clock,
  Target,
  ChevronRight,
  Eye,
  Download
} from "lucide-react";

interface ResultsSectionProps {
  results: any;
  persona: any;
}

export const ResultsSection = ({ results, persona }: ResultsSectionProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-500';
    if (confidence >= 0.8) return 'bg-blue-500';
    if (confidence >= 0.7) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 0.9) return 'text-green-600 bg-green-50';
    if (relevance >= 0.8) return 'text-blue-600 bg-blue-50';
    if (relevance >= 0.7) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Analysis Results</h2>
        <p className="text-muted-foreground">
          Intelligent document analysis tailored for {persona.name}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{results.summary.documentsProcessed}</p>
              <p className="text-sm text-muted-foreground">Documents</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{results.summary.sectionsExtracted}</p>
              <p className="text-sm text-muted-foreground">Sections Found</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{(results.summary.averageConfidence * 100).toFixed(0)}%</p>
              <p className="text-sm text-muted-foreground">Avg Confidence</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{results.summary.processingTime}</p>
              <p className="text-sm text-muted-foreground">Processing Time</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Persona Analysis */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">PersonaLens Analysis for {persona.name}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Persona Focus Areas</h4>
            <div className="flex flex-wrap gap-2">
              {persona.focusAreas.map((area: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Content Weights Applied</h4>
            <div className="space-y-2">
              {Object.entries(persona.weights)
                .filter(([, weight]: [string, any]) => weight > 0)
                .sort(([, a]: [string, any], [, b]: [string, any]) => b - a)
                .map(([key, weight]: [string, any]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{key.replace('_', ' ')}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${weight * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{(weight * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Extracted Sections</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {results.sections.map((section: any, index: number) => (
            <Card key={index} className="p-6 hover:shadow-card transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-lg font-semibold">{section.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {section.level}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <span>📄 {section.document}</span>
                    <span>📍 Page {section.page}</span>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {section.content}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Confidence:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getConfidenceColor(section.confidence)}`}
                            style={{ width: `${section.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold">{(section.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Relevance:</span>
                      <Badge className={getRelevanceColor(section.relevance)}>
                        {(section.relevance * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">AI Reasoning:</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "{section.reason}"
                    </p>
                  </div>
                </div>

                <Button variant="ghost" size="icon" className="mt-2">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center pt-8">
        <Button variant="hero" size="lg">
          <TrendingUp className="w-5 h-5 mr-2" />
          Generate Report
        </Button>
        <Button variant="outline" size="lg">
          Analyze More Documents
        </Button>
      </div>
    </div>
  );
};