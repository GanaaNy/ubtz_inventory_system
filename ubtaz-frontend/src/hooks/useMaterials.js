import { useCallback, useEffect, useState } from 'react';
import * as materialService from '../services/materialService';

export function useMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await materialService.getMaterials();
      setMaterials(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Материал ачаалахад алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  const createMaterial = async (payload) => {
    const created = await materialService.createMaterial(payload);
    setMaterials((prev) => [...prev, created]);
    return created;
  };

  const updateMaterial = async (id, payload) => {
    const updated = await materialService.updateMaterial(id, payload);
    setMaterials((prev) => prev.map((m) => (m.id === id ? updated : m)));
    return updated;
  };

  const removeMaterial = async (id) => {
    await materialService.deleteMaterial(id);
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  return {
    materials,
    loading,
    error,
    fetchMaterials,
    createMaterial,
    updateMaterial,
    removeMaterial,
  };
}
