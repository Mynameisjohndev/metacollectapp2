import Mask from 'react-native-mask-input';
import styled from 'styled-components/native';

import {
  APP_FONT_REGULAR,
  INPUT_BORDER_RADIUS,
  returnAdjustedFont,
} from '../../../config';

export const ContainerInput = styled.View`
  width: 100%;
  height: 65px;
  border-radius: ${INPUT_BORDER_RADIUS}px;
  margin: 5px 0px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
`;

export const CustonTextInput = styled(Mask)`
  margin-left: 4%;
  width: 100%;
  height: 100%;
  font-family: ${APP_FONT_REGULAR};
`;

export const CustomLabel = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)}; ;
`;
