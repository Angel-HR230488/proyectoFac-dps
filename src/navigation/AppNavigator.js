import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { colors } from '../styles/globalStyles';
import HomeScreen from '../screens/HomeScreen';
import ClientListScreen from '../screens/ClientListScreen';
import QuoteListScreen from '../screens/QuoteListScreen';
import InvoiceListScreen from '../screens/InvoiceListScreen';
import CreateQuoteScreen from '../screens/CreateQuoteScreen';
import CreateInvoiceScreen from '../screens/CreateInvoiceScreen';
import RegisterClientScreen from '../screens/RegisterClientScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({ onLogout }) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      options={{
        title: 'Inicio',
        headerRight: () => (
          <TouchableOpacity onPress={onLogout} style={{ marginRight: 16 }}>
            <Ionicons name="log-out-outline" size={24} color={colors.error} />
          </TouchableOpacity>
        ),
      }}
    >
      {props => <HomeScreen {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const ClientsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ClientList" component={ClientListScreen} options={{ title: 'Clientes' }} />
    <Stack.Screen name="RegisterClient" component={RegisterClientScreen} options={{ title: 'Registrar Cliente' }} />
  </Stack.Navigator>
);

const QuotesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="QuoteList" component={QuoteListScreen} options={{ title: 'Cotizaciones' }} />
    <Stack.Screen name="CreateQuote" component={CreateQuoteScreen} options={{ title: 'Crear Cotización' }} />
  </Stack.Navigator>
);

const InvoicesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="InvoiceList" component={InvoiceListScreen} options={{ title: 'Facturas' }} />
    <Stack.Screen name="CreateInvoice" component={CreateInvoiceScreen} options={{ title: 'Crear Factura' }} />
  </Stack.Navigator>
);

const AppNavigator = ({ onLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ClientsTab') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'QuotesTab') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'InvoicesTab') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        children={() => <HomeStack onLogout={onLogout} />}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen 
        name="ClientsTab" 
        component={ClientsStack}
        options={{ title: 'Clientes' }}
      />
      <Tab.Screen 
        name="QuotesTab" 
        component={QuotesStack}
        options={{ title: 'Cotizaciones' }}
      />
      <Tab.Screen 
        name="InvoicesTab" 
        component={InvoicesStack}
        options={{ title: 'Facturas' }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator; 