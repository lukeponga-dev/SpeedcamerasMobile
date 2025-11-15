
import React from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { useTheme } from '../theme/AppThemeProvider';

const SettingsScreen = () => {
  const { colors, isDark, setScheme } = useTheme();

  const toggleScheme = () => {
    setScheme(isDark ? 'light' : 'dark');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          trackColor={{ false: '#767577', true: colors.primary }}
          thumbColor={isDark ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleScheme}
          value={isDark}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  settingText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
