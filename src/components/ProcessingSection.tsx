import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Brain, 
  Zap, 
  CheckCircle, 
  Clock, 
  Cpu,
  Target,
  TrendingUp,
  Play
} from "lucide-react";
import { useState, useEffect } from "react";

interface ProcessingSectionProps {
  files: File[];
  persona: any;
  onProcessingComplete: (results: any) => void;
}

interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'processing' | 'completed';
  progress: number;
  details?: string;
}

export const ProcessingSection = ({ files, persona, onProcessingComplete }: ProcessingSectionProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [steps, setSteps] = useState<ProcessingStep[]>([
    {
      id: 'parsing',
      name: 'Document Parsing',
      description: 'Extracting text, fonts, and layout information',
      icon: <FileText className="w-5 h-5" />,
      status: 'pending',
      progress: 0
    },
    {
      id: 'clustering',
      name: 'Style2Hierarchy Analysis',
      description: 'Self-tuning heading detection and style clustering',
      icon: <Brain className="w-5 h-5" />,
      status: 'pending',
      progress: 0
    },
    {
      id: 'embedding',
      name: 'Semantic Embedding',
      description: 'Computing embeddings with all-MiniLM-L6-v2',
      icon: <Cpu className="w-5 h-5" />,
      status: 'pending',
      progress: 0
    },
    {
      id: 'persona_analysis',
      name: 'PersonaLens Filtering',
      description: 'Task-conditioned content relevance scoring',
      icon: <Target className="w-5 h-5" />,
      status: 'pending',
      progress: 0
    },
    {
      id: 'ranking',
      name: 'Intelligent Ranking',
      description: 'Confidence scoring and result optimization',
      icon: <TrendingUp className="w-5 h-5" />,
      status: 'pending',
      progress: 0
    }
  ]);

  const startProcessing = async () => {
    setIsProcessing(true);
    
    // Simulate processing steps
    for (let i = 0; i < steps.length; i++) {
      const stepId = steps[i].id;
      
      // Mark step as processing
      setSteps(prev => prev.map(step => 
        step.id === stepId 
          ? { ...step, status: 'processing' as const }
          : step
      ));

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setSteps(prev => prev.map(step => 
          step.id === stepId 
            ? { ...step, progress }
            : step
        ));
      }

      // Mark as completed
      setSteps(prev => prev.map(step => 
        step.id === stepId 
          ? { 
              ...step, 
              status: 'completed' as const, 
              progress: 100,
              details: getStepDetails(stepId, files, persona)
            }
          : step
      ));
    }

    // Generate mock results
    const results = generateMockResults(files, persona);
    onProcessingComplete(results);
    setIsProcessing(false);
  };

  const getStepDetails = (stepId: string, files: File[], persona: any): string => {
    switch (stepId) {
      case 'parsing':
        return `Processed ${files.length} documents, extracted ${files.length * 847} text blocks`;
      case 'clustering':
        return `Identified ${files.length * 3} heading levels, 94% confidence`;
      case 'embedding':
        return `Generated ${files.length * 156} section embeddings`;
      case 'persona_analysis':
        return `Applied ${persona.name} filters, relevance threshold: 0.75`;
      case 'ranking':
        return `Ranked ${files.length * 23} sections, avg confidence: 0.87`;
      default:
        return '';
    }
  };

  const generateMockResults = (files: File[], persona: any) => {
    const sections = [
      {
        title: "Machine Learning Methodologies",
        document: "research_paper.pdf",
        page: 3,
        level: "H1",
        confidence: 0.94,
        relevance: 0.89,
        reason: "High semantic match + methodology focus",
        content: "This section covers advanced ML techniques including transformers, attention mechanisms, and self-supervised learning approaches..."
      },
      {
        title: "Related Work in Document Intelligence",
        document: "research_paper.pdf", 
        page: 2,
        level: "H1",
        confidence: 0.91,
        relevance: 0.85,
        reason: "Strong persona alignment + contains 'prior studies'",
        content: "Previous research in document understanding has focused on layout analysis, text extraction, and semantic understanding..."
      },
      {
        title: "Financial Performance Analysis",
        document: "financial_report.pdf",
        page: 1,
        level: "H1", 
        confidence: 0.88,
        relevance: persona.id === 'investor' ? 0.92 : 0.45,
        reason: persona.id === 'investor' ? "Perfect financial focus match" : "Low relevance for research persona",
        content: "Q3 revenue increased by 23% year-over-year, driven by strong performance in our core product segments..."
      }
    ];

    return {
      summary: {
        documentsProcessed: files.length,
        sectionsExtracted: files.length * 23,
        averageConfidence: 0.87,
        processingTime: "2.3s"
      },
      sections: sections.sort((a, b) => b.relevance - a.relevance)
    };
  };

  const overallProgress = steps.reduce((sum, step) => sum + step.progress, 0) / steps.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Processing Analysis</h2>
        <p className="text-muted-foreground">
          Running Style2Hierarchy + PersonaLens intelligence pipeline
        </p>
      </div>

      {!isProcessing && overallProgress === 0 && (
        <div className="text-center">
          <Card className="p-8 bg-gradient-card">
            <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready to Process</h3>
            <p className="text-muted-foreground mb-6">
              {files.length} documents loaded for {persona.name} analysis
            </p>
            <Button onClick={startProcessing} variant="hero" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Start Intelligent Analysis
            </Button>
          </Card>
        </div>
      )}

      {(isProcessing || overallProgress > 0) && (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Processing Pipeline</h3>
              <span className="text-sm text-muted-foreground">
                {overallProgress.toFixed(0)}% Complete
              </span>
            </div>
            
            <Progress value={overallProgress} className="mb-6" />
            
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                  <div className={`p-2 rounded-lg ${
                    step.status === 'completed' 
                      ? 'bg-green-100 text-green-600' 
                      : step.status === 'processing'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : step.status === 'processing' ? (
                      <Clock className="w-5 h-5 animate-spin" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{step.name}</h4>
                      <span className="text-sm text-muted-foreground">
                        {step.progress}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    {step.details && (
                      <p className="text-xs text-primary font-medium">
                        {step.details}
                      </p>
                    )}
                    {step.status !== 'pending' && (
                      <Progress value={step.progress} className="h-1 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};