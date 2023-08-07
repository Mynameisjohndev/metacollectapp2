import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../config';

export const ContainerCustomImageReturnRow = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ContainerCustomImageReturn = styled.View`
  width: 100%;
`;

export const CustomLabel = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)};
  margin-bottom: 6px;
`;

export const ContentCustomImageReturn = styled.Image`
  border-radius: 6px;
  margin-right: 6px;
`;
