import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, TrendingUp, Wrench, Users, Brain, Target } from "lucide-react";

interface Persona {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  focusAreas: string[];
  weights: {
    methods: number;
    related_work: number;
    results: number;
    financials: number;
    technical: number;
  };
}

const personas: Persona[] = [
  {
    id: 'phd_researcher',
    name: 'PhD Researcher',
    description: 'Academic researcher focusing on literature review and methodology',
    icon: <GraduationCap className="w-6 h-6" />,
    focusAreas: ['Literature Review', 'Methodology', 'Prior Studies', 'Research Gaps'],
    weights: { methods: 0.3, related_work: 0.5, results: 0.2, financials: 0.0, technical: 0.3 }
  },
  {
    id: 'investor',
    name: 'Investor',
    description: 'Financial analyst seeking market insights and growth potential',
    icon: <TrendingUp className="w-6 h-6" />,
    focusAreas: ['Financial Performance', 'Market Analysis', 'Growth Metrics', 'ROI'],
    weights: { methods: 0.1, related_work: 0.1, results: 0.2, financials: 0.6, technical: 0.1 }
  },
  {
    id: 'engineer',
    name: 'Technical Engineer',
    description: 'Engineering professional focused on implementation details',
    icon: <Wrench className="w-6 h-6" />,
    focusAreas: ['Technical Specifications', 'Implementation', 'Architecture', 'Performance'],
    weights: { methods: 0.4, related_work: 0.2, results: 0.3, financials: 0.0, technical: 0.6 }
  },
  {
    id: 'product_manager',
    name: 'Product Manager',
    description: 'Product strategist balancing user needs with business goals',
    icon: <Target className="w-6 h-6" />,
    focusAreas: ['User Requirements', 'Market Fit', 'Feature Analysis', 'Roadmap'],
    weights: { methods: 0.2, related_work: 0.3, results: 0.3, financials: 0.2, technical: 0.2 }
  },
  {
    id: 'consultant',
    name: 'Management Consultant',
    description: 'Strategic advisor analyzing business processes and optimization',
    icon: <Users className="w-6 h-6" />,
    focusAreas: ['Process Analysis', 'Strategic Insights', 'Efficiency', 'Recommendations'],
    weights: { methods: 0.3, related_work: 0.2, results: 0.4, financials: 0.3, technical: 0.1 }
  },
  {
    id: 'data_scientist',
    name: 'Data Scientist',
    description: 'Analytics expert extracting insights from data and models',
    icon: <Brain className="w-6 h-6" />,
    focusAreas: ['Data Analysis', 'Model Performance', 'Statistical Methods', 'Validation'],
    weights: { methods: 0.4, related_work: 0.3, results: 0.4, financials: 0.1, technical: 0.5 }
  }
];

interface PersonaSelectorProps {
  selectedPersona: string | null;
  onPersonaSelect: (persona: Persona) => void;
}

export const PersonaSelector = ({ selectedPersona, onPersonaSelect }: PersonaSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Choose Your Persona</h2>
        <p className="text-muted-foreground">
          Select the role that best matches your analysis needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <Card
            key={persona.id}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-card ${
              selectedPersona === persona.id
                ? 'ring-2 ring-primary shadow-glow bg-gradient-card'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onPersonaSelect(persona)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${
                selectedPersona === persona.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                {persona.icon}
              </div>
              <h3 className="text-lg font-semibold">{persona.name}</h3>
            </div>

            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              {persona.description}
            </p>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-foreground">Focus Areas:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {persona.focusAreas.map((area, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-foreground">Priority Weights:</span>
                <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
                  {Object.entries(persona.weights)
                    .filter(([, weight]) => weight > 0)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 3)
                    .map(([key, weight]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize text-muted-foreground">
                        {key.replace('_', ' ')}:
                      </span>
                      <span className="font-medium">{(weight * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedPersona === persona.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Selected Persona
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};