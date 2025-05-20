import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

// Pantalla de inicio de sesión
const LoginScreen = ({ onLogin }) => {
  // Estados locales para los campos del formulario y carga
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Maneja el proceso de inicio de sesión
  const handleLogin = async () => {
    // Validación básica de campos
    if (!email || !password) {
      Alert.alert('Error', 'Ingresa tu correo y contraseña');
      return;
    }
    setLoading(true);
    try {
      // Solicita el token a la API
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.data.access_token;
      // Guarda el token en AsyncStorage
      await AsyncStorage.setItem('token', token);
      // Llama a la función de login del padre
      onLogin(token);
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  // Renderizado de la pantalla de login
  return (
    <View style={[globalStyles.container, styles.centered]}>
      <Text style={typography.h1}>Iniciar Sesión</Text>
      <Text style={styles.welcomeMsg}>¡Bienvenido! Ingresa tus credenciales para acceder al sistema.</Text>
      {/* Campo: Correo electrónico */}
      <TextInput
        style={[globalStyles.input, styles.fixedInput]}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {/* Campo: Contraseña */}
      <TextInput
        style={[globalStyles.input, styles.fixedInput]}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* Botón para iniciar sesión */}
      <TouchableOpacity
        style={[globalStyles.button, { marginTop: spacing.lg, width: 250 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={globalStyles.buttonText}>{loading ? 'Ingresando...' : 'Ingresar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos locales de la pantalla
const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  fixedInput: {
    width: 250,
    alignSelf: 'center',
  },
  welcomeMsg: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    fontSize: 16,
  },
});

export default LoginScreen;