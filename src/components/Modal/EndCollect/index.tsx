import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ModalProps } from 'react-native';

import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomTouchableOpacity } from '../../global';
import { CustomNewCollectInput } from '../../Input/CustomNewCollectInput';
import {
  ContainerModal,
  OverlayModal,
  ContentModal,
  BodyModal,
  CloseButtonModal,
  ContainerButtonModal,
  TextButtonModal,
  ModalLabel,
} from '../CustomAlert/styles';
import { CustomInput } from '../CustomPasswordAlert/styles';

interface ITitleButton {
  title: string;
  action: () => void;
  setCheck?: Dispatch<SetStateAction<boolean>>;
}

type IEndCollectModal = ModalProps & {
  hasCloseButton?: boolean;
  onRequestClose?: () => void;
  icon?: 0 | 1 | 2 | 3;
  animationType: string;
  executeUpdateCollect: (kmfinal: number) => void;
};

export const EndCollectModal = ({
  hasCloseButton,
  onRequestClose,
  animationType,
  executeUpdateCollect,
}: IEndCollectModal) => {
  const [kmfinal, setkmfinal] = useState('');
  const [valid, setValid] = useState<'initial' | 'false' | 'true'>('initial');

  const CustomCloseButton = () => {
    return hasCloseButton ? (
      <CloseButtonModal style={{ marginBottom: 12 }}>
        <CustomTouchableOpacity onPress={() => onRequestClose()}>
          {returnAppIcons({ icon: 'close' })}
        </CustomTouchableOpacity>
      </CloseButtonModal>
    ) : null;
  };

  const validEndCollect = () => {
    if (kmfinal === '') {
      return setValid('true');
    }
    return executeUpdateCollect(Number(kmfinal));
  };

  useEffect(() => {
    if (kmfinal !== '') {
      setValid('false');
    }
  }, [kmfinal]);

  const CustomButtonModal = ({ title, action }: ITitleButton) => {
    return (
      <ContainerButtonModal onPress={action}>
        <TextButtonModal>{title}</TextButtonModal>
      </ContainerButtonModal>
    );
  };

  const onReplaceCommaToPoint = (text: string) => {
    const word = text.replace(/[^0-9/]/g, '');
    setkmfinal(word);
  };

  return (
    <ContainerModal transparent animationType={animationType}>
      <OverlayModal onPress={() => onRequestClose()}>
        <ContentModal style={{ minHeight: 100 }}>
          <CustomCloseButton />
          <ModalLabel>Inserir quilômetro final</ModalLabel>
          <CustomInput
            style={{
              borderColor: 'red',
              borderWidth: valid === 'true' ? 1 : 0,
            }}
            keyboardType="numeric"
            placeholder="Digite o quilômetro final"
            value={kmfinal}
            onChangeText={text => onReplaceCommaToPoint(text)}
          />
          {valid === 'true' && (
            <BodyModal
              style={{
                color: 'red',
                fontSize: 14,
                alignSelf: 'flex-start',
                textAlign: 'left',
                marginTop: 12,
              }}
            >
              Você não informou a quilometragem final da coleta!
            </BodyModal>
          )}
          <CustomButtonModal title="Informar" action={validEndCollect} />
        </ContentModal>
      </OverlayModal>
    </ContainerModal>
  );
};
