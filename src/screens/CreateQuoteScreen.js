// Importaciones de librerías y componentes necesarios
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../api/api';

// Pantalla para crear una nueva cotización
const CreateQuoteScreen = ({ navigation }) => {
  // Estado para los campos del formulario
  const [form, setForm] = useState({
    name: '',
    NRC: '',
    description: '',
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
    if (!form.name || !form.NRC) {
      Alert.alert('Error', 'Nombre y NRC son obligatorios');
      return;
    }
    setLoading(true);
    try {
      // Envía los datos a la API
      await api.post('items/quotation', form);
      Alert.alert('Éxito', 'Cotización creada correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la cotización');
    } finally {
      setLoading(false);
    }
  };

  // Renderizado de la pantalla
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={typography.h1}>Crear Cotización</Text>
        {/* Campo: Nombre del cliente */}
        <TextInput
          style={globalStyles.input}
          placeholder="Nombre del cliente"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        {/* Campo: NRC */}
        <TextInput
          style={globalStyles.input}
          placeholder="NRC"
          value={form.NRC}
          onChangeText={(text) => handleChange('NRC', text)}
        />
        {/* Campo: Descripción */}
        <TextInput
          style={globalStyles.input}
          placeholder="Descripción"
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
        />
        {/* Botón para crear la cotización */}
        <TouchableOpacity
          style={[globalStyles.button, { marginTop: spacing.lg }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={globalStyles.buttonText}>{loading ? 'Guardando...' : 'Crear Cotización'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateQuoteScreen;

// Estilos locales 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});