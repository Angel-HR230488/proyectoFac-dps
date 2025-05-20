import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../styles/globalStyles';

const SortableList = ({ data, onSort, renderItem }) => {
  const [sortConfig, setSortConfig] = React.useState({
    key: null,
    direction: 'ascending'
  });

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    onSort(sortedData);
  };

  const SortButton = ({ title, sortKey }) => (
    <TouchableOpacity
      style={styles.sortButton}
      onPress={() => sortData(sortKey)}
    >
      <Text style={styles.sortButtonText}>{title}</Text>
      {sortConfig.key === sortKey && (
        <Ionicons
          name={sortConfig.direction === 'ascending' ? 'arrow-up' : 'arrow-down'}
          size={16}
          color={colors.primary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SortButton title="Fecha" sortKey="date" />
        <SortButton title="Cliente" sortKey="client" />
        <SortButton title="Monto" sortKey="amount" />
      </View>
      {data.map((item, index) => (
        <Animated.View
          key={index}
          style={styles.itemContainer}
        >
          {renderItem(item)}
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
  },
  sortButtonText: {
    ...typography.body,
    color: colors.textPrimary,
    marginRight: spacing.xs,
  },
  itemContainer: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});

export default SortableList; 