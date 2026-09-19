import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { useInicioViewModel } from "@/viewmodels/use-inicio-view-model";

export default function HomeScreen() {
  const router = useRouter();
  const { isLoading, monthTotalFormatted, monthExpenseCount } = useInicioViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GastoFácil</Text>

      <Text style={styles.subtitle}>
        Controla tus gastos de manera sencilla
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Gastos del mes</Text>
        {isLoading ? (
          <ActivityIndicator color="#222" />
        ) : (
          <>
            <Text style={styles.amount}>{monthTotalFormatted}</Text>
            <Text style={styles.count}>
              {monthExpenseCount === 0
                ? "Sin gastos este mes"
                : `${monthExpenseCount} gasto${monthExpenseCount === 1 ? "" : "s"}`}
            </Text>
          </>
        )}
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/registrar")}
      >
        <Text style={styles.buttonText}>+ Registrar gasto</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.push("/historial")}
      >
        <Text style={styles.secondaryButtonText}>Ver mis gastos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  card: {
    padding: 25,
    borderRadius: 15,
    marginBottom: 25,
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#f8f8f8",
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  amount: {
    fontSize: 32,
    fontWeight: "bold",
  },
  count: {
    fontSize: 14,
    marginTop: 8,
    color: "#666",
  },
  button: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    backgroundColor: "#222",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
