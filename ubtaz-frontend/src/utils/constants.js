export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  MATERIALS: '/materials',
  INVENTORY: '/inventory',
  WAREHOUSE: '/warehouse',
  REPORTS: '/reports',
};

export const TRANSACTION_TYPES = {
  RECEIPT: 'RECEIPT',
  ISSUE: 'ISSUE',
};

export const ROLES = {
  ADMIN: 'ADMIN',
  WAREHOUSE_MANAGER: 'WAREHOUSE_MANAGER',
  OPERATOR: 'OPERATOR',
};
