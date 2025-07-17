import { useState } from "react";
import { Hero } from "@/components/Hero";
import { UploadSection } from "@/components/UploadSection";
import { PersonaSelector } from "@/components/PersonaSelector";
import { ProcessingSection } from "@/components/ProcessingSection";
import { ResultsSection } from "@/components/ResultsSection";
import { StepIndicator } from "@/components/StepIndicator";

type AppStep = 'hero' | 'upload' | 'persona' | 'processing' | 'results';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('hero');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<any>(null);
  const [processingResults, setProcessingResults] = useState<any>(null);

  const handleGetStarted = () => {
    setCurrentStep('upload');
  };

  const handleFilesUploaded = (files: File[]) => {
    setUploadedFiles(files);
    if (files.length >= 3) {
      setCurrentStep('persona');
    }
  };

  const handlePersonaSelect = (persona: any) => {
    setSelectedPersona(persona);
    setCurrentStep('processing');
  };

  const handleProcessingComplete = (results: any) => {
    setProcessingResults(results);
    setCurrentStep('results');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'hero':
        return <Hero onGetStarted={handleGetStarted} />;
      
      case 'upload':
        return (
          <div className="container mx-auto px-6 py-16">
            <UploadSection onFilesUploaded={handleFilesUploaded} />
          </div>
        );
      
      case 'persona':
        return (
          <div className="container mx-auto px-6 py-16">
            <PersonaSelector 
              selectedPersona={selectedPersona?.id || null}
              onPersonaSelect={handlePersonaSelect}
            />
          </div>
        );
      
      case 'processing':
        return (
          <div className="container mx-auto px-6 py-16">
            <ProcessingSection 
              files={uploadedFiles}
              persona={selectedPersona}
              onProcessingComplete={handleProcessingComplete}
            />
          </div>
        );
      
      case 'results':
        return (
          <div className="container mx-auto px-6 py-16">
            <ResultsSection 
              results={processingResults}
              persona={selectedPersona}
            />
          </div>
        );
      
      default:
        return <Hero onGetStarted={handleGetStarted} />;
    }
  };

  const steps = [
    { id: 'upload', name: 'Upload', completed: currentStep !== 'hero' && currentStep !== 'upload', current: currentStep === 'upload' },
    { id: 'persona', name: 'Persona', completed: ['processing', 'results'].includes(currentStep), current: currentStep === 'persona' },
    { id: 'processing', name: 'Process', completed: currentStep === 'results', current: currentStep === 'processing' },
    { id: 'results', name: 'Results', completed: false, current: currentStep === 'results' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {currentStep !== 'hero' && <StepIndicator steps={steps} />}
      {renderCurrentStep()}
    </div>
  );
};

export default Index;
