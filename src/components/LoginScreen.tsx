import React, { useState } from 'react';
import { Shield, Satellite, Eye, EyeOff, AlertCircle, Globe, Users, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginScreen: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedDemo, setSelectedDemo] = useState('');

  const demoAccounts = [
    {
      id: 'unhcr.admin',
      name: 'UNHCR Emergency Coordinator',
      org: 'UNHCR',
      region: 'Caribbean Region',
      icon: Shield,
      color: 'blue',
      username: 'unhcr.admin',
      password: 'humanitarian2024'
    },
    {
      id: 'redcross.field',
      name: 'Red Cross Field Manager',
      org: 'International Red Cross',
      region: 'Haiti Operations',
      icon: Heart,
      color: 'red',
      username: 'redcross.field',
      password: 'response123'
    },
    {
      id: 'unicef.analyst',
      name: 'UNICEF Data Analyst',
      org: 'UNICEF',
      region: 'West Africa Hub',
      icon: Users,
      color: 'cyan',
      username: 'unicef.analyst',
      password: 'children2024'
    },
    {
      id: 'wfp.logistics',
      name: 'WFP Logistics Coordinator',
      org: 'World Food Programme',
      region: 'Central America',
      icon: Globe,
      color: 'orange',
      username: 'wfp.logistics',
      password: 'foodsecurity'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const success = await login(username, password);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleDemoLogin = (account: typeof demoAccounts[0]) => {
    setUsername(account.username);
    setPassword(account.password);
    setSelectedDemo(account.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding & Info */}
        <div className="text-center lg:text-left space-y-8">
          <div className="flex items-center justify-center lg:justify-start space-x-3">
            <div className="relative">
              <Shield className="w-12 h-12 text-blue-600" />
              <Satellite className="w-6 h-6 text-orange-500 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SKAI Response</h1>
              <p className="text-gray-600">AI Disaster Assessment Platform</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Humanitarian Operations Dashboard
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Advanced AI-powered platform integrating satellite imagery analysis, 
              GAN enhancement, and multilingual support for rapid disaster response 
              and humanitarian coordination.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Satellite className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">SKAI Analysis</h3>
                  <p className="text-sm text-gray-600">Automated damage detection</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">GAN Enhancement</h3>
                  <p className="text-sm text-gray-600">Image quality improvement</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Multilingual AI</h3>
                  <p className="text-sm text-gray-600">GPT-powered assistance</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Population Maps</h3>
                  <p className="text-sm text-gray-600">Vulnerability analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Secure Access</h3>
            <p className="text-gray-600">Sign in with your humanitarian organization credentials</p>
          </div>

          {/* Demo Accounts */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Demo Accounts:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {demoAccounts.map((account) => {
                const Icon = account.icon;
                return (
                  <button
                    key={account.id}
                    onClick={() => handleDemoLogin(account)}
                    className={`p-3 text-left border rounded-lg hover:shadow-md transition-all ${
                      selectedDemo === account.id 
                        ? `border-${account.color}-300 bg-${account.color}-50` 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-4 h-4 text-${account.color}-600`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-900 truncate">{account.org}</p>
                        <p className="text-xs text-gray-600 truncate">{account.region}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="organization.username"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              This is a demonstration platform. In production, authentication would be 
              integrated with your organization's identity management system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;