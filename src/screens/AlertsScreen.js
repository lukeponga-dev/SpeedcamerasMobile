
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/AppThemeProvider';
import { requestUserPermission, notificationListener } from '../lib/firebase';

const AlertsScreen = () => {
  const { colors } = useTheme();

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Alerts will be displayed here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AlertsScreen;
