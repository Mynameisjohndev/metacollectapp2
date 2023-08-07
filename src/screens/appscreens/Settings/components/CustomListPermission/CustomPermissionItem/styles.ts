import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../../../../../config';

const CustomPermissionItemContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  padding: 16px;
`;

const CustomPermissionItemRow = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const CustomPermissionItemText = styled.Text`
  color: ${({ theme }) => theme.COLORS.SECONDARY};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)};
  margin-left: 6px;
`;

export {
  CustomPermissionItemContainer,
  CustomPermissionItemRow,
  CustomPermissionItemText,
};
