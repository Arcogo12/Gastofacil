import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CATEGORIES, type CategoryId } from '@/constants/categories';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { RegistrarGastoForm } from '@/viewmodels/use-registrar-gasto-view-model';

type ExpenseFormProps = {
  form: RegistrarGastoForm;
  formError: string | null;
  isSaving: boolean;
  onChange: <K extends keyof RegistrarGastoForm>(key: K, value: RegistrarGastoForm[K]) => void;
  onSubmit: () => void;
};

export function ExpenseForm({ form, formError, isSaving, onChange, onSubmit }: ExpenseFormProps) {
  const theme = useTheme();

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <ThemedText type="smallBold">Nuevo gasto</ThemedText>

      <View style={styles.field}>
        <ThemedText type="small" themeColor="textSecondary">
          Monto
        </ThemedText>
        <TextInput
          value={form.amount}
          onChangeText={(value) => onChange('amount', value)}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={theme.textSecondary}
          style={[styles.input, { color: theme.text, borderColor: theme.backgroundSelected }]}
        />
      </View>

      <View style={styles.field}>
        <ThemedText type="small" themeColor="textSecondary">
          Categoría
        </ThemedText>
        <View style={styles.categories}>
          {CATEGORIES.map((category) => {
            const selected = form.category === category.id;
            return (
              <Pressable
                key={category.id}
                onPress={() => onChange('category', category.id as CategoryId)}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: selected ? theme.backgroundSelected : theme.background,
                    borderColor: theme.backgroundSelected,
                  },
                ]}>
                <ThemedText type="small">{category.label}</ThemedText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.field}>
        <ThemedText type="small" themeColor="textSecondary">
          Nota
        </ThemedText>
        <TextInput
          value={form.note}
          onChangeText={(value) => onChange('note', value)}
          placeholder="Opcional"
          placeholderTextColor={theme.textSecondary}
          style={[styles.input, { color: theme.text, borderColor: theme.backgroundSelected }]}
        />
      </View>

      <View style={styles.field}>
        <ThemedText type="small" themeColor="textSecondary">
          Fecha (AAAA-MM-DD)
        </ThemedText>
        <TextInput
          value={form.date}
          onChangeText={(value) => onChange('date', value)}
          placeholder="2026-09-18"
          placeholderTextColor={theme.textSecondary}
          autoCapitalize="none"
          style={[styles.input, { color: theme.text, borderColor: theme.backgroundSelected }]}
        />
      </View>

      {formError ? (
        <ThemedText type="small" style={styles.error}>
          {formError}
        </ThemedText>
      ) : null}

      <Pressable
        onPress={onSubmit}
        disabled={isSaving}
        style={({ pressed }) => [
          styles.submit,
          {
            backgroundColor: theme.text,
            opacity: isSaving || pressed ? 0.7 : 1,
          },
        ]}>
        <ThemedText type="smallBold" style={{ color: theme.background }}>
          {isSaving ? 'Guardando...' : 'Agregar gasto'}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  field: {
    gap: Spacing.one,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 16,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  categoryChip: {
    borderWidth: 1,
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  error: {
    color: '#C62828',
  },
  submit: {
    alignItems: 'center',
    borderRadius: Spacing.three,
    paddingVertical: Spacing.three,
  },
});
