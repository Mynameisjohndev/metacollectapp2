import styled from 'styled-components/native';

import { APP_FONT_SEMI_BOLD, returnAdjustedFont } from '../../config';

export const ContainerCustomScreenHeader = styled.Text`
  font-family: ${APP_FONT_SEMI_BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${returnAdjustedFont(18)};
  width: 90%;
  align-self: flex-start;
`;
