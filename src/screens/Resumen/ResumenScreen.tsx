import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useResumenViewModel } from '@/viewmodels/use-resumen-view-model';

export default function ResumenScreen() {
  const theme = useTheme();
  const {
    isLoading,
    error,
    monthTotalFormatted,
    allTimeTotalFormatted,
    monthExpenseCount,
    categorySummaries,
    refresh,
  } = useResumenViewModel();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}>
          <View style={styles.header}>
            <ThemedText type="subtitle">Resumen</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Totales y desglose por categoría
            </ThemedText>
          </View>

          {isLoading && categorySummaries.length === 0 ? (
            <ActivityIndicator color={theme.text} />
          ) : (
            <>
              <ThemedView type="backgroundElement" style={styles.card}>
                <ThemedText type="small" themeColor="textSecondary">
                  Total del mes
                </ThemedText>
                <ThemedText type="subtitle">{monthTotalFormatted}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {monthExpenseCount} gasto{monthExpenseCount === 1 ? '' : 's'} este mes
                </ThemedText>
              </ThemedView>

              <ThemedView type="backgroundElement" style={styles.card}>
                <ThemedText type="small" themeColor="textSecondary">
                  Total histórico
                </ThemedText>
                <ThemedText type="smallBold">{allTimeTotalFormatted}</ThemedText>
              </ThemedView>
            </>
          )}

          {error ? (
            <ThemedText type="small" style={styles.error}>
              {error}
            </ThemedText>
          ) : null}

          <View style={styles.section}>
            <ThemedText type="smallBold">Por categoría (mes actual)</ThemedText>
            {categorySummaries.length === 0 && !isLoading ? (
              <ThemedText type="small" themeColor="textSecondary">
                No hay datos para mostrar este mes.
              </ThemedText>
            ) : (
              categorySummaries.map((item) => (
                <ThemedView key={item.category} type="backgroundElement" style={styles.row}>
                  <View>
                    <ThemedText type="smallBold">{item.label}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {item.count} gasto{item.count === 1 ? '' : 's'}
                    </ThemedText>
                  </View>
                  <ThemedText type="smallBold">{item.totalFormatted}</ThemedText>
                </ThemedView>
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
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  section: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  error: {
    color: '#C62828',
  },
});
