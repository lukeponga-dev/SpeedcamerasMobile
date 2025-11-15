
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LocationHistory from '../components/LocationHistory';

const LocationHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <LocationHistory />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LocationHistoryScreen;
