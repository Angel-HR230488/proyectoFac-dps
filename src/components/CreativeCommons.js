import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { globalStyles, colors, typography, spacing } from '../styles/globalStyles';

const CreativeCommons = () => {
  const handlePress = () => {
    Linking.openURL('https://creativecommons.org/licenses/by-nc-sa/4.0/');
  };

  return (
    <View style={styles.container}>
      <Text style={[typography.caption, styles.text]}>
        Este proyecto está bajo la licencia{' '}
        <Text style={styles.link} onPress={handlePress}>
          Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  text: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default CreativeCommons; 