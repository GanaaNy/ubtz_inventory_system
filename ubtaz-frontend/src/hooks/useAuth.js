import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../utils/constants';

export function useAuth() {
  const navigate = useNavigate();
  const { token, user, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  const login = useCallback(
    async (credentials) => {
      const response = await authService.login(credentials);
      const userData = {
        id: response.userId,
        username: response.username,
        fullName: response.fullName,
        role: response.role,
      };
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setAuth(response.token, userData);
      navigate(ROUTES.DASHBOARD);
      return response;
    },
    [navigate, setAuth]
  );

  const logout = useCallback(() => {
    authService.logout();
    clearAuth();
    navigate(ROUTES.LOGIN);
  }, [clearAuth, navigate]);

  return { token, user, isAuthenticated, login, logout };
}
