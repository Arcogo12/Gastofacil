import { CategoryId, isCategoryId } from '@/constants/categories';

export type Expense = {
  id: string;
  amount: number;
  category: CategoryId;
  note: string;
  date: string; // ISO date YYYY-MM-DD
};

export type NewExpenseInput = {
  amount: number;
  category: CategoryId;
  note?: string;
  date?: string;
};

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function createExpense(input: NewExpenseInput): Expense {
  return {
    id: createId(),
    amount: input.amount,
    category: input.category,
    note: input.note?.trim() ?? '',
    date: input.date ?? todayIsoDate(),
  };
}

export function validateExpenseInput(input: {
  amount: string;
  category: string;
  note?: string;
  date?: string;
}): { ok: true; value: NewExpenseInput } | { ok: false; error: string } {
  const amount = Number(input.amount.replace(',', '.'));

  if (!input.amount.trim() || Number.isNaN(amount) || amount <= 0) {
    return { ok: false, error: 'Ingresa un monto válido mayor a 0.' };
  }

  if (!isCategoryId(input.category)) {
    return { ok: false, error: 'Selecciona una categoría válida.' };
  }

  const date = input.date?.trim() || todayIsoDate();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { ok: false, error: 'La fecha debe tener formato AAAA-MM-DD.' };
  }

  return {
    ok: true,
    value: {
      amount,
      category: input.category,
      note: input.note,
      date,
    },
  };
}

export function isSameMonth(isoDate: string, reference = new Date()): boolean {
  const year = reference.getFullYear();
  const month = String(reference.getMonth() + 1).padStart(2, '0');
  return isoDate.startsWith(`${year}-${month}`);
}

export function sumAmounts(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
}

export function formatDisplayDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
