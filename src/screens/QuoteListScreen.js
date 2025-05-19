import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Modal, Pressable, TextInput } from 'react-native';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import api from '../api/api';

const QuoteListScreen = ({ navigation }) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const res = await api.get('items/quotation');
      setQuotes(res.data.data || []);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las cotizaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchQuotes);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = (id) => {
    Alert.alert(
      'Eliminar cotización',
      '¿Estás seguro de que deseas eliminar esta cotización?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`items/quotation/${id}`);
              setModalVisible(false);
              fetchQuotes();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la cotización');
            }
          },
        },
      ]
    );
  };

  const openDetails = (item) => {
    setSelected(item);
    setModalVisible(true);
  };

  const filteredQuotes = quotes.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.name?.toLowerCase().includes(q) ||
      item.NRC?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={typography.h1}>Cotizaciones</Text>
      </View>
      <TextInput
        style={globalStyles.input}
        placeholder="Buscar cotización..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredQuotes}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchQuotes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openDetails(item)}>
            <View style={globalStyles.card}>
              <Text style={typography.h3}>{item.name}</Text>
              <Text style={typography.body}>NRC: {item.NRC}</Text>
              <Text style={typography.caption}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={typography.body}>No hay cotizaciones registradas</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('QuotesTab', { screen: 'CreateQuote' })}
      >
        <Ionicons name="add" size={24} color={colors.background} />
      </TouchableOpacity>

      {/* Modal de detalles */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selected && (
              <>
                <Text style={typography.h2}>Cotización</Text>
                <Text style={typography.body}>Cliente: {selected.name}</Text>
                <Text style={typography.body}>NRC: {selected.NRC}</Text>
                <Text style={typography.body}>Descripción: {selected.description}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.lg }}>
                  <Pressable
                    style={[globalStyles.button, { backgroundColor: colors.error, flex: 1, marginRight: spacing.sm }]}
                    onPress={() => handleDelete(selected.id)}
                  >
                    <Text style={globalStyles.buttonText}>Eliminar</Text>
                  </Pressable>
                  <Pressable
                    style={[globalStyles.button, { flex: 1, backgroundColor: colors.secondary }]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={globalStyles.buttonText}>Cerrar</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.lg,
    width: '85%',
    elevation: 5,
  },
});

export default QuoteListScreen;