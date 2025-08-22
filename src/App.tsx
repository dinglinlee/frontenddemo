import React, { useState, useEffect } from 'react';
import { FileText, AlertTriangle, Building2, Users, MapPin, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DamageSummaryProps {
  onSummaryComplete: () => void;
}

const DamageSummary: React.FC<DamageSummaryProps> = ({ onSummaryComplete }) => {
  const { translate } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const damageData = {
    overall: {
      severity: 'High',
      affectedArea: '12.3 km²',
      damagePercentage: 68,
      estimatedCost: '$45.2M'
    },
    infrastructure: [
      { type: 'Residential Buildings', damage: 85, priority: 1, count: 342 },
      { type: 'Medical Facilities', damage: 60, priority: 1, count: 3 },
      { type: 'Schools', damage: 45, priority: 2, count: 12 },
      { type: 'Roads & Bridges', damage: 72, priority: 2, count: 24 },
      { type: 'Power Grid', damage: 90, priority: 1, count: 8 }
    ],
    population: {
      affected: 23400,
      displaced: 8200,
      vulnerable: 12100
    }
  };

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSummary(true);
      onSummaryComplete();
    }, 4000);
  };

  return (
    <div className="glass rounded-xl shadow-2xl p-6 transition-all-smooth hover:shadow-neon-green/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-neon-green" />
        {translate('damageSummary')}
      </h3>

      {!showSummary ? (
        <div className="text-center py-8">
          {!isGenerating ? (
            <div>
              <AlertTriangle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">{translate('generateSummaryPrompt')}</p>
              <button
                onClick={handleGenerateSummary}
                className="px-6 py-3 bg-neon-green text-white rounded-lg hover:bg-neon-green/80 transition-all-smooth neon-green"
              >
                {translate('generateSummary')}
        </div>
        
              </button>
            </div>
          ) : (
            <div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-green mx-auto mb-4"></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overall Assessment */}
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-red-900">{translate('overallAssessment')}</h4>
              <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">
                {damageData.overall.severity} {translate('severity')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-red-700">{translate('affectedArea')}: </span>
                <span className="font-medium">{damageData.overall.affectedArea}</span>
              </div>
              <div>
                <span className="text-red-700">{translate('damageLevel')}: </span>
                <span className="font-medium">{damageData.overall.damagePercentage}%</span>
              </div>
            </div>
          </div>

          {/* Infrastructure Priority */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              {translate('infrastructurePriority')}
            </h4>
            <div className="space-y-2">
              {damageData.infrastructure
                .sort((a, b) => a.priority - b.priority)
                .map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${
                        item.priority === 1 ? 'bg-red-500' : 'bg-orange-500'
                      }`} />
                      <span className="font-medium text-sm">{item.type}</span>
                    </div>
                    <span className="text-xs text-gray-600">{item.count} {translate('units')}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.damage > 70 ? 'bg-red-500' : 
                        item.damage > 40 ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${item.damage}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-600">{item.damage}% {translate('damaged')}</span>
                    <span className={`text-xs font-medium ${
                      item.priority === 1 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {translate('priority')} {item.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Population Impact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              {translate('populationImpact')}
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {damageData.population.affected.toLocaleString()}
                </div>
                <div className="text-xs text-blue-700">{translate('affected')}</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">
                  {damageData.population.displaced.toLocaleString()}
                </div>
                <div className="text-xs text-orange-700">{translate('displaced')}</div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">
                  {damageData.population.vulnerable.toLocaleString()}
                </div>
                <div className="text-xs text-red-700">{translate('vulnerable')}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DamageSummary;