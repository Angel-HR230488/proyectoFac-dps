import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import { Alert } from 'react-native';

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const t = await AsyncStorage.getItem('token');
      setToken(t);
      setLoading(false);
    };
    checkToken();
    const interval = setInterval(checkToken, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    Alert.alert('Sesión cerrada', 'Has cerrado sesión.');
  };

  if (loading) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        {token ? (
          <AppNavigator onLogout={handleLogout} />
        ) : (
          <LoginScreen onLogin={handleLogin} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
