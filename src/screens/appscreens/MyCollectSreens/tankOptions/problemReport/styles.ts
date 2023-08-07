import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../../../../config';

export const ConatinerProblemReport = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;
export const CutomText = styled.Text`
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)}; ;
`;
export const CutomProblemReport = styled.View`
  display: flex;
  width: 100%;
  height: 140px;
  margin: 6px 0px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
`;

export const CutomTextInput = styled.TextInput.attrs({
  textAlignVertical: 'top',
})`
  padding: 6px;
  width: 100%;
  height: 160px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
  font-family: ${APP_FONT_REGULAR};
`;
