import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Gasto = {
  id: number;
  descripcion: string;
  categoria: string;
  monto: number;
};

function confirmarEliminacion(onConfirm: () => void) {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined" && window.confirm("¿Seguro que deseas eliminar este gasto?")) {
      onConfirm();
    }
    return;
  }

  Alert.alert("Eliminar gasto", "¿Seguro que deseas eliminar este gasto?", [
    { text: "Cancelar", style: "cancel" },
    { text: "Eliminar", style: "destructive", onPress: onConfirm },
  ]);
}

export default function EliminarGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([
    {
      id: 1,
      descripcion: "Hamburguesa",
      categoria: "Comida",
      monto: 150,
    },
    {
      id: 2,
      descripcion: "Transporte",
      categoria: "Transporte",
      monto: 80,
    },
    {
      id: 3,
      descripcion: "Cine",
      categoria: "Entretenimiento",
      monto: 120,
    },
  ]);

  const eliminarGasto = (id: number) => {
    confirmarEliminacion(() => {
      setGastos((lista) => lista.filter((gasto) => gasto.id !== id));
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Eliminar gastos</Text>

      {gastos.length === 0 ? (
        <Text style={styles.vacio}>No hay gastos registrados.</Text>
      ) : (
        gastos.map((gasto) => (
          <View style={styles.card} key={gasto.id}>
            <View>
              <Text style={styles.descripcion}>{gasto.descripcion}</Text>
              <Text style={styles.categoria}>{gasto.categoria}</Text>
              <Text style={styles.monto}>${gasto.monto.toFixed(2)}</Text>
            </View>

            <Pressable
              style={styles.botonEliminar}
              onPress={() => eliminarGasto(gasto.id)}
            >
              <Text style={styles.textoBoton}>Eliminar</Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  titulo: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 10,
  },
  vacio: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  card: {
    padding: 18,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  descripcion: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoria: {
    fontSize: 14,
    marginTop: 4,
  },
  monto: {
    fontSize: 17,
    marginTop: 6,
  },
  botonEliminar: {
    padding: 9,
    borderRadius: 7,
    backgroundColor: "#c62828",
  },
  textoBoton: {
    color: "white",
    fontWeight: "bold",
  },
});
