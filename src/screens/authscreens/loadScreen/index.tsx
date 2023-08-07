import React from 'react';
import { ActivityIndicator, Text } from 'react-native';

import { Container } from '../../../components/global';
import { wagonerContext } from '../../../context/wagonerContext';

export const LoadScreenAuth = () => {
  const { loadWagonerMessage } = wagonerContext();

  return (
    <Container>
      <ActivityIndicator size="large" color="grey" />
      <Text>{loadWagonerMessage || 'Sincronizando dados...'}</Text>
    </Container>
  );
};
