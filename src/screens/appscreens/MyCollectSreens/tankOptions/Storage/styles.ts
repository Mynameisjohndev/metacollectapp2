import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../../../../config';

export const ContainerStorage = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GREY10};
  width: 100%;
  margin: 20px 0px;
  border-radius: 10px;
`;
export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLACK};
  font-size: ${returnAdjustedFont(16)};
  font-family: ${APP_FONT_REGULAR};
`;
