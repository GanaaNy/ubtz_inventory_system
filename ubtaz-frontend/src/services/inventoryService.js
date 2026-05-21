import api from './api';

export async function getTransactions() {
  const { data } = await api.get('/inventory');
  return data;
}

export async function getTransactionsByMaterial(materialId) {
  const { data } = await api.get(`/inventory/material/${materialId}`);
  return data;
}

export async function createTransaction(payload) {
  const { data } = await api.post('/inventory/transactions', payload);
  return data;
}
