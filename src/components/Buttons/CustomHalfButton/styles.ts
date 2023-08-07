import { transparentize } from 'polished';
import { ReactNode } from 'react';
import {
  RectButton,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {
  APP_FONT_REGULAR,
  BUTTON_BORDER_RADIUS,
  returnAdjustedFont,
} from '../../../config';

type ICustonButtonContainer = {
  selectColor?: 'primary' | 'secondary';
  children: ReactNode;
};

type ICustonTitle = {
  hasIcon: boolean;
};

export const ContainerButton = styled(GestureHandlerRootView)`
  width: 47%;
  height: 65px;
`;

export const ContentButton = styled(RectButton)<ICustonButtonContainer>`
  width: 100%;
  height: 100%;
  border-radius: ${BUTTON_BORDER_RADIUS}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ theme, selectColor }) =>
    selectColor === 'primary'
      ? transparentize(0, theme.COLORS.PRIMARY)
      : transparentize(0.4, theme.COLORS.PRIMARY)};
`;

export const CustonButtonTitle = styled.Text<ICustonTitle>`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${APP_FONT_REGULAR};
  font-weight: bold;
  font-size: ${returnAdjustedFont(16)};
  margin-left: ${({ hasIcon }) => (hasIcon ? 10 : 0)}px;
`;
