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

const CreateInvoiceScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    NIT: '',
    address: '',
    NRC: '',
    job: '',
    description: '',
    pricing: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.pricing) {
      Alert.alert('Error', 'Nombre, correo y total son obligatorios');
      return;
    }
    setLoading(true);
    try {
      await api.post('items/bill', { ...form, pricing: parseFloat(form.pricing) });
      Alert.alert('Éxito', 'Factura creada correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la factura');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={typography.h1}>Crear Factura</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Nombre del cliente"
          value={form.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Correo electrónico"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
        />
        <TextInput
          style={globalStyles.input}
          placeholder="NIT"
          value={form.NIT}
          onChangeText={(text) => handleChange('NIT', text)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Dirección"
          value={form.address}
          onChangeText={(text) => handleChange('address', text)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="NRC"
          value={form.NRC}
          onChangeText={(text) => handleChange('NRC', text)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Giro"
          value={form.job}
          onChangeText={(text) => handleChange('job', text)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Descripción"
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Total ($)"
          value={form.pricing}
          onChangeText={text => {
            const numeric = text.replace(/[^0-9.]/g, '');
            handleChange('pricing', numeric);
          }}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[globalStyles.button, { marginTop: spacing.lg }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={globalStyles.buttonText}>{loading ? 'Guardando...' : 'Crear Factura'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateInvoiceScreen;

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