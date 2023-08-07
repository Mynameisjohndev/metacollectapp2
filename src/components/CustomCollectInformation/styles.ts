import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {
  APP_FONT_REGULAR,
  APP_FONT_SEMI_BOLD,
  returnAdjustedFont,
} from '../../config';

export const ContainerCustomInformation = styled(GestureHandlerRootView)`
  width: 100%;
  min-height: 100px;
  /* max-height: 120px; */
  margin: 20px 0px;
`;

export const ContentCustomInformationCollect = styled.View`
  display: flex;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
  padding: 20px;
  border-radius: 10px;
`;

export const CustomProfile = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 95%;
`;

export const CustomOptionText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-size: ${returnAdjustedFont(16)};
  margin-left: 8px;
  font-family: ${APP_FONT_REGULAR};
`;
