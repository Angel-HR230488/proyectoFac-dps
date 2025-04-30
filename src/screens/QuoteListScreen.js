import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuoteListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Cotizaciones</Text>
      {/* Aquí se mostrará la lista de cotizaciones */}
      <Text style={styles.placeholder}>No hay cotizaciones registradas aún.</Text>
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
  placeholder: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});