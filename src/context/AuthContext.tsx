
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  username: string;
  role: 'admin';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

// Mock admin user for demo purposes
const MOCK_ADMIN = {
  id: '1',
  username: 'mickool',
  password: 'kali', // In a real app, this would be hashed and stored securely
  role: 'admin' as const
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem('magicticket_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === MOCK_ADMIN.username && password === MOCK_ADMIN.password) {
      const authenticatedUser = {
        id: MOCK_ADMIN.id,
        username: MOCK_ADMIN.username,
        role: MOCK_ADMIN.role
      };
      setUser(authenticatedUser);
      localStorage.setItem('magicticket_user', JSON.stringify(authenticatedUser));
    } else {
      throw new Error('Credenciales inválidas');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('magicticket_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
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
