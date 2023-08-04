import React from 'react';
import { Text, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import { Teste } from './src/styles';
import { theme } from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={theme.COLORS.PRIMARY} />
      <Text>Open up App.js to start working on your app!</Text>
      <Teste />
    </ThemeProvider>
  );
}
