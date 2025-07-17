import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, FileText, Zap } from "lucide-react";

export const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-glow/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-glow/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Brain className="w-8 h-8 text-primary-foreground" />
          <span className="text-primary-foreground/80 text-lg font-medium">Adobe Challenge Solution</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          Connecting the{" "}
          <span className="bg-gradient-to-r from-primary-glow to-white bg-clip-text text-transparent">
            Dots
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-4xl mx-auto leading-relaxed">
          Revolutionary hybrid AI system combining{" "}
          <span className="font-semibold text-primary-foreground">Style2Hierarchy</span> and{" "}
          <span className="font-semibold text-primary-foreground">PersonaLens</span> for intelligent document analysis
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onGetStarted}
            className="group"
          >
            Experience the Demo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="glass" 
            size="lg"
            onClick={() => window.open('/style2hierarchy', '_blank')}
          >
            View Style2Hierarchy Details
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
            <FileText className="w-12 h-12 text-primary-foreground mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-primary-foreground mb-2">Style2Hierarchy</h3>
            <p className="text-primary-foreground/80">Self-tuning heading detector that learns document styles dynamically</p>
          </div>
          
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
            <Brain className="w-12 h-12 text-primary-foreground mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-primary-foreground mb-2">PersonaLens</h3>
            <p className="text-primary-foreground/80">Context-aware filtering using task-conditioned embeddings</p>
          </div>
          
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
            <Zap className="w-12 h-12 text-primary-foreground mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-primary-foreground mb-2">Lightweight & Fast</h3>
            <p className="text-primary-foreground/80">Optimized for efficiency without compromising intelligence</p>
          </div>
        </div>
      </div>
    </div>
  );
};