import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.0.5:10000/api',
});

// 🧠 Interceptador: adiciona o token JWT automaticamente em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  console.log('🧩 Token carregado:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
