import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../api/api';

// Pantalla principal de la lista de clientes
const ClientListScreen = ({ navigation }) => {
  // Estados locales
  const [clients, setClients] = useState([]);      // Lista de clientes
  const [loading, setLoading] = useState(false);   // Estado de carga
  const [search, setSearch] = useState('');        // Texto de búsqueda

  // Función para obtener los clientes desde la API
  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await api.get('items/client');
      setClients(res.data.data || []);
    } catch (error) {
      console.error("error", error);
      Alert.alert('Error', 'No se pudieron cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  // Efecto para recargar la lista cuando la pantalla toma foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchClients);
    return unsubscribe;
  }, [navigation]);

  // Maneja la eliminación de un cliente
  const handleDelete = (id) => {
    Alert.alert(
      'Eliminar cliente',
      '¿Estás seguro de que deseas eliminar este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`items/client/${id}`);
              fetchClients();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el cliente');
            }
          },
        },
      ]
    );
  };

  // Filtra los clientes según el texto de búsqueda
  const filteredClients = clients.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.name?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.NIT?.toLowerCase().includes(q) ||
      item.NRC?.toLowerCase().includes(q)
    );
  });

  // Renderizado de la pantalla
  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={typography.h1}>Clientes</Text>
      </View>
      {/* Barra de búsqueda */}
      <TextInput
        style={globalStyles.input}
        placeholder="Buscar cliente..."
        value={search}
        onChangeText={setSearch}
      />
      {/* Lista de clientes */}
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchClients}
        renderItem={({ item }) => (
          <View style={[globalStyles.card, styles.clientCard]}>
            <View style={{ flex: 1 }}>
              <Text style={typography.h3}>{item.name}</Text>
              <Text style={typography.body}>{item.email}</Text>
              <Text style={typography.caption}>NIT: {item.NIT} | NRC: {item.NRC}</Text>
            </View>
            {/* Botón para eliminar cliente */}
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDelete(item.id)}
            >
              <Ionicons name="trash" size={22} color={colors.error} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={typography.body}>No hay clientes registrados</Text>
          </View>
        }
      />
      {/* Botón flotante para agregar cliente */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ClientsTab', { screen: 'RegisterClient' })}
      >
        <Ionicons name="add" size={24} color={colors.background} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Estilos de la pantalla
const styles = StyleSheet.create({
  header: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  clientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  deleteBtn: {
    padding: spacing.sm,
  },
});

// Exporta la pantalla
export default ClientListScreen;