import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (!storedUsers['carlos']) {
      storedUsers['carlos'] = '123456';
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (storedUsers[username] === password) {
      setUser(username);
      localStorage.setItem('user', username);
      return true;
    }
    return false;
  };

  const register = (username: string, password: string): boolean => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    if (storedUsers[username]) {
      return false; 
    }
    storedUsers[username] = password;
    localStorage.setItem('users', JSON.stringify(storedUsers));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login'); 
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};