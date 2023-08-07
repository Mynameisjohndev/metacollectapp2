import React, { Dispatch, SetStateAction, useState } from 'react';
import { ModalProps } from 'react-native';

import { META_COLLECT_PASSWORD_CONFIG } from '../../../config';
import { useWagonerSettingsContext } from '../../../context/wagonerSettingsContext';
import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomTouchableOpacity } from '../../global';
import {
  ContainerModal,
  OverlayModal,
  ContentModal,
  BodyModal,
  CloseButtonModal,
  ContainerButtonModal,
  TextButtonModal,
  CustomInput,
  ContainerView,
  ModalLabel,
} from './styles';

interface ITitleButton {
  title: string;
  action: () => void;
  setCheck?: Dispatch<SetStateAction<boolean>>;
}

type CustomPasswordAlertProps = ModalProps & {
  hasCloseButton?: boolean;
  onRequestClose?: () => void;
  icon?: 0 | 1 | 2 | 3;
  body?: string;
  animationType: string;
  action: () => void;
  type: 'save' | 'restore';
};

export const CustomPasswordAlert = ({
  body,
  hasCloseButton,
  onRequestClose,
  animationType,
  action,
  type,
}: CustomPasswordAlertProps) => {
  const { hasRuleBack, hasDischarge, hasQuality, updateConfig, restoreConfig } =
    useWagonerSettingsContext();
  const [confirmedPassword, setConfirmedPassword] = useState<string>();

  const [check, setCheck] = useState<boolean>(false);

  const CustomCloseButton = () => {
    return hasCloseButton ? (
      <CloseButtonModal>
        <CustomTouchableOpacity onPress={() => onRequestClose()}>
          {returnAppIcons({ icon: 'close' })}
        </CustomTouchableOpacity>
      </CloseButtonModal>
    ) : null;
  };

  const validPassword = async () => {
    if ((await META_COLLECT_PASSWORD_CONFIG) === confirmedPassword) {
      if (type === 'save') {
        updateConfig({ hasDischarge, hasRuleBack, hasQuality });
        onRequestClose();
      } else {
        restoreConfig();
        onRequestClose();
      }
    } else {
      setCheck(true);
    }
  };

  const CustomButtonModal = ({ title, action }: ITitleButton) => {
    return (
      <ContainerButtonModal onPress={action}>
        <TextButtonModal>{title}</TextButtonModal>
      </ContainerButtonModal>
    );
  };

  return (
    <ContainerModal transparent animationType={animationType}>
      <OverlayModal onPress={() => onRequestClose()}>
        <ContentModal>
          <CustomCloseButton />
          <ModalLabel>Inserir senha</ModalLabel>
          <CustomInput
            secureTextEntry
            autoCapitalize="none"
            style={{
              borderColor: 'red',
              borderWidth: check ? 1 : 0,
            }}
            onFocus={() => {
              if (check) {
                setConfirmedPassword(confirmedPassword);
              }
              setCheck(false);
            }}
            placeholder="Digite sua senha"
            value={confirmedPassword}
            onChangeText={text => setConfirmedPassword(text)}
          />
          {check ? (
            <BodyModal
              style={{
                color: 'red',
                fontSize: 14,
                alignSelf: 'flex-start',
                textAlign: 'left',
                marginTop: 12,
              }}
            >
              {body}
            </BodyModal>
          ) : (
            ''
          )}
          <ContainerView>
            <CustomButtonModal title={'Cancelar'} action={action} />
            <CustomButtonModal title={'Salvar'} action={validPassword} />
          </ContainerView>
        </ContentModal>
      </OverlayModal>
    </ContainerModal>
  );
};
