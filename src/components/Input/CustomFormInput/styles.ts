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
  padding: 20px;
  align-items: flex-start;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const CustonTextInput = styled.TextInput`
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(14)};
  margin-left: 5%;
  width: 80%;
  height: 100%;
`;
