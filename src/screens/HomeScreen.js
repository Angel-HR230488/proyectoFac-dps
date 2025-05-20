import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CreativeCommons from '../components/CreativeCommons';
import TextSizeAdjuster from '../components/TextSizeAdjuster';
import SalesChart from '../components/SalesChart';
import QuoteInvoiceComparison from '../components/QuoteInvoiceComparison';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

const HomeScreen = ({ navigation }) => {
  const [textSize, setTextSize] = useState(1);
  const [salesData, setSalesData] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const billsResponse = await api.get('/items/bill');

      const formattedSalesData = billsResponse.data.data.map(item => ({
        date: item.date_created,
        amount: item.pricing || 0,
      }));
      setSalesData(formattedSalesData);

      const formattedInvoices = billsResponse.data.data.map(item => ({
          id: item.id,
          quoteId: null,
          date: item.date_created,
          amount: item.pricing || 0,
          name: item.name,
      }));
      setInvoices(formattedInvoices);

      const quotesResponse = await api.get('/items/quotation');

      const formattedQuotes = quotesResponse.data.data.map(item => ({
          id: item.id,
          date: item.date_created,
          amount: 0,
          name: item.name,
      }));
      setQuotes(formattedQuotes);

    } catch (e) {
      console.error('Error fetching data:', e);
      setError('Error al cargar los datos.');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, api, setSalesData, setInvoices, setQuotes]);

  useEffect(() => {
    const loadTextSize = async () => {
      try {
        const savedSize = await AsyncStorage.getItem('textSize');
        if (savedSize) {
          setTextSize(parseFloat(savedSize));
        }
      } catch (e) {
        console.error('Error loading text size:', e);
      }
    };

    loadTextSize();
    fetchData();

  }, [fetchData]);

  const handleTextSizeChange = (newSize) => {
    setTextSize(newSize);
  };

  if (loading) {
    return (
      <SafeAreaView style={[globalStyles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[typography.body, { marginTop: spacing.md }]}>Cargando datos...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[globalStyles.container, styles.centered]}>
        <Text style={[typography.h3, styles.errorText]}>{error}</Text>
        <TouchableOpacity onPress={fetchData} style={{ marginTop: spacing.md }}>
            <Text style={styles.retryButtonText}>Intentar de nuevo</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={[typography.h1, styles.welcomeTitle, { fontSize: typography.h1.fontSize * textSize }]}>
            ¡Bienvenido!
          </Text>
          <Text style={[typography.body, styles.welcomeSubtitle, { fontSize: typography.body.fontSize * textSize }]}>
            Sistema de Gestión de Facturas y Cotizaciones
          </Text>

          <View style={styles.controlsContainer}>
            <TextSizeAdjuster onTextSizeChange={handleTextSizeChange} />
            <TouchableOpacity onPress={fetchData} style={styles.refreshButton} disabled={loading}>
              <Ionicons name="refresh" size={24} color={loading ? colors.textSecondary : colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <TouchableOpacity 
              style={[globalStyles.card, styles.statCard]}
              onPress={() => navigation.navigate('ClientsTab')}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <Ionicons name="people" size={32} color={colors.primary} />
                <View style={styles.cardText}>
                  <Text style={[typography.h3, { fontSize: typography.h3.fontSize * textSize }]}>Clientes</Text>
                  <Text style={[typography.body, { fontSize: typography.body.fontSize * textSize }]}>Gestiona tu lista de clientes</Text>
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
                  <Text style={[typography.h3, { fontSize: typography.h3.fontSize * textSize }]}>Cotizaciones</Text>
                  <Text style={[typography.body, { fontSize: typography.body.fontSize * textSize }]}>Crea y administra cotizaciones</Text>
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
                  <Text style={[typography.h3, { fontSize: typography.h3.fontSize * textSize }]}>Facturas</Text>
                  <Text style={[typography.body, { fontSize: typography.body.fontSize * textSize }]}>Controla tus facturas</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.chartContainer}>
            <Text style={[typography.h3, { fontSize: typography.h3.fontSize * textSize }]}>Ventas Mensuales</Text>
            <SalesChart data={salesData} type="line" />
          </View>

          <View style={styles.comparisonContainer}>
            <Text style={[typography.h3, { fontSize: typography.h3.fontSize * textSize }]}>Comparativa Cotizaciones vs Facturas</Text>
            <QuoteInvoiceComparison quotes={quotes} invoices={invoices} />
          </View>
        </View>
        <CreativeCommons />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  refreshButton: {
    padding: spacing.sm,
  },
  statsContainer: {
    gap: spacing.md,
    marginTop: spacing.xl,
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
  chartContainer: {
    marginTop: spacing.xl,
  },
  comparisonContainer: {
    marginTop: spacing.xl,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
  },
  retryButtonText: {
    color: colors.primary,
    ...typography.body,
  },
});

export default HomeScreen;