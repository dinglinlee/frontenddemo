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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-600" />
          SKAI Damage Analysis
        </h3>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedImage('pre')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedImage === 'pre' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pre-Disaster
            </button>
            <button
              onClick={() => setSelectedImage('post')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedImage === 'post' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
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
            <h4 className="font-medium text-gray-900">Satellite Image Analysis</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 25))}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-500">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(100)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              {showAnalysis && (
                <button
                  onClick={() => setShowDamageOverlay(!showDamageOverlay)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded text-sm ${
                    showDamageOverlay 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>Damage Overlay</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            {!showAnalysis ? (
              <div className="relative w-full h-full">
                <img
                  src={images.find(img => img.type === selectedImage)?.url}
                  alt={`${selectedImage} disaster`}
                  className="w-full h-full object-cover"
                  style={{ transform: `scale(${zoom / 100})` }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  {!isAnalyzing ? (
                    <button
                      onClick={handleAnalyze}
                      className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Target className="w-5 h-5" />
                      <span>Detect Damage</span>
                    </button>
                  ) : (
                    <div className="text-center text-white">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p className="mb-2">Analyzing with SKAI...</p>
                      <div className="w-48 bg-gray-200 bg-opacity-30 rounded-full h-2">
                        <div className="bg-purple-400 h-2 rounded-full animate-pulse" style={{ width: '80%' }}></div>
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
          <h4 className="font-medium text-gray-900">Analysis Results</h4>
          
          {!showAnalysis ? (
            <div className="text-center py-8">
              <AlertTriangle className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Run damage detection to see results</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Summary Stats */}
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-purple-700">Damaged Areas:</span>
                    <span className="font-medium text-purple-900">{damageAreas.length}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-purple-700">Buildings Affected:</span>
                    <span className="font-medium text-purple-900">
                      {damageAreas.reduce((sum, area) => sum + area.buildingCount, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Avg. Confidence:</span>
                    <span className="font-medium text-purple-900">
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
                        ? 'border-purple-300 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
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
                      <span className="text-xs text-gray-500">{Math.round(area.confidence * 100)}%</span>
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-1">
                      <strong>{area.type}</strong>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {area.description}
                    </div>
                    
                    {area.buildingCount > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
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
        <div className="mt-6 flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-purple-900">SKAI Analysis Complete</h4>
              <p className="text-sm text-purple-700">
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