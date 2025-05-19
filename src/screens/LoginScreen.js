import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Ingresa tu correo y contraseña');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.data.access_token;
      await AsyncStorage.setItem('token', token);
      onLogin(token);
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[globalStyles.container, styles.centered]}>
      <Text style={typography.h1}>Iniciar Sesión</Text>
      <Text style={styles.welcomeMsg}>¡Bienvenido! Ingresa tus credenciales para acceder al sistema.</Text>
      <TextInput
        style={[globalStyles.input, styles.fixedInput]}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={[globalStyles.input, styles.fixedInput]}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
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