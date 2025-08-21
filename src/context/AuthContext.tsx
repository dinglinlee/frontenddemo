import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  name: string;
  organization: string;
  role: string;
  region: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const mockUsers: Record<string, { password: string; user: User }> = {
  'unhcr.admin': {
    password: 'humanitarian2024',
    user: {
      id: '1',
      username: 'unhcr.admin',
      name: 'Dr. Sarah Chen',
      organization: 'UNHCR',
      role: 'Emergency Response Coordinator',
      region: 'Caribbean Region',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  },
  'redcross.field': {
    password: 'response123',
    user: {
      id: '2',
      username: 'redcross.field',
      name: 'Marcus Rodriguez',
      organization: 'International Red Cross',
      role: 'Field Operations Manager',
      region: 'Haiti Operations',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  },
  'unicef.analyst': {
    password: 'children2024',
    user: {
      id: '3',
      username: 'unicef.analyst',
      name: 'Dr. Amara Okafor',
      organization: 'UNICEF',
      role: 'Emergency Data Analyst',
      region: 'West Africa Hub',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  },
  'wfp.logistics': {
    password: 'foodsecurity',
    user: {
      id: '4',
      username: 'wfp.logistics',
      name: 'Jean-Pierre Dubois',
      organization: 'World Food Programme',
      role: 'Logistics Coordinator',
      region: 'Central America',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('humanitarian_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('humanitarian_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userRecord = mockUsers[username];
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      localStorage.setItem('humanitarian_user', JSON.stringify(userRecord.user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('humanitarian_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};