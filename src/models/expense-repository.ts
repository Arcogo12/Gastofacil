import AsyncStorage from '@react-native-async-storage/async-storage';

import { createExpense, type Expense, type NewExpenseInput } from '@/models/expense';

const STORAGE_KEY = '@gastofacil/expenses';

async function readAll(): Promise<Expense[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const demo: Expense[] = [
      createExpense({
        amount: 150,
        category: "food",
        note: "Hamburguesa",
      }),
      createExpense({
        amount: 80,
        category: "transport",
        note: "Transporte",
      }),
      createExpense({
        amount: 120,
        category: "entertainment",
        note: "Cine",
      }),
    ];
    await writeAll(demo);
    return demo;
  }

  try {
    const parsed = JSON.parse(raw) as Expense[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(expenses: Expense[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export const expenseRepository = {
  async getAll(): Promise<Expense[]> {
    const expenses = await readAll();
    return expenses.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  },

  async add(input: NewExpenseInput): Promise<Expense> {
    const expenses = await readAll();
    const expense = createExpense(input);
    expenses.push(expense);
    await writeAll(expenses);
    return expense;
  },

  async update(id: string, patch: Partial<Omit<Expense, 'id'>>): Promise<Expense | null> {
    const expenses = await readAll();
    const index = expenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return null;
    }

    const updated: Expense = { ...expenses[index], ...patch, id };
    expenses[index] = updated;
    await writeAll(expenses);
    return updated;
  },

  async remove(id: string): Promise<boolean> {
    const expenses = await readAll();
    const next = expenses.filter((expense) => expense.id !== id);
    if (next.length === expenses.length) {
      return false;
    }

    await writeAll(next);
    return true;
  },
};
