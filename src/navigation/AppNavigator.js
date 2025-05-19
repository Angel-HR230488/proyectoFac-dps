import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ClientListScreen from '../screens/ClientListScreen';
import QuoteListScreen from '../screens/QuoteListScreen';
import InvoiceListScreen from '../screens/InvoiceListScreen';
import CreateQuoteScreen from '../screens/CreateQuoteScreen';
import CreateInvoiceScreen from '../screens/CreateInvoiceScreen';
import RegisterClientScreen from '../screens/RegisterClientScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const ClientsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ClientList" component={ClientListScreen} />
    <Stack.Screen name="RegisterClient" component={RegisterClientScreen} />
  </Stack.Navigator>
);

const QuotesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="QuoteList" component={QuoteListScreen} />
    <Stack.Screen name="CreateQuote" component={CreateQuoteScreen} />
  </Stack.Navigator>
);

const InvoicesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="InvoiceList" component={InvoiceListScreen} />
    <Stack.Screen name="CreateInvoice" component={CreateInvoiceScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
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
        component={HomeStack}
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