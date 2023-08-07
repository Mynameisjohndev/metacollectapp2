import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../config';

export const CustomSettingOptionItemContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  padding: 16px;
  /* border-bottom-width: 0.28px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SECONDARY}; */
`;

export const CustomSettingOptionItemTank = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* width: 10%; */
`;

export const CustomSettingOptionItemText = styled.Text`
  color: ${({ theme }) => theme.COLORS.SECONDARY};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)};
  margin-left: 6px;
`;
