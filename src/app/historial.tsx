import { ScrollView, StyleSheet, Text, View } from "react-native";

const gastos = [
  {
    id: 1,
    descripcion: "Hamburguesa",
    categoria: "Comida",
    monto: 150,
    fecha: "18/09/2026",
  },
  {
    id: 2,
    descripcion: "Transporte",
    categoria: "Transporte",
    monto: 80,
    fecha: "17/09/2026",
  },
  {
    id: 3,
    descripcion: "Cine",
    categoria: "Entretenimiento",
    monto: 120,
    fecha: "16/09/2026",
  },
];

export default function HistorialGastos() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mis gastos</Text>

      {gastos.map((gasto) => (
        <View style={styles.card} key={gasto.id}>
          <View>
            <Text style={styles.descripcion}>{gasto.descripcion}</Text>

            <Text style={styles.categoria}>{gasto.categoria}</Text>

            <Text style={styles.fecha}>{gasto.fecha}</Text>
          </View>

          <Text style={styles.monto}>${gasto.monto.toFixed(2)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
  },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  descripcion: {
    fontSize: 18,
    fontWeight: "bold",
  },

  categoria: {
    fontSize: 15,
    marginTop: 5,
  },

  fecha: {
    fontSize: 13,
    marginTop: 5,
  },

  monto: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
