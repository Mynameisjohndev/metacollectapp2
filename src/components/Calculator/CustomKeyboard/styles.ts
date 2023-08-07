import styled from 'styled-components/native';

import { APP_FONT_SEMI_BOLD, returnAdjustedFont } from '../../../config';

export const ContentKeyboardCustomCalculator = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.INPUT};
  text-align: center;
  width: 100px;
  height: 90px;
  border-radius: 10px;
`;
export const KeyboardTextCustomCalculator = styled.Text`
  font-size: ${returnAdjustedFont(30)};
  font-family: ${APP_FONT_SEMI_BOLD};
`;
