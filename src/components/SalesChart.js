import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { colors, typography, spacing } from '../styles/globalStyles';

const SalesChart = ({ data, type = 'line' }) => {
  const screenWidth = Dimensions.get('window').width;
  const [chartError, setChartError] = React.useState(false);

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary,
    },
  };

  const formatData = (rawData) => {
    try {
      const monthlyData = rawData.reduce((acc, item) => {
        if (item && typeof item.amount === 'number' && isFinite(item.amount)) {
          const month = new Date(item.date).toLocaleString('default', { month: 'short' });
          if (!acc[month]) {
            acc[month] = 0;
          }
          acc[month] += item.amount;
        } else {
          console.warn('Datos de venta inválidos detectados y omitidos:', item);
        }
        return acc;
      }, {});

      if (Object.keys(monthlyData).length === 0) {
        return {
          labels: ['Sin Datos'],
          datasets: [{
            data: [0]
          }]
        };
      }

      return {
        labels: Object.keys(monthlyData),
        datasets: [
          {
            data: Object.values(monthlyData),
          },
        ],
      };
    } catch (error) {
      console.error('Error al formatear los datos del gráfico:', error);
      setChartError(true);
      return {
        labels: ['Error'],
        datasets: [{
          data: [0]
        }]
      };
    }
  };

  const chartData = formatData(data);

  if (chartError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar el gráfico.</Text>
        <Text style={styles.errorText}>Por favor, verifica los datos de ventas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {
        chartData.labels.length > 0 && chartData.datasets[0].data.length > 0 ? (
          type === 'line' ? (
            <LineChart
              data={chartData}
              width={screenWidth - spacing.lg * 2}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          ) : (
            <BarChart
              data={chartData}
              width={screenWidth - spacing.lg * 2}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
            />
          )
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No hay suficientes datos para mostrar el gráfico.</Text>
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.md,
  },
  chart: {
    marginVertical: spacing.md,
    borderRadius: 16,
  },
  errorContainer: {
    padding: spacing.md,
    backgroundColor: colors.error,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.onError,
    textAlign: 'center',
  },
  noDataContainer: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 8,
    alignItems: 'center',
  },
  noDataText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SalesChart; 