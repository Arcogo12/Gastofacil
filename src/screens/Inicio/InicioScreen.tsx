import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExpenseListItem } from '@/components/expense-list-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatCurrency, formatDisplayDate } from '@/models/expense';
import { useInicioViewModel } from '@/viewmodels/use-inicio-view-model';

export default function InicioScreen() {
  const theme = useTheme();
  const {
    isLoading,
    error,
    monthTotalFormatted,
    monthExpenseCount,
    recentExpenses,
    refresh,
  } = useInicioViewModel();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}>
          <View style={styles.header}>
            <ThemedText type="subtitle">GastoFacil</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Bienvenido — resumen rápido del mes
            </ThemedText>
          </View>

          <ThemedView type="backgroundElement" style={styles.summaryCard}>
            {isLoading && recentExpenses.length === 0 ? (
              <ActivityIndicator color={theme.text} />
            ) : (
              <>
                <ThemedText type="small" themeColor="textSecondary">
                  Total del mes
                </ThemedText>
                <ThemedText type="title" style={styles.total}>
                  {monthTotalFormatted}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {monthExpenseCount === 0
                    ? 'Aún no hay gastos este mes'
                    : `${monthExpenseCount} gasto${monthExpenseCount === 1 ? '' : 's'} este mes`}
                </ThemedText>
              </>
            )}
          </ThemedView>

          {error ? (
            <ThemedText type="small" style={styles.error}>
              {error}
            </ThemedText>
          ) : null}

          <View style={styles.section}>
            <ThemedText type="smallBold">Últimos gastos</ThemedText>
            {recentExpenses.length === 0 && !isLoading ? (
              <ThemedText type="small" themeColor="textSecondary">
                Registra un gasto en la pestaña Registrar.
              </ThemedText>
            ) : (
              recentExpenses.map((expense) => (
                <ExpenseListItem
                  key={expense.id}
                  expense={{
                    ...expense,
                    amountFormatted: formatCurrency(expense.amount),
                    dateFormatted: formatDisplayDate(expense.date),
                  }}
                />
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  content: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.one,
  },
  summaryCard: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  total: {
    fontSize: 40,
    lineHeight: 44,
  },
  section: {
    gap: Spacing.two,
  },
  error: {
    color: '#C62828',
  },
});
