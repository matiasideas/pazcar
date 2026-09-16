import { useState, useCallback } from 'react';

const STORAGE_KEY = 'admin_password';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!sessionStorage.getItem(STORAGE_KEY);
  });

  const getPassword = useCallback(() => {
    return sessionStorage.getItem(STORAGE_KEY) || '';
  }, []);

  const login = useCallback((password: string) => {
    sessionStorage.setItem(STORAGE_KEY, password);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, getPassword, login, logout };
};
