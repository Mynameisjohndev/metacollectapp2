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

const typeQualitySample = ['Sim', 'Não'];

type IModalAlertProps = ModalProps & {
  onRequestClose?: () => void;
  setSelectedQualitySample: Dispatch<SetStateAction<'Sim' | 'Não' | string>>;
};

export const CustomSelectQualitySampleOptions = ({
  onRequestClose,
  setSelectedQualitySample,
}: IModalAlertProps) => {
  const handleSelectQualitySample = (item: string) => {
    setSelectedQualitySample(item);
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
            data={typeQualitySample}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => {
              const option = item as string;
              return (
                <Option onPress={() => handleSelectQualitySample(option)}>
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
