import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../config';

const { width } = Dimensions.get('window');

export const ContainerCustomSelectImage = styled.View`
  width: 100%;
`;
export const ContainerCustomSelectImageRow = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ContentCustomSelectImage = styled.TouchableOpacity`
  width: 90px;
  height: 90px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
`;

export const CustomContainerSelectedImage = styled.TouchableOpacity`
  width: 99px;
  height: 105px;
  justify-content: center;
  align-items: center;
`;

export const ContentCustomSelectedImage = styled.Image`
  border-radius: 6px;
  margin-right: 6px;
`;

export const CustomContentIcon = styled.View`
  width: ${width * 0.1}px;
  align-items: center;
  justify-content: center;
`;

export const CustomLabel = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)};
  margin-bottom: 6px;
`;
export const ContainerRemoveImage = styled.TouchableOpacity`
  position: absolute;
  border-radius: 10px;
  right: 0;
  top: 0;
`;
