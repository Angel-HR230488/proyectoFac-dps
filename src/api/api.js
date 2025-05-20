import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { API_BASE_URL } from '@env';

// URL base de la API obtenida desde las variables de entorno
const BASE_URL = API_BASE_URL;

// Configuración inicial de Axios
const api = axios.create({
  baseURL: BASE_URL, // Establece la URL base para todas las solicitudes
  headers: {
    'Content-Type': 'application/json', // Define el tipo de contenido predeterminado
  },
});

// Interceptor de solicitudes
api.interceptors.request.use(async (config) => {
  // Recupera el token almacenado en AsyncStorage
  const token = await AsyncStorage.getItem('token');
  if (token) {
    // Si existe un token, lo agrega al encabezado Authorization
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config; // Retorna la configuración modificada
});

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, simplemente la retorna
    return response;
  },
  async (error) => {
    // Manejo de errores
    if (error.response && error.response.status === 401) {
      // Si el error es 401 (no autorizado), elimina el token y muestra una alerta
      await AsyncStorage.removeItem('token');
      Alert.alert('Sesión expirada', 'Por favor inicia sesión nuevamente.');
    }
    // Rechaza la promesa con el error para que pueda ser manejado por el llamador
    return Promise.reject(error);
  }
);

// Exporta la instancia configurada de Axios
export default api;