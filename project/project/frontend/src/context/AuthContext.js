import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // For demo purposes, we'll use a mock admin user
  // In a real app, this would come from login/authentication
  useEffect(() => {
    // Mock admin user - replace with actual authentication
    const mockUser = {
      id: '507f1f77bcf86cd799439011', // Mock admin ID
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin'
    };
    
    setCurrentUser(mockUser);
    setLoading(false);
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 