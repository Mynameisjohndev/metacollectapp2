import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../../config';

const { width } = Dimensions.get('window');

export const ContainerCustomSelectWithLabel = styled.View`
  width: 100%;
  margin: 5px 0;
`;
export const ContentCustomSelectWithLabel = styled.TouchableOpacity`
  width: 100%;
  height: 65px;
  margin: 5px 0px;
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
`;

export const CustomContentIcon = styled.View`
  width: ${width * 0.1}px;
  align-items: center;
  justify-content: center;
`;

export const CustomLabel = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)}; ;
`;
export const CustomText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)};
  margin-left: 14px;
`;
