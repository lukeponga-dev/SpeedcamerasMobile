
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Speedometer from 'react-native-speedometer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../theme/AppThemeProvider';
import { mapStyle } from '../theme/mapStyle';

const Map = () => {
  const [position, setPosition] = useState(null);
  const [speed, setSpeed] = useState(0);
  const { isDark, colors } = useTheme();

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (currentPosition) => {
        setPosition(currentPosition.coords);
        // Speed is in m/s, convert to km/h
        setSpeed(currentPosition.coords.speed > 0 ? currentPosition.coords.speed * 3.6 : 0);
        storeLocation(currentPosition.coords);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, distanceFilter: 1, interval: 1000, fastestInterval: 1000 },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const storeLocation = async (newLocation) => {
    try {
      const existingLocations = await AsyncStorage.getItem('locationHistory');
      const locations = existingLocations ? JSON.parse(existingLocations) : [];
      const newLocationData = {
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
        timestamp: new Date().getTime(),
      };
      locations.push(newLocationData);
      await AsyncStorage.setItem('locationHistory', JSON.stringify(locations));
    } catch (error) {
      console.log('Error storing location:', error);
    }
  };

  return (
    <View style={styles.container}>
      {position ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={isDark ? mapStyle : []}
          initialRegion={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation
          followsUserLocation
          >
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
            <Text style={{color: colors.text}}>Fetching location...</Text>
        </View>
      )}
      <View style={styles.speedometerContainer}>
        <Speedometer
          value={speed}
          totalValue={140}
          size={200}
          outerColor={colors.border}
          internalColor={colors.primary}
          innerColor={colors.card}
          showLabels
          labelStyle={{ color: colors.text }}
          labelNoteStyle={{color: colors.text}}
          valueStyle={{color: colors.text}}
        />
        <Text style={[styles.speedText, {color: colors.text}]}>{speed.toFixed(0)} km/h</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  speedometerContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  speedText: {
    marginTop: -40,
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Map;
