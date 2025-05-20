import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/api';

// Pantalla para registrar un nuevo cliente
const RegisterClientScreen = ({ navigation }) => {
  // Estado para los campos del formulario
  const [form, setForm] = useState({
    name: '',
    email: '',
    NIT: '',
    address: '',
    NRC: '',
    job: '',
  });
  // Estado para mostrar indicador de carga
  const [loading, setLoading] = useState(false);

  // Maneja cambios en los campos del formulario
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async () => {
    // Validación básica de campos obligatorios
    if (!form.name || !form.email) {
      Alert.alert('Error', 'Nombre y correo son obligatorios');
      return;
    }
    setLoading(true);
    try {
      // Envía los datos a la API
      await api.post('items/client', form);
      Alert.alert('Éxito', 'Cliente registrado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el cliente');
    } finally {
      setLoading(false);
    }
  };

  // Renderizado de la pantalla
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={typography.h1}>Registrar Cliente</Text>
        {/* Campo: Nombre */}
        <TextInput
          style={globalStyles.input}
          placeholder="Nombre"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        {/* Campo: Correo electrónico */}
        <TextInput
          style={globalStyles.input}
          placeholder="Correo electrónico"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
        />
        {/* Campo: NIT */}
        <TextInput
          style={globalStyles.input}
          placeholder="NIT"
          value={form.NIT}
          onChangeText={(text) => handleChange('NIT', text)}
        />
        {/* Campo: Dirección */}
        <TextInput
          style={globalStyles.input}
          placeholder="Dirección"
          value={form.address}
          onChangeText={(text) => handleChange('address', text)}
        />
        {/* Campo: NRC */}
        <TextInput
          style={globalStyles.input}
          placeholder="NRC"
          value={form.NRC}
          onChangeText={(text) => handleChange('NRC', text)}
        />
        {/* Campo: Giro */}
        <TextInput
          style={globalStyles.input}
          placeholder="Giro"
          value={form.job}
          onChangeText={(text) => handleChange('job', text)}
        />
        {/* Botón para registrar cliente */}
        <TouchableOpacity
          style={[globalStyles.button, { marginTop: spacing.lg }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={globalStyles.buttonText}>{loading ? 'Guardando...' : 'Registrar'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterClientScreen;