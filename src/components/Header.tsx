import React from 'react';
import { Satellite, Globe, Shield } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import UserProfile from './UserProfile';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="glass-panel border-b border-white/10 backdrop-blur-xl relative">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-purple/5"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-purple/5"></div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-neon-blue animate-pulse-glow" />
              <Satellite className="w-4 h-4 text-neon-orange absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white text-glow">SKAI Response</h1>
              <p className="text-xs text-gray-300">AI Disaster Assessment Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            {user && (
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300 px-3 py-1 glass-panel rounded-lg hover-glow transition-glow">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                <span>Active Session</span>
              </div>
            )}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
              <Globe className="w-4 h-4" />
              <span>Humanitarian Operations</span>
            </div>
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;