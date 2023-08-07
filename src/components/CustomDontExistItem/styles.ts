import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../config';

export const CustomContainerDontExistItem = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GREY10};
  width: 100%;
  height: 100px;
  border-radius: 10px;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
  justify-content: center;
`;

export const CustomDontExistItemText = styled.Text`
  font-family: ${APP_FONT_REGULAR};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-weight: bold;
  font-size: ${returnAdjustedFont(16)};
  text-align: center;
`;
