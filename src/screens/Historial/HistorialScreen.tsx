import { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExpenseListItem } from '@/components/expense-list-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useHistorialViewModel } from '@/viewmodels/use-historial-view-model';

export default function HistorialScreen() {
  const theme = useTheme();
  const { isLoading, error, expenses, refresh, deleteExpense } = useHistorialViewModel();

  const handleDelete = useCallback(
    (id: string) => {
      const confirmDelete = () => {
        void deleteExpense(id);
      };

      if (Platform.OS === 'web') {
        if (
          typeof window !== 'undefined' &&
          window.confirm('¿Seguro que quieres eliminar este gasto?')
        ) {
          confirmDelete();
        }
        return;
      }

      Alert.alert('Eliminar gasto', '¿Seguro que quieres eliminar este gasto?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ]);
    },
    [deleteExpense]
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}>
          <View style={styles.header}>
            <ThemedText type="subtitle">Historial</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Todos tus gastos registrados
            </ThemedText>
          </View>

          {error ? (
            <ThemedText type="small" style={styles.error}>
              {error}
            </ThemedText>
          ) : null}

          <View style={styles.section}>
            {isLoading && expenses.length === 0 ? (
              <ActivityIndicator color={theme.text} />
            ) : expenses.length === 0 ? (
              <ThemedText type="small" themeColor="textSecondary">
                No hay gastos registrados todavía.
              </ThemedText>
            ) : (
              expenses.map((expense) => (
                <ExpenseListItem key={expense.id} expense={expense} onDelete={handleDelete} />
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
  section: {
    gap: Spacing.two,
  },
  error: {
    color: '#C62828',
  },
});
