import React from 'react';
import { Upload, Zap, Brain, FileText, Download, CheckCircle, Circle } from 'lucide-react';

interface PipelineDashboardProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const PipelineDashboard: React.FC<PipelineDashboardProps> = ({ activeStep, setActiveStep }) => {
  const steps = [
    { icon: Upload, label: 'Upload Images', desc: 'Pre & Post Disaster' },
    { icon: Zap, label: 'GAN Enhancement', desc: 'Image Processing' },
    { icon: Brain, label: 'SKAI Analysis', desc: 'Damage Detection' },
    { icon: FileText, label: 'AI Summary', desc: 'Damage Assessment' },
    { icon: Download, label: 'Generate Report', desc: 'Final Output' }
  ];

  return (
    <div className="glass rounded-xl shadow-2xl p-6 neon-blue transition-all-smooth">
      <h2 className="text-xl font-semibold text-white mb-6">Analysis Pipeline</h2>
      
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;
          const isNext = index === activeStep + 1;
          
          return (
            <div key={index} className="flex items-center">
              <div
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  isActive ? 'scale-110' : ''
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`relative p-3 rounded-full transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-neon-green/20 text-neon-green neon-green' 
                    : isActive 
                    ? 'bg-neon-blue/20 text-neon-blue neon-blue ring-4 ring-neon-blue/30' 
                    : isNext
                    ? 'bg-neon-orange/20 text-neon-orange'
                    : 'bg-white/10 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                  
                  {isActive && (
                    <div className="absolute -inset-1 rounded-full border-2 border-neon-blue animate-pulse" />
                  )}
                </div>
                
                <div className="text-center mt-3">
                  <h3 className={`font-medium text-sm ${
                    isActive ? 'text-neon-blue' : isCompleted ? 'text-neon-green' : 'text-gray-300'
                  }`}>
                    {step.label}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{step.desc}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 transition-all duration-500 ${
                  index < activeStep ? 'bg-neon-green' : 'bg-white/20'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineDashboard;