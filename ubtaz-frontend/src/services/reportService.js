import api from './api';

export async function getDashboardStats() {
  const { data } = await api.get('/reports/dashboard');
  return data;
}

export async function generateReport(reportType, title, parameters = {}) {
  const { data } = await api.post('/reports/generate', parameters, {
    params: { reportType, title },
  });
  return data;
}
