import React, { useState } from 'react';
import { Download, FileText, Image, Map, Share2, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ReportDownload: React.FC = () => {
  const { translate } = useLanguage();
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['pdf']);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportFormats = [
    { id: 'pdf', name: 'PDF Report', icon: FileText, size: '2.4 MB' },
    { id: 'images', name: 'Enhanced Images', icon: Image, size: '15.2 MB' },
    { id: 'gis', name: 'GIS Data', icon: Map, size: '892 KB' },
    { id: 'json', name: 'Raw Data (JSON)', icon: FileText, size: '145 KB' }
  ];

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats(prev =>
      prev.includes(formatId)
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Simulate download
      alert(translate('downloadStarted'));
    }, 2000);
  };

  const getTotalSize = () => {
    return reportFormats
      .filter(format => selectedFormats.includes(format.id))
      .reduce((total, format) => {
        const size = parseFloat(format.size);
        const unit = format.size.includes('MB') ? 1 : 0.001;
        return total + (size * unit);
      }, 0)
      .toFixed(1);
  };

  return (
    <div className="glass rounded-xl shadow-2xl p-6 transition-all-smooth hover:shadow-neon-purple/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Download className="w-5 h-5 mr-2 text-neon-purple" />
        {translate('downloadReports')}
      </h3>

      {/* Report Summary */}
      <div className="mb-6 p-4 glass-dark border border-neon-purple/30 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-neon-purple">{translate('disasterReport')}</h4>
          <span className="text-xs text-neon-purple bg-neon-purple/20 px-2 py-1 rounded border border-neon-purple/30">
            {translate('completed')}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Format Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-white mb-3">{translate('selectFormats')}</h4>
        <div className="space-y-2">
          {reportFormats.map((format) => {
            const Icon = format.icon;
            const isSelected = selectedFormats.includes(format.id);
            
            return (
              <label
                key={format.id}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-neon-purple/50 bg-neon-purple/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleFormatToggle(format.id)}
                    className="w-4 h-4 text-neon-purple border-gray-300 rounded focus:ring-neon-purple"
                  />
                  <Icon className={`w-4 h-4 ${
                    isSelected ? 'text-neon-purple' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isSelected ? 'text-white' : 'text-gray-300'
                  }`}>
                    {format.name}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{format.size}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Download Summary */}
      {selectedFormats.length > 0 && (
        <div className="mb-6 p-3 glass-dark rounded-lg border border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">
              {selectedFormats.length} {translate('itemsSelected')}
            </span>
            <span className="font-medium text-white">
              {translate('totalSize')}: {getTotalSize()} MB
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleGenerateReport}
          disabled={selectedFormats.length === 0 || isGenerating}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all-smooth neon-purple"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              <span>{translate('generating')}</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>{translate('download')}</span>
            </>
          )}
        </button>
        
        <button className="flex items-center justify-center space-x-2 px-4 py-3 glass-dark text-gray-300 rounded-lg hover:bg-white/20 transition-all-smooth border border-white/20">
          <Share2 className="w-4 h-4" />
          <span>{translate('share')}</span>
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-4 p-3 glass-dark border border-neon-blue/30 rounded-lg">
        <p className="text-xs text-neon-blue">
          {translate('downloadHelp')}
        </p>
      </div>
    </div>
  );
};

export default ReportDownload;