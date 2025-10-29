import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>📊 Dashboard em breve!</Text>
      <Text style={styles.subtexto}>
        Aqui você verá indicadores de estoque, produtos e desempenho.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  texto: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtexto: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
  },
});
