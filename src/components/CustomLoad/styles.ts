import styled from 'styled-components/native';

import { APP_FONT_REGULAR } from '../../config';

export const CustomLoadContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
export const CustomLoadText = styled.Text`
  font-family: ${APP_FONT_REGULAR};
  color: ${({ theme }) => theme.COLORS.BLACK};
`;
