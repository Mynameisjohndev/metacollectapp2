import React, { SetStateAction, Dispatch } from 'react';
import { ModalProps } from 'react-native';

import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomTouchableOpacity, Title } from '../../global';
import {
  ContainerModal,
  OverlayModal,
  ContentModal,
  ContentHeaderListOption,
  ListOptions,
  Option,
  OtionName,
} from './styles';

const listQuality = ['Caracteristico', 'Não caracteristico'];

type IModalAlertProps = ModalProps & {
  onRequestClose?: () => void;
  setSelectedSensory: Dispatch<
    SetStateAction<'Caracteristico' | 'Não caracteristico' | string>
  >;
};

export const CustomSelectSensoryOptions = ({
  onRequestClose,
  setSelectedSensory,
}: IModalAlertProps) => {
  const handleSelectSensory = (item: string) => {
    setSelectedSensory(item);
    onRequestClose();
  };

  return (
    <ContainerModal transparent animationType="slide">
      <OverlayModal onPress={() => onRequestClose()}>
        <ContentModal>
          <ContentHeaderListOption>
            <Title>Selecionar opção</Title>
            <CustomTouchableOpacity onPress={() => onRequestClose()}>
              {returnAppIcons({ icon: 'close', size: 25 })}
            </CustomTouchableOpacity>
          </ContentHeaderListOption>
          <ListOptions
            data={listQuality}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => {
              const option = item as string;
              return (
                <Option onPress={() => handleSelectSensory(option)}>
                  <OtionName>{option}</OtionName>
                </Option>
              );
            }}
          />
        </ContentModal>
      </OverlayModal>
    </ContainerModal>
  );
};
