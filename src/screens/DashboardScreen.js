import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      const name = await AsyncStorage.getItem('userName');
      if (name) setUserName(name);
    };
    loadUserData();
  }, []);

  const handleGoToProducts = () => {
    navigation.navigate('Products');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userName');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {userName} 👋</Text>

      <View style={styles.cards}>
        <TouchableOpacity style={styles.card} onPress={handleGoToProducts}>
          <Text style={styles.cardTitle}>📦 Produtos</Text>
          <Text style={styles.cardSubtitle}>Ver catálogo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#f6c23e' }]}
          onPress={() =>
            Alert.alert('Em breve', 'Função de relatórios em desenvolvimento!')
          }
        >
          <Text style={styles.cardTitle}>📊 Relatórios</Text>
          <Text style={styles.cardSubtitle}>Em breve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#dc3545' }]}
          onPress={handleLogout}
        >
          <Text style={styles.cardTitle}>🚪 Sair</Text>
          <Text style={styles.cardSubtitle}>Encerrar sessão</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 30,
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    width: '48%',
    backgroundColor: '#2f86eb',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
    opacity: 0.9,
  },
});
