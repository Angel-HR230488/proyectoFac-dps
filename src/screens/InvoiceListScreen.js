import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const InvoiceListScreen = ({ navigation }) => {
  const [invoices, setInvoices] = React.useState([]); // You'll need to implement the actual data fetching

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={typography.h1}>Facturas</Text>
      </View>
      
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={typography.h3}>{item.clientName}</Text>
            <Text style={typography.body}>Fecha: {item.date}</Text>
            <Text style={typography.body}>Total: ${item.total}</Text>
            <Text style={[typography.caption, { color: item.paid ? colors.success : colors.warning }]}>
              {item.paid ? 'Pagada' : 'Pendiente'}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={typography.body}>No hay facturas registradas</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateInvoice')}
      >
        <Ionicons name="add" size={24} color={colors.background} />
      </TouchableOpacity>
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
});

export default InvoiceListScreen;