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
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-8">
          <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">{translate('uploadImagesFirst')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-orange-600" />
          {translate('ganEnhancement')}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original Image */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">{translate('originalImage')}</h4>
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
            </div>
          </div>
          
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={images.find(img => img.type === selectedImage)?.url}
              alt={`${selectedImage} disaster`}
              className="w-full h-full object-cover"
              style={{ transform: `scale(${zoom / 100})` }}
            />
          </div>
        </div>

        {/* Enhanced/Processing */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">{translate('enhancedImage')}</h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Quality Enhanced</span>
            </div>
          </div>
          
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {!showEnhanced ? (
              <div className="flex items-center justify-center h-full">
                {!isProcessing ? (
                  <button
                    onClick={handleEnhance}
                    className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    <Zap className="w-5 h-5" />
                    <span>{translate('startEnhancement')}</span>
                  </button>
                ) : (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">{translate('processing')}</p>
                    <div className="w-48 bg-gray-200 rounded-full h-2 mt-3">
                      <div className="bg-orange-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={images.find(img => img.type === selectedImage)?.url}
                  alt="Enhanced"
                  className="w-full h-full object-cover filter brightness-110 contrast-125 saturate-110"
                  style={{ transform: `scale(${zoom / 100})` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {showEnhanced && (
        <div className="mt-6 flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-green-900">{translate('enhancementComplete')}</h4>
              <p className="text-sm text-green-700">Image quality enhanced with improved clarity and contrast</p>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>{translate('downloadEnhanced')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EnhancedImageViewer;