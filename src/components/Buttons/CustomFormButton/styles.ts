import { transparentize } from 'polished';
import { ReactNode } from 'react';
import {
  RectButton,
  GestureHandlerRootView,
  NativeViewGestureHandler,
  RectButtonProps,
  RectButtonProperties,
} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {
  APP_FONT_SEMI_BOLD,
  BUTTON_BORDER_RADIUS,
  returnAdjustedFont,
} from '../../../config';

interface ICustonButtonContainer {
  selectColor?: 'primary' | 'secondary';
  children: ReactNode;
}

type ICustonTitle = {
  hasIcon: boolean;
};

export const ContainerButton = styled(GestureHandlerRootView)`
  width: 100%;
  min-height: 65px;
  margin: 6px 0px;
`;
export const ContentButton = styled(RectButton)<ICustonButtonContainer>`
  width: 100%;
  min-height: 65px;
  padding: 6px;
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
  text-align: center;
  font-size: ${returnAdjustedFont(18)};
  font-family: ${APP_FONT_SEMI_BOLD};
`;
export const CustonChildrenContent = styled.View`
  margin-right: 6px;
`;
