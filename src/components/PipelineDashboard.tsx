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
    <div className="card-futuristic rounded-xl p-6 hover-lift transition-glow">
      <h2 className="text-xl font-semibold text-gray-100 mb-6 text-gradient">Analysis Pipeline</h2>
      
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;
          const isNext = index === activeStep + 1;
          
          return (
            <div key={index} className="flex items-center">
              <div
                className={`flex flex-col items-center cursor-pointer transition-all-smooth ${
                  isActive ? 'scale-110' : ''
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`relative p-3 rounded-full transition-all-smooth ${
                  isCompleted 
                    ? 'bg-neon-green/20 text-neon-green border border-neon-green/30 shadow-glow' 
                    : isActive 
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30 shadow-glow animate-pulse-glow' 
                    : isNext
                    ? 'bg-neon-orange/20 text-neon-orange border border-neon-orange/30'
                    : 'bg-gray-800 text-gray-500 border border-gray-600'
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
                  <h3 className={`font-medium text-sm transition-colors ${
                    isActive ? 'text-neon-blue' : isCompleted ? 'text-neon-green' : 'text-gray-300'
                  }`}>
                    {step.label}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{step.desc}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 transition-all-smooth rounded-full ${
                  index < activeStep ? 'bg-gradient-to-r from-neon-green to-neon-cyan shadow-glow' : 'bg-gray-600'
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