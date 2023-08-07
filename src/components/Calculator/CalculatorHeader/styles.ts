import styled from 'styled-components/native';

import {
  APP_FONT_REGULAR,
  APP_FONT_SEMI_BOLD,
  returnAdjustedFont,
} from '../../../config';

export const ContainerCalculatorHeader = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
  align-items: center;
  margin: 10px 0px 18px;
  border-radius: 10px;
`;
export const ViewCalculatorHeader = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  width: 25%;
  height: 86px;
  border-radius: 10px;
`;
export const TextCalculatorHeader = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${returnAdjustedFont(30)};
  font-family: ${APP_FONT_SEMI_BOLD};
`;

export const TextInputCalculatorHeader = styled.Text`
  font-family: ${APP_FONT_REGULAR};
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: ${returnAdjustedFont(26)};
`;
