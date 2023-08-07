import styled from 'styled-components/native';

import { APP_FONT_REGULAR } from '../../config';

export const ContainerCutomSearch = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  width: 100%;
  height: 56px;
  margin: 10px 0px 6px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
`;

export const ContainerCutomTextInput = styled.TextInput`
  width: 95%;
  height: 100%;
  font-family: ${APP_FONT_REGULAR};
`;
