import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import {
  formatCurrency,
  formatDisplayDate,
  type Expense,
} from '@/models/expense';
import { expenseRepository } from '@/models/expense-repository';

export type HistorialItem = Expense & {
  amountFormatted: string;
  dateFormatted: string;
};

export type HistorialViewModel = {
  isLoading: boolean;
  error: string | null;
  expenses: HistorialItem[];
  refresh: () => Promise<void>;
  deleteExpense: (id: string) => Promise<boolean>;
};

export function useHistorialViewModel(): HistorialViewModel {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await expenseRepository.getAll();
      setExpenses(data);
    } catch {
      setError('No se pudieron cargar los gastos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh])
  );

  const listItems = useMemo<HistorialItem[]>(
    () =>
      expenses.map((expense) => ({
        ...expense,
        amountFormatted: formatCurrency(expense.amount),
        dateFormatted: formatDisplayDate(expense.date),
      })),
    [expenses]
  );

  const deleteExpense = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const removed = await expenseRepository.remove(id);
        if (!removed) {
          setError('No se encontró el gasto a eliminar.');
          return false;
        }
        await refresh();
        return true;
      } catch {
        setError('No se pudo eliminar el gasto.');
        return false;
      }
    },
    [refresh]
  );

  return {
    isLoading,
    error,
    expenses: listItems,
    refresh,
    deleteExpense,
  };
}
