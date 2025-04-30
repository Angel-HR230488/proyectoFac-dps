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
} from 'react-native';

export default function CreateInvoiceScreen() {
  const [nrc, setNrc] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [nit, setNit] = useState('');
  const [business, setBusiness] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [includeIva, setIncludeIva] = useState(false);
  const [totalPrice, setTotalPrice] = useState('');

  const clients = [
    {
      nrc: '12345',
      name: 'Cliente Ejemplo',
      address: 'Calle Falsa 123',
      nit: '54321',
      business: 'Transporte',
    },
  ];

  const handleNrcChange = (value) => {
    setNrc(value);
    const client = clients.find((c) => c.nrc === value);
    if (client) {
      setName(client.name);
      setAddress(client.address);
      setNit(client.nit);
      setBusiness(client.business);
    } else {
      setName('');
      setAddress('');
      setNit('');
      setBusiness('');
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = parseFloat(price) || 0;
    const iva = includeIva ? basePrice * 0.13 : 0;
    setTotalPrice((basePrice + iva).toFixed(2));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Crear Factura</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de Registro (NRC)"
            value={nrc}
            onChangeText={handleNrcChange}
            keyboardType="numeric"
          />
          <TextInput style={styles.input} placeholder="Nombre" value={name} editable={false} />
          <TextInput style={styles.input} placeholder="Dirección" value={address} editable={false} />
          <TextInput style={styles.input} placeholder="NIT" value={nit} editable={false} />
          <TextInput style={styles.input} placeholder="Giro" value={business} editable={false} />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={price}
            onChangeText={(value) => {
              setPrice(value);
              calculateTotalPrice();
            }}
            keyboardType="numeric"
          />
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>¿Incluir IVA?</Text>
            <Switch
              value={includeIva}
              onValueChange={(value) => {
                setIncludeIva(value);
                calculateTotalPrice();
              }}
            />
          </View>
          <Text style={styles.totalPrice}>Precio Total: ${totalPrice}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Guardar Factura</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

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