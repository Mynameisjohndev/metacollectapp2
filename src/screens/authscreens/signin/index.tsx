import React, { useState } from 'react';
import { View } from 'react-native';

import Truck from '../../../assets/TruckWhite.svg';
import CustomFormButton, {
  ICustomFormButtonRef,
} from '../../../components/Buttons/CustomFormButton';
import { CustomLogoApp } from '../../../components/CustomLogoApp';
import {
  Container,
  CustomScrollView,
  Form,
  FormKeyboardAvoidingView,
} from '../../../components/global';
import { CustomFormInput } from '../../../components/Input/CustomFormInput';
import { ValidAuthenticationModal } from '../../../components/Modal/ValidAuthenticationModal';
import { wagonerContext } from '../../../context/wagonerContext';
import { useWagonerSettingsContext } from '../../../context/wagonerSettingsContext';
import { SigninProps } from '../../../routes/types/authroutes/authscreen';
import { IValidModalContext } from '../../../types/validModalContext';
import { validLoginMessages } from '../../../utils/messages';
import { returnOfImeiPermission } from '../../../utils/readPhoneStatePermission';

export const Signin = ({ navigation }: SigninProps) => {
  const { daysBefore } = useWagonerSettingsContext();
  const [signinLoading, setSigninLoading] = useState<boolean>(false);
  const [DFLOGIN, setDFLOGIN] = useState<string>('');
  const [DFSENHA, setDFSENHA] = useState<string>('');
  const [modal, setModal] = useState<IValidModalContext>({
    isOpen: false,
    modalType: 0,
  });
  const { isOpen, modalType } = modal;

  const { handleLoginUser, loadingExistWagoner } = wagonerContext();

  const handleValidToken = () => {
    navigation.navigate('ValidToken');
  };

  return (
    <Container>
      <FormKeyboardAvoidingView>
        <Form>
          <CustomScrollView>
            <CustomLogoApp />
            <CustomFormInput
              type="USERS"
              placeholder="Carreteiro"
              value={DFLOGIN}
              onChangeText={setDFLOGIN}
            />
            <CustomFormInput
              placeholder="Senha"
              type="SECRET"
              secureTextEntry
              value={DFSENHA}
              onChangeText={setDFSENHA}
            />
            {/* <CustomKeepConected
              onChangeState={setKeepConected}
              value={keepConected}
            /> */}
            <View style={{ marginTop: 30 }}>
              <CustomFormButton
                title="Entrar"
                selectColor="primary"
                onPress={() =>
                  handleLoginUser({
                    DFLOGIN,
                    DFSENHA,
                    setModal,
                    keepConected: true,
                    daysBefore,
                    loadingExistWagoner,
                    setSigninLoading,
                  })
                }
                loading={signinLoading}
                enabled={!signinLoading}
              />
              <CustomFormButton
                title="Validar carreteiro"
                selectColor="secondary"
                onPress={() => handleValidToken()}
              >
                <Truck style={{ marginRight: 10 }} />
              </CustomFormButton>
            </View>
          </CustomScrollView>
        </Form>
      </FormKeyboardAvoidingView>
      <ValidAuthenticationModal
        {...{
          isOpen,
          modalType,
          openModal: () => setModal({ isOpen: false, modalType: 0 }),
          messages: validLoginMessages,
          setLoading: () => null,
          handleNavigate: () => handleValidToken(),
          buttonName: ['Corrigir', 'Prosseguir'],
        }}
      />
    </Container>
  );
};
