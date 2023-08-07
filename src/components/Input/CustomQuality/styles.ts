import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { APP_FONT_REGULAR, INPUT_BORDER_RADIUS } from '../../../config';

export const ContainerNewCollectInput = styled(GestureHandlerRootView)`
  width: 100%;
  height: 65px;
  margin: 5px 0px;
`;

export const ContentNewCollectInput = styled.View`
  padding-left: 2px;
  height: 100%;
  border-radius: ${INPUT_BORDER_RADIUS}px;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const CustonTextInput = styled.TextInput`
  font-family: ${APP_FONT_REGULAR};
  margin-left: 5%;
  width: 80%;
  height: 100%;
`;
