import { darken, transparentize } from 'polished';
import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../config';

export const CustomContainerDontExistItem = styled.View`
  background-color: ${({ theme }) => transparentize(0.75, theme.COLORS.RED)};
  width: 100%;
  min-height: 100px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px 20px;
`;

export const CustomDontExistItemText = styled.Text`
  font-family: ${APP_FONT_REGULAR};
  color: ${({ theme }) => darken(0.18, theme.COLORS.RED)};
  font-weight: bold;
  font-size: ${returnAdjustedFont(16)};
  margin-left: 16px;
  width: 85%;
`;
