import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExpenseForm } from '@/components/expense-form';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useRegistrarGastoViewModel } from '@/viewmodels/use-registrar-gasto-view-model';

export default function RegistrarGastoScreen() {
  const { isSaving, formError, successMessage, form, setFormField, addExpense } =
    useRegistrarGastoViewModel();

  const handleSubmit = useCallback(() => {
    void addExpense();
  }, [addExpense]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <ThemedText type="subtitle">Registrar gasto</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Captura monto, categoría, nota y fecha
            </ThemedText>
          </View>

          <ExpenseForm
            form={form}
            formError={formError}
            isSaving={isSaving}
            onChange={setFormField}
            onSubmit={handleSubmit}
          />

          {successMessage ? (
            <ThemedText type="small" style={styles.success}>
              {successMessage}
            </ThemedText>
          ) : null}
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
  success: {
    color: '#2E7D32',
  },
});
