/* eslint-disable no-nested-ternary */
import { transparentize } from 'polished';
import { ReactNode } from 'react';
import { Dimensions } from 'react-native';
import {
  RectButton,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {
  APP_FONT_REGULAR,
  APP_FONT_SEMI_BOLD,
  BUTTON_BORDER_RADIUS,
  returnAdjustedFont,
} from '../../../config';

const { width } = Dimensions.get('window');

type ICustomButtonOption = {
  selectColor?: 'primary' | 'secondary';
  children: ReactNode;
};

export const ContainerCustomButtonOption = styled(GestureHandlerRootView)`
  width: 100%;
  min-height: 65px;
  margin: 5px 0px;
`;

export const ContentCustomButtonOption = styled(
  RectButton,
)<ICustomButtonOption>`
  display: flex;
  min-height: 65px;
  justify-content: flex-start;
  padding: 6px 0 6px 6px;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme, selectColor, enabled }) =>
    enabled === false
      ? transparentize(0.7, theme.COLORS.PRIMARY)
      : selectColor === 'primary'
      ? transparentize(0.4, theme.COLORS.PRIMARY)
      : transparentize(0, theme.COLORS.PRIMARY)};
`;

export const CustomButtonOptionText = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${returnAdjustedFont(18)};
  font-family: ${APP_FONT_SEMI_BOLD};
  width: 85%;
`;

export const CustomContainerIcon = styled.View`
  width: 15%;
  align-items: center;
`;
