import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo de la empresa */}
      <Image
        source={require('../assets/logo.png')} // Asegúrate de colocar el logo en la carpeta assets
        style={styles.logo}
      />
      <Text style={styles.title}>Grúas Moisés</Text>

      {/* Opciones del menú */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('RegisterClientScreen')}
        >
          <Text style={styles.menuText}>Registrar Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('ClientListScreen')}
        >
          <Text style={styles.menuText}>Ver Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('CreateInvoiceScreen')}
        >
          <Text style={styles.menuText}>Crear Factura</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('InvoiceListScreen')}
        >
          <Text style={styles.menuText}>Ver Facturas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('CreateQuoteScreen')}
        >
          <Text style={styles.menuText}>Crear Cotización</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('QuoteListScreen')}
        >
          <Text style={styles.menuText}>Ver Cotizaciones</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  menu: {
    width: '100%',
  },
  menuItem: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});