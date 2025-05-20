import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, typography, spacing } from '../styles/globalStyles';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const QuoteInvoiceComparison = ({ quotes, invoices }) => {
  const calculateStats = () => {
    const totalQuotes = quotes.length;
    const totalInvoices = invoices.length;
    const convertedQuotes = quotes.filter(quote => 
      invoices.some(invoice => invoice.quoteId === quote.id)
    ).length;
    const conversionRate = totalQuotes > 0 ? (convertedQuotes / totalQuotes) * 100 : 0;

    return {
      totalQuotes,
      totalInvoices,
      convertedQuotes,
      conversionRate,
    };
  };

  const stats = calculateStats();

  const StatCard = ({ title, value, subtitle }) => (
    <Animated.View 
      entering={FadeIn} 
      exiting={FadeOut}
      style={styles.statCard}
    >
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsContainer}>
        <StatCard
          title="Total Cotizaciones"
          value={stats.totalQuotes}
          subtitle="En el período actual"
        />
        <StatCard
          title="Total Facturas"
          value={stats.totalInvoices}
          subtitle="Generadas"
        />
        <StatCard
          title="Cotizaciones Convertidas"
          value={stats.convertedQuotes}
          subtitle={`${stats.conversionRate.toFixed(1)}% de conversión`}
        />
      </View>

      <View style={styles.comparisonContainer}>
        <Text style={styles.sectionTitle}>Comparativa Mensual</Text>
        <View style={styles.monthlyStats}>
          {quotes.map((quote, index) => {
            const relatedInvoice = invoices.find(inv => inv.quoteId === quote.id);
            return (
              <Animated.View 
                key={index}
                entering={FadeIn.delay(index * 100)}
                style={styles.monthlyItem}
              >
                <Text style={styles.monthlyDate}>
                  {new Date(quote.date).toLocaleDateString()}
                </Text>
                <View style={styles.monthlyValues}>
                  <Text style={styles.monthlyValue}>
                    Cotización: ${quote.amount}
                  </Text>
                  {relatedInvoice && (
                    <Text style={[styles.monthlyValue, styles.invoiceValue]}>
                      Factura: ${relatedInvoice.amount}
                    </Text>
                  )}
                </View>
              </Animated.View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    flexWrap: 'wrap',
  },
  statCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
    width: '48%',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statTitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statValue: {
    ...typography.h2,
    color: colors.textPrimary,
    marginVertical: spacing.xs,
  },
  statSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  comparisonContainer: {
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  monthlyStats: {
    gap: spacing.md,
  },
  monthlyItem: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
  },
  monthlyDate: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  monthlyValues: {
    gap: spacing.xs,
  },
  monthlyValue: {
    ...typography.body,
    color: colors.textPrimary,
  },
  invoiceValue: {
    color: colors.primary,
  },
});

export default QuoteInvoiceComparison; 