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

const typeAlizarol = ['72', '74', '76', '80', '82'];

type IModalAlertProps = ModalProps & {
  onRequestClose?: () => void;
  setSelectedTypeAlizarol: Dispatch<
    SetStateAction<'72' | '74' | '76' | '80' | '82' | string>
  >;
};

export const CustomSelectTypeAlizarolOptions = ({
  onRequestClose,
  setSelectedTypeAlizarol,
}: IModalAlertProps) => {
  const handleSelectTypeAlizarol = (item: string) => {
    setSelectedTypeAlizarol(item);
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
                <Option onPress={() => handleSelectTypeAlizarol(option)}>
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
