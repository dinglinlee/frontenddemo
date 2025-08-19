import React from 'react';
import { Satellite, Globe, Shield } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-blue-600" />
              <Satellite className="w-4 h-4 text-orange-500 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SKAI Response</h1>
              <p className="text-xs text-gray-500">AI Disaster Assessment Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <span>Humanitarian Operations</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;