import api from './api';

export async function getMaterials() {
  const { data } = await api.get('/materials');
  return data;
}

export async function getMaterial(id) {
  const { data } = await api.get(`/materials/${id}`);
  return data;
}

export async function createMaterial(payload) {
  const { data } = await api.post('/materials', payload);
  return data;
}

export async function updateMaterial(id, payload) {
  const { data } = await api.put(`/materials/${id}`, payload);
  return data;
}

export async function deleteMaterial(id) {
  await api.delete(`/materials/${id}`);
}
