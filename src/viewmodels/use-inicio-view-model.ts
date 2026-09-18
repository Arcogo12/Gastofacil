import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import {
  formatCurrency,
  isSameMonth,
  sumAmounts,
  type Expense,
} from '@/models/expense';
import { expenseRepository } from '@/models/expense-repository';

export type InicioViewModel = {
  isLoading: boolean;
  error: string | null;
  monthTotalFormatted: string;
  monthExpenseCount: number;
  recentExpenses: Expense[];
  refresh: () => Promise<void>;
};

export function useInicioViewModel(): InicioViewModel {
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

  const monthExpenses = useMemo(
    () => expenses.filter((expense) => isSameMonth(expense.date)),
    [expenses]
  );

  const monthTotal = useMemo(() => sumAmounts(monthExpenses), [monthExpenses]);

  return {
    isLoading,
    error,
    monthTotalFormatted: formatCurrency(monthTotal),
    monthExpenseCount: monthExpenses.length,
    recentExpenses: monthExpenses.slice(0, 5),
    refresh,
  };
}
