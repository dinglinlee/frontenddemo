import React, { useState } from 'react';
import { User, LogOut, Settings, Shield, MapPin, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const getOrgColor = (org: string) => {
    switch (org) {
      case 'UNHCR': return 'blue';
      case 'International Red Cross': return 'red';
      case 'UNICEF': return 'cyan';
      case 'World Food Programme': return 'orange';
      default: return 'gray';
    }
  };

  const orgColor = getOrgColor(user.organization);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className={`w-8 h-8 bg-${orgColor}-100 rounded-full flex items-center justify-center`}>
              <User className={`w-4 h-4 text-${orgColor}-600`} />
            </div>
          )}
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 bg-${orgColor}-500 rounded-full border-2 border-white`} />
        </div>
        
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{user.organization}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          {/* Profile Header */}
          <div className={`p-4 bg-gradient-to-r from-${orgColor}-500 to-${orgColor}-600 rounded-t-xl`}>
            <div className="flex items-center space-x-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="text-white">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm opacity-90">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-4 space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <Building className="w-4 h-4 text-gray-400" />
              <div>
                <span className="text-gray-600">Organization:</span>
                <span className="ml-2 font-medium text-gray-900">{user.organization}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <div>
                <span className="text-gray-600">Region:</span>
                <span className="ml-2 font-medium text-gray-900">{user.region}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-sm">
              <Shield className="w-4 h-4 text-gray-400" />
              <div>
                <span className="text-gray-600">Access Level:</span>
                <span className="ml-2 font-medium text-green-600">Authorized</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 p-2">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;