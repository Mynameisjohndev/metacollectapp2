import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../config';

const { width } = Dimensions.get('window');

export const ContainerCustomEmptyImageReturn = styled.View`
  width: 100%;
`;
export const ContainerCustomEmptyImageReturnRow = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ContentCustomEmptyImageReturn = styled.TouchableOpacity`
  width: 90px;
  height: 90px;
  border-radius: 6px;
  margin-right: 6px;
  margin-bottom: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
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
  font-family: ${APP_FONT_REGULAR};
  color: ${({ theme }) => theme.COLORS.GREY};
  font-weight: bold;
  font-size: ${returnAdjustedFont(16)};
  margin-bottom: 6px;
`;
export const ContainerRemoveImage = styled.TouchableOpacity`
  position: absolute;
  right: 0;
`;
