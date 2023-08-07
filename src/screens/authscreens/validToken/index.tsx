import React, { useEffect, useState } from 'react';

import CustomFormButton, {
  ICustomFormButtonRef,
} from '../../../components/Buttons/CustomFormButton';
import { CustomLogoApp } from '../../../components/CustomLogoApp';
import {
  Container,
  CustomScrollView,
  CustomTouchableOpacity,
  Form,
  FormKeyboardAvoidingView,
} from '../../../components/global';
import { CustomFormInput } from '../../../components/Input/CustomFormInput';
import { ValidAuthenticationModal } from '../../../components/Modal/ValidAuthenticationModal';
import { wagonerContext } from '../../../context/wagonerContext';
import { ValidTokenProps } from '../../../routes/types/authroutes/authscreen';
import { requestGpsLocation } from '../../../services/GPS/activeLocationPermissions';
import { IValidModalContext } from '../../../types/validModalContext';
import { validTokenMessages } from '../../../utils/messages';
import { requestAccessReadPhoneState } from '../../../utils/readPhoneStatePermission';
import { requestDeviceInformation } from '../../../utils/requestDeviceInformation';
import { TextValid } from './styles';

export const ValidToken = ({ navigation }: ValidTokenProps) => {
  const [cnpj, setCnpj] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [modal, setModal] = useState<IValidModalContext>({
    isOpen: false,
    modalType: 0,
  });
  const { isOpen, modalType } = modal;

  const { handleValidTokenWagoner, validTokenLoading } = wagonerContext();

  useEffect(() => {
    requestAccessReadPhoneState().then(() => {
      requestGpsLocation().then(() => {
        requestDeviceInformation({ DFIDCARRETEIRO: null, DFIDLICENCA: null });
      });
    });
  }, []);

  const handleSignin = () => {
    navigation.replace('Signin');
  };

  return (
    <Container>
      <FormKeyboardAvoidingView>
        <Form>
          <CustomScrollView>
            <CustomLogoApp />
            <CustomFormInput
              type="USERS"
              placeholder="CNPJ"
              value={cnpj}
              onChangeText={setCnpj}
            />
            <CustomFormInput
              type="TOKEN"
              placeholder="Token"
              secureTextEntry
              value={token}
              onChangeText={setToken}
            />
            <CustomFormButton
              title="Validar"
              selectColor="primary"
              loading={validTokenLoading}
              onPress={() =>
                handleValidTokenWagoner({
                  token,
                  cnpj,
                  setModal,
                  navigate: handleSignin,
                })
              }
            />
          </CustomScrollView>
          <CustomTouchableOpacity onPress={handleSignin}>
            <TextValid>Já estou validado!</TextValid>
          </CustomTouchableOpacity>
        </Form>
      </FormKeyboardAvoidingView>
      <ValidAuthenticationModal
        {...{
          isOpen,
          modalType,
          openModal: () => setModal({ isOpen: false, modalType: 0 }),
          messages: validTokenMessages,
          setLoading: () => null,
          handleNavigate: () => handleSignin(),
          buttonName: ['Corrigir', 'Prosseguir'],
        }}
      />
    </Container>
  );
};
