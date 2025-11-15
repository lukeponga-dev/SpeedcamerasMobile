
import React from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Map from '../components/Map';
import { useTheme } from '../theme/AppThemeProvider';

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Permission',
          message: 'SpeedWatch needs access to your location to show your position on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const MapScreen = () => {
  const { colors } = useTheme();

  React.useEffect(() => {
    requestLocationPermission();
  }, []);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
