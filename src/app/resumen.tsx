import { ScrollView, StyleSheet, Text, View } from "react-native";

const categorias = [
  { nombre: "Comida", total: 450 },
  { nombre: "Transporte", total: 180 },
  { nombre: "Entretenimiento", total: 120 },
  { nombre: "Otros", total: 50 },
];

export default function CategoriasResumen() {
  const total = categorias.reduce(
    (suma, categoria) => suma + categoria.total,
    0,
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Resumen de gastos</Text>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Gasto total</Text>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
      </View>

      <Text style={styles.subtitulo}>Gastos por categoría</Text>

      {categorias.map((categoria) => (
        <View style={styles.card} key={categoria.nombre}>
          <Text style={styles.categoria}>{categoria.nombre}</Text>
          <Text style={styles.monto}>${categoria.total.toFixed(2)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  totalBox: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#e8f5e9",
  },
  totalLabel: {
    fontSize: 16,
  },
  total: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 5,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  card: {
    padding: 18,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoria: {
    fontSize: 17,
  },
  monto: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
