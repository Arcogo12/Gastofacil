import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getCategoryLabel } from '@/constants/categories';
import { Spacing } from '@/constants/theme';
import { formatCurrency, formatDisplayDate, type Expense } from '@/models/expense';

type ExpenseListItemProps = {
  expense: Expense & {
    amountFormatted?: string;
    dateFormatted?: string;
  };
  onDelete?: (id: string) => void;
};

export function ExpenseListItem({ expense, onDelete }: ExpenseListItemProps) {
  const amount = expense.amountFormatted ?? formatCurrency(expense.amount);
  const date = expense.dateFormatted ?? formatDisplayDate(expense.date);

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="smallBold">{getCategoryLabel(expense.category)}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {date}
          {expense.note ? ` · ${expense.note}` : ''}
        </ThemedText>
      </View>
      <View style={styles.actions}>
        <ThemedText type="smallBold">{amount}</ThemedText>
        {onDelete ? (
          <Pressable onPress={() => onDelete(expense.id)} hitSlop={8}>
            <ThemedText type="small" themeColor="textSecondary">
              Eliminar
            </ThemedText>
          </Pressable>
        ) : null}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
  },
  content: {
    flex: 1,
    gap: Spacing.half,
  },
  actions: {
    alignItems: 'flex-end',
    gap: Spacing.one,
  },
});
