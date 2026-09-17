import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMockUsers } from '../data/mockData';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('ailms_user');
      return savedUser ? JSON.parse(savedUser) : initialMockUsers[0]; // Default to student Alex Morgan
    } catch {
      return initialMockUsers[0];
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('ailms_token') || 'demo_jwt_token_sample');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ailms_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ailms_user');
    }
  }, [user]);

  const login = async (email, password, roleHint = null) => {
    setLoading(true);
    try {
      // 1. First try backend if available
      try {
        const { data } = await api.post('/auth/login', { email, password });
        if (data && data.token) {
          localStorage.setItem('ailms_token', data.token);
          setToken(data.token);
          const fullUser = {
            ...data.user,
            role: data.user.role || roleHint || 'student',
            avatar: data.user.name ? data.user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'US'
          };
          setUser(fullUser);
          setLoading(false);
          return { success: true, role: fullUser.role };
        }
      } catch (err) {
        // Backend not running or failed; fall back to demo accounts
      }

      // 2. Mock demo accounts fallback
      const matched = initialMockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() || (roleHint && u.role === roleHint)
      ) || {
        id: Date.now(),
        name: email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
        email,
        role: roleHint || (email.includes('teacher') ? 'teacher' : email.includes('admin') ? 'admin' : 'student'),
        avatar: email.slice(0, 2).toUpperCase(),
        department: 'Computer Science',
        status: 'active'
      };

      const mockToken = `mock_token_${matched.role}_${Date.now()}`;
      localStorage.setItem('ailms_token', mockToken);
      setToken(mockToken);
      setUser(matched);
      return { success: true, role: matched.role };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student',
        department: userData.department || 'Computer Science',
        rollNumber: userData.rollNumber || `CS-${Math.floor(1000 + Math.random() * 9000)}`,
        avatar: userData.name ? userData.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'US',
        status: 'active'
      };
      const mockToken = `mock_reg_token_${Date.now()}`;
      localStorage.setItem('ailms_token', mockToken);
      setToken(mockToken);
      setUser(newUser);
      return { success: true, role: newUser.role };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ailms_token');
    localStorage.removeItem('ailms_user');
    setUser(null);
    setToken(null);
  };

  // Quick switcher for demo evaluation
  const switchRole = (newRole) => {
    const targetUser = initialMockUsers.find(u => u.role === newRole) || {
      id: Date.now(),
      name: `Demo ${newRole.toUpperCase()}`,
      email: `${newRole}@ailms.com`,
      role: newRole,
      avatar: newRole.slice(0, 2).toUpperCase()
    };
    setUser(targetUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        token,
        loading,
        login,
        register,
        logout,
        switchRole,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
