import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Brain, 
  Target, 
  Zap, 
  Play,
  CheckCircle,
  BarChart3,
  Eye,
  Code
} from "lucide-react";
import { 
  Style2HierarchyProcessor, 
  PDFDocumentParser, 
  HeadingCandidate, 
  ClusterInfo,
  TextBlock 
} from "@/lib/style2hierarchy";

interface Style2HierarchyDemoProps {
  files: File[];
}

export const Style2HierarchyDemo = ({ files }: Style2HierarchyDemoProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{
    headings: HeadingCandidate[];
    clusters: ClusterInfo[];
    summary: any;
    textBlocks: TextBlock[];
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const runStyle2Hierarchy = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Step 1: Parse PDF documents
      setCurrentStep('Parsing PDF documents and extracting text blocks...');
      setProgress(20);
      
      const allTextBlocks: TextBlock[] = [];
      for (const file of files.slice(0, 3)) { // Process first 3 files for demo
        const blocks = await PDFDocumentParser.extractTextBlocks(file);
        allTextBlocks.push(...blocks);
      }
      
      // Step 2: Initialize processor
      setCurrentStep('Initializing Style2Hierarchy processor...');
      setProgress(40);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const processor = new Style2HierarchyProcessor();
      
      // Step 3: Run clustering and analysis
      setCurrentStep('Running K-means clustering on font styles...');
      setProgress(60);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCurrentStep('Detecting heading patterns and validating...');
      setProgress(80);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Step 4: Process document
      const processingResults = processor.processDocument(allTextBlocks);
      
      setCurrentStep('Analysis complete!');
      setProgress(100);
      
      setResults({
        ...processingResults,
        textBlocks: allTextBlocks
      });
      
    } catch (error) {
      console.error('Error processing documents:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-500';
    if (confidence >= 0.8) return 'bg-blue-500';
    if (confidence >= 0.7) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getConfidenceBadgeColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-100 text-green-800';
    if (confidence >= 0.8) return 'bg-blue-100 text-blue-800';
    if (confidence >= 0.7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Style2Hierarchy Demo</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience our novel self-tuning heading detector using K-means clustering 
          and pattern matching for dynamic document structure extraction.
        </p>
      </div>

      {!isProcessing && !results && (
        <Card className="p-8 text-center bg-gradient-card">
          <div className="max-w-2xl mx-auto">
            <Target className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Ready to Extract Document Structure</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our Style2Hierarchy algorithm will analyze your {files.length} documents using:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
              <div className="bg-background/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="font-medium">K-Means Clustering</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically groups similar font styles to identify heading hierarchies
                </p>
              </div>
              
              <div className="bg-background/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-primary" />
                  <span className="font-medium">Pattern Matching</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Validates headings using regex patterns and multilingual support
                </p>
              </div>
            </div>

            <Button onClick={runStyle2Hierarchy} variant="hero" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Run Style2Hierarchy Analysis
            </Button>
          </div>
        </Card>
      )}

      {isProcessing && (
        <Card className="p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-primary animate-pulse" />
              <h3 className="text-xl font-semibold">Processing Documents</h3>
            </div>
            <p className="text-muted-foreground">{currentStep}</p>
          </div>
          
          <div className="max-w-md mx-auto">
            <Progress value={progress} className="mb-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Processing...</span>
              <span>{progress}%</span>
            </div>
          </div>
        </Card>
      )}

      {results && (
        <div className="space-y-8">
          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-card">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{results.summary.totalBlocks}</p>
                  <p className="text-sm text-muted-foreground">Text Blocks</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{results.clusters.length}</p>
                  <p className="text-sm text-muted-foreground">Font Clusters</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{results.summary.headingCandidates}</p>
                  <p className="text-sm text-muted-foreground">Headings Found</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{(results.summary.averageConfidence * 100).toFixed(0)}%</p>
                  <p className="text-sm text-muted-foreground">Avg Confidence</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Cluster Analysis */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Font Style Clusters</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.clusters.map((cluster, index) => (
                <div key={cluster.id} className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-primary`} />
                      <span className="font-medium">Cluster {cluster.id}</span>
                    </div>
                    <Badge className={getConfidenceBadgeColor(cluster.confidence)}>
                      {(cluster.confidence * 100).toFixed(0)}% confidence
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Heading Level:</span>
                      <span className="font-medium">{cluster.headingLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Font Size:</span>
                      <span className="font-medium">{cluster.avgFontSize.toFixed(1)}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sample Count:</span>
                      <span className="font-medium">{cluster.sampleCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Extracted Headings */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Extracted Headings</h3>
              </div>
              <Badge variant="outline">
                Processing Time: {results.summary.processingTime}ms
              </Badge>
            </div>

            <div className="space-y-4">
              {results.headings.map((heading, index) => (
                <div key={index} className="border border-border rounded-lg p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{heading.text}</h4>
                        <Badge variant="outline" className="text-xs">
                          {heading.level}
                        </Badge>
                        {heading.patternMatch && (
                          <Badge className="text-xs bg-green-100 text-green-800">
                            {heading.patternMatch}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>📄 Page {heading.page}</span>
                        <span>📍 Position ({heading.position.x}, {heading.position.y})</span>
                        <span>🎯 Cluster {heading.fontCluster}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getConfidenceColor(heading.confidence)}`}
                            style={{ width: `${heading.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold">{(heading.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Algorithm Reasoning:</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "{heading.reason}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {results.headings.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No headings detected with sufficient confidence threshold.</p>
                <p className="text-sm">Try adjusting the algorithm parameters or uploading different documents.</p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};