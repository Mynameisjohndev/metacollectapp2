import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../config';

export const CustomConectedWagonerContainer = styled(GestureHandlerRootView)`
  width: 100%;
  margin: 5px 0px;
`;

export const CustomConectedWagonerContent = styled.View`
  width: 100%;
  min-height: 65px;
  border-radius: 6px;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
`;

export const CustomConectedWagonerText = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)};
  padding-left: 8px;
  width: 90%;
`;
