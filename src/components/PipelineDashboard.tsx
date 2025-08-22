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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Pipeline</h2>
      
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
                    ? 'bg-green-100 text-green-600' 
                    : isActive 
                    ? 'bg-blue-100 text-blue-600 ring-4 ring-blue-200' 
                    : isNext
                    ? 'bg-orange-100 text-orange-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                  
                  {isActive && (
                    <div className="absolute -inset-1 rounded-full border-2 border-blue-600 animate-pulse" />
                  )}
                </div>
                
                <div className="text-center mt-3">
                  <h3 className={`font-medium text-sm ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 transition-all duration-500 ${
                  index < activeStep ? 'bg-green-400' : 'bg-gray-200'
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