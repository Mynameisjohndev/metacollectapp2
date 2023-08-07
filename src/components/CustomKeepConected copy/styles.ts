import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../config';

export const ContainerKeepConected = styled.View`
  height: 40px;
  margin: 10px 0;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;

export const TextKeepConected = styled.Text`
  font-size: ${returnAdjustedFont(16)};
  font-family: ${APP_FONT_REGULAR};
  padding-right: 10px;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
`;
