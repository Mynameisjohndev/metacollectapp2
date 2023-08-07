import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import { AppContextProvider } from './src/context';
import { executeCreateSqliteTables } from './src/databases';
import { Routes } from './src/routes';
import theme from './src/themes';

export default function App() {
  useEffect(() => {
    executeCreateSqliteTables();
  }, []);

  return (
    <NavigationContainer>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <StatusBar backgroundColor={theme.COLORS.PRIMARY} />
          <Routes />
        </ThemeProvider>
      </AppContextProvider>
    </NavigationContainer>
  );
}
