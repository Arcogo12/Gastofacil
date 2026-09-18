import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GastoFácil</Text>

      <Text style={styles.subtitle}>
        Controla tus gastos de manera sencilla
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Gastos del mes</Text>
        <Text style={styles.amount}>$0.00</Text>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>+ Registrar gasto</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton}>
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
  },

  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
  },

  amount: {
    fontSize: 32,
    fontWeight: "bold",
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
