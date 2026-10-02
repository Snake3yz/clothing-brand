import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USER } from '../data/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('kayoo_user') || localStorage.getItem('aura_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEMO_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('kayoo_user', JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  const login = (email, password) => {
    // Demo login simulation
    const updated = {
      ...DEMO_USER,
      email: email || DEMO_USER.email,
      name: email ? email.split('@')[0] : DEMO_USER.name
    };
    setUser(updated);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const addAddress = (newAddr) => {
    setUser((prev) => ({
      ...prev,
      addresses: [...(prev.addresses || []), newAddr]
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateProfile,
        addAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
