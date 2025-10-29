import React from "react";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    Alert.alert("Sessão encerrada", "Você saiu da sua conta.");
  };

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "#4F46E5" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#4F46E5",
        drawerLabelStyle: { fontWeight: "600" },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Dashboard",
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="produtos"
        options={{
          drawerLabel: "Produtos",
          title: "Catálogo de Produtos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="sair"
        options={{
          drawerLabel: "Sair",
          title: "Sair",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="exit-outline" color={color} size={size} />
          ),
        }}
        listeners={{
          focus: () => handleLogout(),
        }}
      />
    </Drawer>
  );
}
