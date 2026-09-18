import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function mostrarAviso(titulo: string, mensaje: string) {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined") {
      window.alert(`${titulo}\n\n${mensaje}`);
    }
    return;
  }

  Alert.alert(titulo, mensaje);
}

export default function RegistrarGasto() {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");

  const guardarGasto = () => {
    if (!descripcion || !monto || !categoria) {
      mostrarAviso("Datos incompletos", "Completa todos los campos.");
      return;
    }

    mostrarAviso(
      "Registro correcto",
      `Se registró correctamente:\n${descripcion} — $${monto} (${categoria}).`,
    );

    setDescripcion("");
    setMonto("");
    setCategoria("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo gasto</Text>

      <Text style={styles.label}>Descripción</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej. Hamburguesa"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Monto</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej. 150"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />

      <Text style={styles.label}>Categoría</Text>

      <TextInput
        style={styles.input}
        placeholder="Ej. Comida"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Pressable style={styles.button} onPress={guardarGasto}>
        <Text style={styles.buttonText}>Guardar gasto</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },

  button: {
    marginTop: 30,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#222",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
