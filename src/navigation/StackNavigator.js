import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RegisterClientScreen from '../screens/RegisterClientScreen';
import ClientListScreen from '../screens/ClientListScreen';
import CreateInvoiceScreen from '../screens/CreateInvoiceScreen';
import InvoiceListScreen from '../screens/InvoiceListScreen';
import CreateQuoteScreen from '../screens/CreateQuoteScreen';
import QuoteListScreen from '../screens/QuoteListScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="RegisterClientScreen" component={RegisterClientScreen} options={{ title: 'Registrar Cliente' }} />
      <Stack.Screen name="ClientListScreen" component={ClientListScreen} options={{ title: 'Lista de Clientes' }} />
      <Stack.Screen name="CreateInvoiceScreen" component={CreateInvoiceScreen} options={{ title: 'Crear Factura' }} />
      <Stack.Screen name="InvoiceListScreen" component={InvoiceListScreen} options={{ title: 'Lista de Facturas' }} />
      <Stack.Screen name="CreateQuoteScreen" component={CreateQuoteScreen} options={{ title: 'Crear Cotización' }} />
      <Stack.Screen name="QuoteListScreen" component={QuoteListScreen} options={{ title: 'Lista de Cotizaciones' }} />
    </Stack.Navigator>
  );
}