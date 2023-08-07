import { transparentize } from 'polished';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const CustomOpenImageContainer = styled.Modal.attrs({
  transparent: true,
  animationType: 'fade',
})``;

const CustomOpenImageOverlay = styled.Pressable`
  background-color: ${transparentize(0.4, '#000')};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CustomOpenImageContent = styled.Pressable`
  width: ${width * 0.9}px;
  min-height: 400px;
  max-height: 550px;
  border-radius: 15px;
  padding: 10px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  justify-content: space-between;
  align-items: center;
`;

const CustomOpenSelectedImage = styled.Image`
  width: 100%;
  height: 94%;
`;

const CustomOpenCloseModal = styled.TouchableOpacity`
  height: 5%;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
`;

export {
  CustomOpenImageContainer,
  CustomOpenImageOverlay,
  CustomOpenImageContent,
  CustomOpenSelectedImage,
  CustomOpenCloseModal,
};
