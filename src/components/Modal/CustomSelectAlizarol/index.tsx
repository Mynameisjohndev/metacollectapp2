import React, { SetStateAction, Dispatch } from 'react';
import { ModalProps } from 'react-native';

import Close from '../../../assets/Close.svg';
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

const typeAlizarol = ['Sim', 'Não'];

type IModalAlertProps = ModalProps & {
  onRequestClose?: () => void;
  setSelectedAlizarol: Dispatch<SetStateAction<'Sim' | 'Não' | string>>;
};

export const CustomSelectAlizarolOptions = ({
  onRequestClose,
  setSelectedAlizarol,
}: IModalAlertProps) => {
  const handleSelectAlizarol = (item: string) => {
    setSelectedAlizarol(item);
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
            data={typeAlizarol}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => {
              const option = item as string;
              return (
                <Option onPress={() => handleSelectAlizarol(option)}>
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
