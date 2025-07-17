import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Code, 
  FileText, 
  BarChart3, 
  Target,
  Lightbulb,
  Cpu,
  Zap,
  ArrowRight
} from "lucide-react";
import { Style2HierarchyDemo } from "@/components/Style2HierarchyDemo";

export const Style2HierarchyPage = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [demoFiles] = useState<File[]>([
    new File(['demo'], 'research_paper.pdf', { type: 'application/pdf' }),
    new File(['demo'], 'technical_report.pdf', { type: 'application/pdf' }),
    new File(['demo'], 'academic_thesis.pdf', { type: 'application/pdf' })
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Style2Hierarchy</h1>
          </div>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Revolutionary self-tuning heading detector using K-means clustering and pattern matching 
            for dynamic document structure extraction
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => setSelectedTab("demo")}
              className="bg-background/20 hover:bg-background/30"
            >
              Try Live Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="glass" 
              size="lg"
              onClick={() => setSelectedTab("code")}
            >
              View Implementation
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
            <TabsTrigger value="demo">Live Demo</TabsTrigger>
            <TabsTrigger value="code">Implementation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Makes Style2Hierarchy Novel?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Instead of hardcoding "font size X = H1", we learn the document's style hierarchy dynamically 
                using machine learning clustering techniques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 bg-gradient-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Self-Tuning Clustering</h3>
                </div>
                <p className="text-muted-foreground">
                  Uses K-means clustering to automatically discover document-specific heading patterns 
                  instead of relying on hardcoded rules.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Pattern Validation</h3>
                </div>
                <p className="text-muted-foreground">
                  Cross-validates clustering results with regex patterns and multilingual 
                  support for robust heading detection.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Confidence Scoring</h3>
                </div>
                <p className="text-muted-foreground">
                  Provides transparent confidence scores and reasoning for each detected 
                  heading, enabling quality assessment.
                </p>
              </Card>
            </div>

            <Card className="p-8">
              <h3 className="text-2xl font-semibold mb-6">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Font Feature Extraction</h4>
                      <p className="text-muted-foreground">
                        Extract font size, weight, style, and position information from PDF documents 
                        using advanced parsing techniques.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">K-Means Clustering</h4>
                      <p className="text-muted-foreground">
                        Group similar font styles using unsupervised clustering to automatically 
                        discover the document's heading hierarchy.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Pattern Matching</h4>
                      <p className="text-muted-foreground">
                        Validate clustering results using regex patterns for numbered sections, 
                        chapter headings, and standard document structures.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Multilingual Support</h4>
                      <p className="text-muted-foreground">
                        Handle different scripts (Latin, Devanagari, Arabic, Chinese) with 
                        script-specific detection and fallback strategies.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Confidence Calculation</h4>
                      <p className="text-muted-foreground">
                        Compute confidence scores based on cluster cohesion, pattern matches, 
                        and document structure characteristics.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      6
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Adaptive Output</h4>
                      <p className="text-muted-foreground">
                        Generate structured output with heading levels, confidence scores, 
                        and transparent reasoning for each detection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="algorithm" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Algorithm Deep Dive</h2>
              <p className="text-muted-foreground">
                Technical details of the Style2Hierarchy clustering and pattern matching system
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  K-Means Clustering
                </h3>
                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded p-4">
                    <h4 className="font-medium mb-2">Feature Vector</h4>
                    <code className="text-sm">
                      [font_size, font_weight_binary, position_x, position_y]
                    </code>
                  </div>
                  <div className="bg-secondary/50 rounded p-4">
                    <h4 className="font-medium mb-2">Distance Metric</h4>
                    <code className="text-sm">
                      sqrt((size₁ - size₂)² + (weight₁ - weight₂)²)
                    </code>
                  </div>
                  <div className="bg-secondary/50 rounded p-4">
                    <h4 className="font-medium mb-2">Cluster Assignment</h4>
                    <p className="text-sm text-muted-foreground">
                      Headings ranked by font size: Largest cluster → H1, Second → H2, etc.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Pattern Matching
                </h3>
                <div className="space-y-4">
                  <div className="bg-secondary/50 rounded p-4">
                    <h4 className="font-medium mb-2">Numbered Sections</h4>
                    <code className="text-sm">
                      /^\d+\.\s+/ → 90% confidence
                    </code>
                  </div>
                  <div className="bg-secondary/50 rounded p-4">
                    <h4 className="font-medium mb-2">Chapter Headings</h4>
                    <code className="text-sm">
                      /^(Chapter|Section|Part)\s+\d+/i → 95% confidence
                    </code>
                  </div>
                  <div className="bg-secondary/50 rounded p-4">
                    <h4 className="font-medium mb-2">Standard Sections</h4>
                    <code className="text-sm">
                      /^(Introduction|Conclusion|Abstract)/i → 80% confidence
                    </code>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Confidence Calculation Algorithm</h3>
              <div className="bg-secondary/30 rounded-lg p-6">
                <pre className="text-sm overflow-x-auto">
{`function calculateConfidence(block, cluster) {
  let confidence = cluster.baseConfidence;
  
  // Text length bonus (shorter = more likely heading)
  if (block.text.length < 100) confidence += 0.1;
  
  // Font weight bonus
  if (block.font.weight === 'bold') confidence += 0.15;
  
  // Position bonus (left-aligned headings)
  if (block.position.x < 100) confidence += 0.1;
  
  // Capitalization bonus
  if (/^[A-Z]/.test(block.text)) confidence += 0.05;
  
  // Penalties for body text characteristics
  if (block.text.length > 200) confidence -= 0.2;
  if (block.text.includes('.') && 
      block.text.split('.').length > 2) confidence -= 0.15;
  
  return Math.min(0.95, Math.max(0.1, confidence));
}`}
                </pre>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="demo">
            <Style2HierarchyDemo files={demoFiles} />
          </TabsContent>

          <TabsContent value="code" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Implementation Code</h2>
              <p className="text-muted-foreground">
                Complete TypeScript implementation of the Style2Hierarchy system
              </p>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Core Classes</h3>
                <Badge variant="outline">TypeScript</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary/50 rounded p-4">
                  <h4 className="font-medium mb-2">FontClusterer</h4>
                  <p className="text-sm text-muted-foreground">
                    Implements K-means clustering for font style grouping
                  </p>
                </div>
                <div className="bg-secondary/50 rounded p-4">
                  <h4 className="font-medium mb-2">HeadingPatternMatcher</h4>
                  <p className="text-sm text-muted-foreground">
                    Regex-based pattern validation and multilingual support
                  </p>
                </div>
                <div className="bg-secondary/50 rounded p-4">
                  <h4 className="font-medium mb-2">Style2HierarchyProcessor</h4>
                  <p className="text-sm text-muted-foreground">
                    Main processor coordinating clustering and validation
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-medium">K-means++ Initialization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-medium">Convergence Detection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-medium">Cluster Cohesion Analysis</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-medium">Multilingual Pattern Detection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-medium">Transparent Confidence Scoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="font-medium">Adaptive Threshold Adjustment</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Usage Example</h3>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  View Full Code
                </Button>
              </div>
              <div className="bg-secondary/30 rounded-lg p-6">
                <pre className="text-sm overflow-x-auto">
{`import { Style2HierarchyProcessor, PDFDocumentParser } from './style2hierarchy';

// Initialize processor
const processor = new Style2HierarchyProcessor();

// Extract text blocks from PDF
const textBlocks = await PDFDocumentParser.extractTextBlocks(pdfFile);

// Run analysis
const results = processor.processDocument(textBlocks);

// Access results
console.log('Headings found:', results.headings.length);
console.log('Average confidence:', results.summary.averageConfidence);
console.log('Font clusters:', results.clusters);`}
                </pre>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};