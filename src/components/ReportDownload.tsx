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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Download className="w-5 h-5 mr-2 text-purple-600" />
        {translate('downloadReports')}
      </h3>

      {/* Report Summary */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-purple-900">{translate('disasterReport')}</h4>
          <span className="text-xs text-purple-700 bg-purple-200 px-2 py-1 rounded">
            {translate('completed')}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-purple-800">
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
        <h4 className="font-medium text-gray-900 mb-3">{translate('selectFormats')}</h4>
        <div className="space-y-2">
          {reportFormats.map((format) => {
            const Icon = format.icon;
            const isSelected = selectedFormats.includes(format.id);
            
            return (
              <label
                key={format.id}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-purple-300 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleFormatToggle(format.id)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <Icon className={`w-4 h-4 ${
                    isSelected ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isSelected ? 'text-purple-900' : 'text-gray-700'
                  }`}>
                    {format.name}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{format.size}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Download Summary */}
      {selectedFormats.length > 0 && (
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {selectedFormats.length} {translate('itemsSelected')}
            </span>
            <span className="font-medium text-gray-900">
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
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
        
        <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Share2 className="w-4 h-4" />
          <span>{translate('share')}</span>
        </button>
      </div>

      {/* Help Text */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          {translate('downloadHelp')}
        </p>
      </div>
    </div>
  );
};

export default ReportDownload;