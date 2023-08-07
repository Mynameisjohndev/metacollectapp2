import React from 'react';
import { ModalProps } from 'react-native';

import {
  returnAppIcons,
  returnValidIconModal,
} from '../../../utils/returnAppIcons';
import { CustomTouchableOpacity } from '../../global';
import {
  ContainerModal,
  OverlayModal,
  ContentModal,
  BodyModal,
  CloseButtonModal,
  ContainerButtonModal,
  TextButtonModal,
} from './styles';

interface IActionButton {
  title: string;
  action: () => void;
}

type IModalAlertProps = ModalProps & {
  hasCloseButton?: boolean;
  onRequestClose?: () => void;
  icon?: 0 | 1 | 2 | 3;
  body?: string;
  hasActionButton?: IActionButton;
  animationType: string;
};

export const CustomAlert = ({
  body,
  icon,
  hasCloseButton,
  hasActionButton,
  onRequestClose,
  animationType,
}: IModalAlertProps) => {
  const CustomCloseButton = () => {
    return hasCloseButton ? (
      <CloseButtonModal>
        <CustomTouchableOpacity onPress={() => onRequestClose()}>
          {returnAppIcons({ icon: 'close' })}
        </CustomTouchableOpacity>
      </CloseButtonModal>
    ) : null;
  };

  const CustomButtonModal = () => {
    return hasActionButton ? (
      <ContainerButtonModal onPress={hasActionButton.action}>
        <TextButtonModal>{hasActionButton.title}</TextButtonModal>
      </ContainerButtonModal>
    ) : null;
  };

  return (
    <ContainerModal transparent animationType={animationType}>
      <OverlayModal onPress={() => onRequestClose()}>
        <ContentModal>
          <CustomCloseButton />
          {returnValidIconModal(icon)}
          <BodyModal>{body}</BodyModal>
          <CustomButtonModal />
        </ContentModal>
      </OverlayModal>
    </ContainerModal>
  );
};
