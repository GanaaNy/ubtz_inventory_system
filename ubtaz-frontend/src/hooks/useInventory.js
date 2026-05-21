import { useCallback, useEffect, useState } from 'react';
import * as inventoryService from '../services/inventoryService';

export function useInventory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryService.getTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Гүйлгээ ачаалахад алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = async (payload) => {
    const created = await inventoryService.createTransaction(payload);
    setTransactions((prev) => [created, ...prev]);
    return created;
  };

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
  };
}
