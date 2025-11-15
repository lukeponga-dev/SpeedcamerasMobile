
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LocationHistory = () => {
  const [locationHistory, setLocationHistory] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadLocationHistory();
    });

    return unsubscribe;
  }, [navigation]);

  const loadLocationHistory = async () => {
    try {
      const existingLocations = await AsyncStorage.getItem('locationHistory');
      const locations = existingLocations ? JSON.parse(existingLocations) : [];
      setLocationHistory(locations);
    } catch (error) {
      console.log('Error loading location history:', error);
    }
  };

  const clearLocationHistory = async () => {
    try {
      await AsyncStorage.removeItem('locationHistory');
      setLocationHistory([]);
    } catch (error) {
      console.log('Error clearing location history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={locationHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text>Latitude: {item.latitude}</Text>
            <Text>Longitude: {item.longitude}</Text>
            <Text>Timestamp: {new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
      />
      <Button
        title="Clear History"
        onPress={clearLocationHistory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LocationHistory;
