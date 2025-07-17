import { CheckCircle, Circle } from "lucide-react";

interface Step {
  id: string;
  name: string;
  completed: boolean;
  current: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
}

export const StepIndicator = ({ steps }: StepIndicatorProps) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-background/90 backdrop-blur-sm border border-border rounded-full px-6 py-3 shadow-elevated">
        <div className="flex items-center gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 transition-all duration-300 ${
                step.current 
                  ? 'text-primary font-medium' 
                  : step.completed 
                  ? 'text-green-600' 
                  : 'text-muted-foreground'
              }`}>
                {step.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className={`w-5 h-5 ${step.current ? 'fill-primary text-primary-foreground' : ''}`} />
                )}
                <span className="text-sm hidden sm:block">{step.name}</span>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 transition-colors duration-300 ${
                  step.completed ? 'bg-green-600' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};