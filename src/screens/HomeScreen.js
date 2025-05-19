import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={[typography.h1, styles.welcomeTitle]}>¡Bienvenido!</Text>
        <Text style={[typography.body, styles.welcomeSubtitle]}>
          Sistema de Gestión de Facturas y Cotizaciones
        </Text>
        <View style={styles.statsContainer}>
          <TouchableOpacity 
            style={[globalStyles.card, styles.statCard]}
            onPress={() => navigation.navigate('ClientsTab')}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <Ionicons name="people" size={32} color={colors.primary} />
              <View style={styles.cardText}>
                <Text style={typography.h3}>Clientes</Text>
                <Text style={typography.body}>Gestiona tu lista de clientes</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[globalStyles.card, styles.statCard]}
            onPress={() => navigation.navigate('QuotesTab')}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <Ionicons name="document-text" size={32} color={colors.primary} />
              <View style={styles.cardText}>
                <Text style={typography.h3}>Cotizaciones</Text>
                <Text style={typography.body}>Crea y administra cotizaciones</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[globalStyles.card, styles.statCard]}
            onPress={() => navigation.navigate('InvoicesTab')}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <Ionicons name="receipt" size={32} color={colors.primary} />
              <View style={styles.cardText}>
                <Text style={typography.h3}>Facturas</Text>
                <Text style={typography.body}>Controla tus facturas</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  welcomeTitle: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  welcomeSubtitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: colors.textSecondary,
  },
  statsContainer: {
    gap: spacing.md,
  },
  statCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
    marginLeft: spacing.md,
  },
});

export default HomeScreen;