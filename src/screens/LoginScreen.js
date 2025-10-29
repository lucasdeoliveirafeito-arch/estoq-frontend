import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
  if (!email || !senha) {
    if (Platform.OS === 'web') {
      alert('Preencha todos os campos.');
    } else {
      Alert.alert('Atenção', 'Preencha todos os campos.');
    }
    return;
  }

  try {
    const response = await api.post('/login', { email, senha });
    console.log('🔹 Resposta completa do servidor:', response.data);

    if (response.data && response.data.token) {
      const { token, user } = response.data;

      // ✅ Salvar token e nome do usuário localmente
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userName', user?.nome || 'Usuário');

      console.log('✅ Token salvo localmente:', token);

      if (Platform.OS === 'web') {
        alert('Login realizado com sucesso!');
      } else {
        Alert.alert('Sucesso', 'Login realizado!');
      }

      navigation.navigate('Dashboard');
    } else {
      if (Platform.OS === 'web') {
        alert('Usuário ou senha incorretos.');
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos.');
      }
    }
  } catch (error) {
    console.error('❌ Erro na requisição de login:', error);
    if (Platform.OS === 'web') {
      alert('Não foi possível conectar ao servidor.');
    } else {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoq</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Criar nova conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  registerText: {
    marginTop: 20,
    color: '#555',
    fontSize: 14,
  },
});
