import React, { useState } from 'react';
import { Brain, Eye, Layers, ZoomIn, ZoomOut, RotateCcw, Target, AlertTriangle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

interface SkaiAnalysisProps {
  onAnalysisComplete: () => void;
}

const SkaiAnalysis: React.FC<SkaiAnalysisProps> = ({ onAnalysisComplete }) => {
  const { images } = useData();
  const { translate } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedImage, setSelectedImage] = useState<'pre' | 'post'>('post');
  const [zoom, setZoom] = useState(100);
  const [showDamageOverlay, setShowDamageOverlay] = useState(true);
  const [selectedDamageArea, setSelectedDamageArea] = useState<number | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
      onAnalysisComplete();
    }, 4000);
  };

  const damageAreas = [
    { 
      id: 1,
      x: 20, 
      y: 30, 
      width: 15, 
      height: 12, 
      severity: 'high', 
      type: 'Building Collapse',
      confidence: 0.94,
      buildingCount: 12,
      description: 'Complete structural failure of residential buildings'
    },
    { 
      id: 2,
      x: 60, 
      y: 45, 
      width: 10, 
      height: 8, 
      severity: 'medium', 
      type: 'Road Damage',
      confidence: 0.87,
      buildingCount: 0,
      description: 'Major road infrastructure damage with debris'
    },
    { 
      id: 3,
      x: 35, 
      y: 65, 
      width: 18, 
      height: 10, 
      severity: 'high', 
      type: 'Infrastructure',
      confidence: 0.91,
      buildingCount: 8,
      description: 'Critical infrastructure damage including power lines'
    },
    { 
      id: 4,
      x: 75, 
      y: 20, 
      width: 12, 
      height: 15, 
      severity: 'low', 
      type: 'Debris Field',
      confidence: 0.76,
      buildingCount: 3,
      description: 'Scattered debris with minor structural damage'
    }
  ];

  if (!images.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Upload enhanced images to begin SKAI analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl shadow-2xl p-6 transition-all-smooth hover:shadow-neon-purple/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Brain className="w-5 h-5 mr-2 text-neon-purple" />
          SKAI Damage Analysis
        </h3>
        
        <div className="flex items-center space-x-3">
          <div className="flex glass-dark rounded-lg p-1">
            <button
              onClick={() => setSelectedImage('pre')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedImage === 'pre' 
                  ? 'bg-white/20 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pre-Disaster
            </button>
            <button
              onClick={() => setSelectedImage('post')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedImage === 'post' 
                  ? 'bg-white/20 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Post-Disaster
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Analysis View */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-white">Satellite Image Analysis</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 25))}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-300">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(100)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              {showAnalysis && (
                <button
                  onClick={() => setShowDamageOverlay(!showDamageOverlay)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded text-sm ${
                    showDamageOverlay 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Damage Overlay</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="relative aspect-video glass-dark rounded-lg overflow-hidden border-2 border-white/10">
            {!showAnalysis ? (
              <div className="relative w-full h-full">
                <img
                  src={images.find(img => img.type === selectedImage)?.url}
                  alt={`${selectedImage} disaster`}
                  className="w-full h-full object-cover"
                  style={{ transform: `scale(${zoom / 100})` }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                  {!isAnalyzing ? (
                    <button
                      onClick={handleAnalyze}
                      className="flex items-center space-x-2 px-6 py-3 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/80 transition-all-smooth neon-purple"
                    >
                      <Target className="w-5 h-5" />
                      <span>Detect Damage</span>
                    </button>
                  ) : (
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-purple mx-auto mb-4"></div>
                      <p className="mb-2">Analyzing with SKAI...</p>
                      <div className="w-48 bg-white/20 rounded-full h-2">
                        <div className="bg-neon-purple h-2 rounded-full animate-pulse" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={images.find(img => img.type === selectedImage)?.url}
                  alt="SKAI Analysis"
                  className="w-full h-full object-cover"
                  style={{ transform: `scale(${zoom / 100})` }}
                />
                
                {showDamageOverlay && selectedImage === 'post' && (
                  <div className="absolute inset-0">
                    {damageAreas.map((area) => (
                      <div
                        key={area.id}
                        className={`absolute border-2 rounded cursor-pointer transition-all duration-200 ${
                          area.severity === 'high' 
                            ? 'border-red-500 bg-red-500 bg-opacity-20' 
                            : area.severity === 'medium'
                            ? 'border-orange-500 bg-orange-500 bg-opacity-20'
                            : 'border-yellow-500 bg-yellow-500 bg-opacity-20'
                        } ${
                          selectedDamageArea === area.id 
                            ? 'ring-2 ring-white ring-opacity-50 scale-105' 
                            : 'hover:scale-105'
                        }`}
                        style={{
                          left: `${area.x}%`,
                          top: `${area.y}%`,
                          width: `${area.width}%`,
                          height: `${area.height}%`,
                        }}
                        onClick={() => setSelectedDamageArea(
                          selectedDamageArea === area.id ? null : area.id
                        )}
                      >
                        <div className="absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full border-2 border-current flex items-center justify-center">
                          <span className="text-xs font-bold">{area.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results Panel */}
        <div className="space-y-4">
          <h4 className="font-medium text-white">Analysis Results</h4>
          
          {!showAnalysis ? (
            <div className="text-center py-8">
              <AlertTriangle className="w-8 h-8 text-gray-500 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Run damage detection to see results</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Summary Stats */}
              <div className="p-3 glass-dark border border-neon-purple/30 rounded-lg">
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-neon-purple">Damaged Areas:</span>
                    <span className="font-medium text-white">{damageAreas.length}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neon-purple">Buildings Affected:</span>
                    <span className="font-medium text-white">
                      {damageAreas.reduce((sum, area) => sum + area.buildingCount, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neon-purple">Avg. Confidence:</span>
                    <span className="font-medium text-white">
                      {Math.round(damageAreas.reduce((sum, area) => sum + area.confidence, 0) / damageAreas.length * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Damage Areas List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {damageAreas.map((area) => (
                  <div
                    key={area.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedDamageArea === area.id
                        ? 'border-neon-purple bg-neon-purple/10'
                        : 'border-white/20 hover:border-neon-purple/50'
                    }`}
                    onClick={() => setSelectedDamageArea(
                      selectedDamageArea === area.id ? null : area.id
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${
                          area.severity === 'high' ? 'bg-red-500' :
                          area.severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`} />
                        <span className="font-medium text-sm">Area {area.id}</span>
                      </div>
                      <span className="text-xs text-gray-400">{Math.round(area.confidence * 100)}%</span>
                    </div>
                    
                    <div className="text-xs text-gray-300 mb-1">
                      <strong>{area.type}</strong>
                    </div>
                    
                    <div className="text-xs text-gray-400">
                      {area.description}
                    </div>
                    
                    {area.buildingCount > 0 && (
                      <div className="text-xs text-gray-400 mt-1">
                        {area.buildingCount} buildings affected
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showAnalysis && (
        <div className="mt-6 flex items-center justify-between p-4 glass-dark border border-neon-purple/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-neon-purple/20 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-neon-purple" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-neon-purple">SKAI Analysis Complete</h4>
              <p className="text-sm text-gray-300">
                Detected {damageAreas.length} damage areas with {damageAreas.reduce((sum, area) => sum + area.buildingCount, 0)} affected buildings
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkaiAnalysis;