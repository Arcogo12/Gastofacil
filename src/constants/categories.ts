export const CATEGORIES = [
  { id: 'food', label: 'Comida' },
  { id: 'transport', label: 'Transporte' },
  { id: 'home', label: 'Hogar' },
  { id: 'entertainment', label: 'Entretenimiento' },
  { id: 'health', label: 'Salud' },
  { id: 'education', label: 'Educación' },
  { id: 'other', label: 'Otros' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

export function isCategoryId(value: string): value is CategoryId {
  return CATEGORIES.some((category) => category.id === value);
}

export function getCategoryLabel(id: CategoryId): string {
  return CATEGORIES.find((category) => category.id === id)?.label ?? id;
}
