import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography, spacing } from '../styles/globalStyles';

const TextSizeAdjuster = ({ onTextSizeChange }) => {
  const [textSize, setTextSize] = React.useState(1);

  const adjustTextSize = async (direction) => {
    const newSize = direction === 'increase' ? textSize + 0.1 : textSize - 0.1;
    if (newSize >= 0.8 && newSize <= 1.4) {
      setTextSize(newSize);
      await AsyncStorage.setItem('textSize', newSize.toString());
      onTextSizeChange(newSize);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => adjustTextSize('decrease')} style={styles.button}>
        <Ionicons name="remove-circle" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text style={styles.sizeText}>{Math.round(textSize * 100)}%</Text>
      <TouchableOpacity onPress={() => adjustTextSize('increase')} style={styles.button}>
        <Ionicons name="add-circle" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  button: {
    padding: spacing.xs,
  },
  sizeText: {
    ...typography.body,
    marginHorizontal: spacing.md,
  },
});

export default TextSizeAdjuster; 