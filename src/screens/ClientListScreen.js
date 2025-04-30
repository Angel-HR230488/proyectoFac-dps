import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function ClientListScreen() {
  // Datos simulados
  const [clients, setClients] = useState([
    { id: 1, nombre: 'Cliente Ejemplo 1', nrc: '12345' },
    { id: 2, nombre: 'Cliente Ejemplo 2', nrc: '67890' },
    { id: 3, nombre: 'Cliente Ejemplo 3', nrc: '54321' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>
      {/* Mostrar la lista de clientes */}
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()} // Usa el ID del cliente como clave
        renderItem={({ item }) => (
          <View style={styles.clientItem}>
            <Text style={styles.clientName}>{item.nombre}</Text>
            <Text style={styles.clientNrc}>NRC: {item.nrc}</Text>
          </View>
        )}
      />
    </View>
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
  clientItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clientNrc: {
    fontSize: 14,
    color: '#555',
  },
});