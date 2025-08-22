import React, { useState, useEffect } from 'react';
import { Zap, Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

interface EnhancedImageViewerProps {
  onEnhancementComplete: () => void;
}

const EnhancedImageViewer: React.FC<EnhancedImageViewerProps> = ({ onEnhancementComplete }) => {
  const { images } = useData();
  const { translate } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [selectedImage, setSelectedImage] = useState<'pre' | 'post'>('post');
  const [zoom, setZoom] = useState(100);

  const handleEnhance = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowEnhanced(true);
      onEnhancementComplete();
    }, 3000);
  };

  if (!images.length) {
    return (
      <div className="card-futuristic rounded-xl p-6">
        <div className="text-center py-8">
          <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-float" />
          <p className="text-gray-400">{translate('uploadImagesFirst')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-futuristic rounded-xl p-6 hover-lift transition-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-100 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-neon-orange animate-pulse" />
          {translate('ganEnhancement')}
        </h3>
        
        <div className="flex items-center space-x-3">
          <div className="flex glass-panel rounded-lg p-1">
            <button
              onClick={() => setSelectedImage('pre')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all-smooth ${
                selectedImage === 'pre' 
                  ? 'bg-neon-blue text-white shadow-glow' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Pre-Disaster
            </button>
            <button
              onClick={() => setSelectedImage('post')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all-smooth ${
                selectedImage === 'post' 
                  ? 'bg-neon-blue text-white shadow-glow' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Post-Disaster
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-100">{translate('originalImage')}</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 25))}
                className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-300">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(100)}
                className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="relative aspect-video glass-dark rounded-lg overflow-hidden border border-white/20">
            <img
              src={images.find(img => img.type === selectedImage)?.url}
              alt={`${selectedImage} disaster`}
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ transform: `scale(${zoom / 100})` }}
            />
          </div>
        </div>

        {/* Enhanced/Processing */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-100">{translate('enhancedImage')}</h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neon-green">Quality Enhanced</span>
            </div>
          </div>
          
          <div className="relative aspect-video glass-dark rounded-lg overflow-hidden border border-white/20">
            {!showEnhanced ? (
              <div className="flex items-center justify-center h-full">
                {!isProcessing ? (
                  <button
                    onClick={handleEnhance}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-orange to-neon-yellow text-white rounded-lg hover-glow transition-glow"
                  >
                    <Zap className="w-5 h-5" />
                    <span>{translate('startEnhancement')}</span>
                  </button>
                ) : (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-orange mx-auto mb-4 neon-orange"></div>
                    <p className="text-gray-300">{translate('processing')}</p>
                    <div className="w-48 progress-futuristic rounded-full h-2 mt-3">
                      <div className="bg-gradient-to-r from-neon-orange to-neon-yellow h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={images.find(img => img.type === selectedImage)?.url}
                  alt="Enhanced"
                  className="w-full h-full object-cover filter brightness-110 contrast-125 saturate-110 transition-transform duration-300"
                  style={{ transform: `scale(${zoom / 100})` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {showEnhanced && (
        <div className="mt-6 flex items-center justify-between p-4 glass-panel border border-neon-green/30 rounded-lg hover-glow transition-glow">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-neon-orange/20 rounded-full flex items-center justify-center border border-neon-orange/30">
                <Zap className="w-4 h-4 text-neon-orange" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-neon-green">{translate('enhancementComplete')}</h4>
              <p className="text-sm text-gray-300">Image quality enhanced with improved clarity and contrast</p>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-green to-neon-cyan text-white rounded-lg hover-glow transition-glow">
            <Download className="w-4 h-4" />
            <span>{translate('downloadEnhanced')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EnhancedImageViewer;