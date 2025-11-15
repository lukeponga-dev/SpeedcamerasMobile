
import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

const lightColors = {
  primary: '#3F51B5',
  background: '#F0F2F5',
  card: '#FFFFFF',
  text: '#000000',
  border: '#D1D5DB',
  notification: '#FF9800',
};

const darkColors = {
  primary: '#3F51B5',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  border: '#272727',
  notification: '#FFB74D',
};

const ThemeContext = createContext();

export const AppThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [scheme, setScheme] = useState(systemScheme);

  const isDark = scheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, isDark, scheme, setScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
