import React from 'react';
import { ActivityIndicator, Text } from 'react-native';

import { wagonerContext } from '../../../context/wagonerContext';
import {
  ModalSyncronizeAppContainer,
  ModalSyncronizeAppContent,
} from './styles';

interface IModalSyncronizeApp {
  visible: boolean;
}
const ModalSyncronizeApp = ({ visible }: IModalSyncronizeApp) => {
  const { loadWagonerMessage } = wagonerContext();

  return (
    <ModalSyncronizeAppContainer
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <ModalSyncronizeAppContent>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 20 }}>
          {loadWagonerMessage || 'Sicronizando dados...'}
        </Text>
      </ModalSyncronizeAppContent>
    </ModalSyncronizeAppContainer>
  );
};

export { ModalSyncronizeApp };
