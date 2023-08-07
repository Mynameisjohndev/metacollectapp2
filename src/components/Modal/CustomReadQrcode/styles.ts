import styled from 'styled-components/native';

const CustomReadQrcodeModal = styled.Modal.attrs({
  transparent: true,
  animationType: 'slide',
  // statusBarTranslucent: true,
})``;

const CustomReadQrcodeContainer = styled.View`
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const CustomReadQrcodeError = styled.View`
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const CustomReadQrcodeFormat = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  /* justify-content: center;
  align-items: center; */
`;

const CustomReadQrcodeLightButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 50px 16px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

export {
  CustomReadQrcodeModal,
  CustomReadQrcodeContainer,
  CustomReadQrcodeFormat,
  CustomReadQrcodeError,
  CustomReadQrcodeLightButton,
};
