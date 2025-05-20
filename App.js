// Importa React y los hooks useEffect y useState para manejar estado y efectos secundarios.
import React, { useEffect, useState } from 'react';


import { NavigationContainer } from '@react-navigation/native';


import { StatusBar } from 'expo-status-bar';

// Importa el proveedor de Safe Area para manejar correctamente los márgenes en dispositivos con muescas o barras superiores/inferiores.
import { SafeAreaProvider } from 'react-native-safe-area-context';


import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa el componente principal de navegación de la app (cuando el usuario está logueado).
import AppNavigator from './src/navigation/AppNavigator';


import LoginScreen from './src/screens/LoginScreen';

// Importa el módulo Alert de React Native para mostrar alertas al usuario.
import { Alert } from 'react-native';

// Componente principal de la aplicación.
export default function App() {
  
  const [token, setToken] = useState(null);

  
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    // Función asincrónica que verifica si hay un token guardado en AsyncStorage.
    const checkToken = async () => {
      const t = await AsyncStorage.getItem('token'); // Recupera el token del almacenamiento local.
      setToken(t); // Actualiza el estado con el token recuperado.
      setLoading(false); // Marca que ya no está cargando.
    };

    checkToken(); 
    // Opcional: revisa el token cada segundo (puede usarse para detección de logout).
    const interval = setInterval(checkToken, 1000);

    // Limpia el intervalo cuando el componente se desmonta.
    return () => clearInterval(interval);
  }, []);

  // Función que se llama cuando el usuario inicia sesión exitosamente.
  const handleLogin = (newToken) => {
    setToken(newToken); // Guarda el nuevo token en el estado.
  };

  // Función que se llama cuando el usuario cierra sesión.
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // Elimina el token del almacenamiento.
    setToken(null); // Reinicia el estado del token.
    Alert.alert('Sesión cerrada', 'Has cerrado sesión.'); // Muestra un mensaje al usuario.
  };

  // Si aún se está cargando la verificación del token, no muestra nada (pantalla en blanco).
  if (loading) return null;

  return (
    <SafeAreaProvider> {/* Asegura que los elementos no se superpongan con áreas no seguras como la muesca del iPhone. */}
      <NavigationContainer> {/* Contenedor para manejar la navegación entre pantallas. */}
        <StatusBar style="auto" /> {/* Muestra la barra de estado con estilo predeterminado. */}
        {token ? (
          
          <AppNavigator onLogout={handleLogout} />
        ) : (
          
          <LoginScreen onLogin={handleLogin} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
