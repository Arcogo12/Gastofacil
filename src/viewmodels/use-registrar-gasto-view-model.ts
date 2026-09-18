import { useCallback, useState } from 'react';

import { type CategoryId } from '@/constants/categories';
import { validateExpenseInput } from '@/models/expense';
import { expenseRepository } from '@/models/expense-repository';

export type RegistrarGastoForm = {
  amount: string;
  category: CategoryId;
  note: string;
  date: string;
};

export type RegistrarGastoViewModel = {
  isSaving: boolean;
  formError: string | null;
  successMessage: string | null;
  form: RegistrarGastoForm;
  setFormField: <K extends keyof RegistrarGastoForm>(
    key: K,
    value: RegistrarGastoForm[K]
  ) => void;
  resetForm: () => void;
  addExpense: () => Promise<boolean>;
};

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function createEmptyForm(): RegistrarGastoForm {
  return {
    amount: '',
    category: 'food',
    note: '',
    date: todayIsoDate(),
  };
}

export function useRegistrarGastoViewModel(): RegistrarGastoViewModel {
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [form, setForm] = useState<RegistrarGastoForm>(createEmptyForm);

  const setFormField = useCallback(
    <K extends keyof RegistrarGastoForm>(key: K, value: RegistrarGastoForm[K]) => {
      setForm((current) => ({ ...current, [key]: value }));
      setFormError(null);
      setSuccessMessage(null);
    },
    []
  );

  const resetForm = useCallback(() => {
    setForm(createEmptyForm());
    setFormError(null);
  }, []);

  const addExpense = useCallback(async (): Promise<boolean> => {
    const validation = validateExpenseInput(form);
    if (!validation.ok) {
      setFormError(validation.error);
      setSuccessMessage(null);
      return false;
    }

    setIsSaving(true);
    setFormError(null);
    try {
      await expenseRepository.add(validation.value);
      resetForm();
      setSuccessMessage('Gasto registrado correctamente.');
      return true;
    } catch {
      setFormError('No se pudo guardar el gasto.');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [form, resetForm]);

  return {
    isSaving,
    formError,
    successMessage,
    form,
    setFormField,
    resetForm,
    addExpense,
  };
}
