import styled from 'styled-components/native';

import {
  APP_FONT_REGULAR,
  INPUT_BORDER_RADIUS,
  returnAdjustedFont,
} from '../../../config';

export const Container = styled.View`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const CustomLabel = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)};
  padding-left: 4px;
  margin-top: 16px;
`;

export const ContainerInput = styled.View`
  width: 100%;
  border-radius: ${INPUT_BORDER_RADIUS}px;
  margin: 5px 0px;
  padding: 22px 0px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
`;

export const CustonText = styled.Text`
  font-family: ${APP_FONT_REGULAR};
  margin-left: 5%;
  width: 80%;
  height: 100%;
`;
