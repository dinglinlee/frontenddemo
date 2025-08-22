import React, { useState } from 'react';
import { ChevronDown, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm glass hover:bg-white/20 rounded-lg transition-all-smooth text-white"
      >
        <Languages className="w-4 h-4" />
        <span>{languages.find(l => l.code === currentLanguage)?.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-2xl border border-white/20 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                currentLanguage === lang.code ? 'bg-neon-blue/20 text-neon-blue' : 'text-gray-300'
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;