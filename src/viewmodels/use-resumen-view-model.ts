import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import { getCategoryLabel, type CategoryId } from '@/constants/categories';
import {
  formatCurrency,
  isSameMonth,
  sumAmounts,
  type Expense,
} from '@/models/expense';
import { expenseRepository } from '@/models/expense-repository';

export type CategorySummary = {
  category: CategoryId;
  label: string;
  total: number;
  totalFormatted: string;
  count: number;
};

export type ResumenViewModel = {
  isLoading: boolean;
  error: string | null;
  monthTotalFormatted: string;
  allTimeTotalFormatted: string;
  monthExpenseCount: number;
  categorySummaries: CategorySummary[];
  refresh: () => Promise<void>;
};

export function useResumenViewModel(): ResumenViewModel {
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
  const allTimeTotal = useMemo(() => sumAmounts(expenses), [expenses]);

  const categorySummaries = useMemo<CategorySummary[]>(() => {
    const totals = new Map<CategoryId, { total: number; count: number }>();

    for (const expense of monthExpenses) {
      const current = totals.get(expense.category) ?? { total: 0, count: 0 };
      totals.set(expense.category, {
        total: current.total + expense.amount,
        count: current.count + 1,
      });
    }

    return Array.from(totals.entries())
      .map(([category, data]) => ({
        category,
        label: getCategoryLabel(category),
        total: data.total,
        totalFormatted: formatCurrency(data.total),
        count: data.count,
      }))
      .sort((a, b) => b.total - a.total);
  }, [monthExpenses]);

  return {
    isLoading,
    error,
    monthTotalFormatted: formatCurrency(monthTotal),
    allTimeTotalFormatted: formatCurrency(allTimeTotal),
    monthExpenseCount: monthExpenses.length,
    categorySummaries,
    refresh,
  };
}
