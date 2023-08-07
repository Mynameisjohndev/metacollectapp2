import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { APP_FONT_REGULAR } from '../../../config';

export const ContainerNewCollectInput = styled(GestureHandlerRootView)`
  width: 100%;
  height: 65px;
  margin: 5px 0px;
`;

export const ContentNewCollectInput = styled.View`
  padding: 16px;
  height: 100%;
  border-radius: 6px;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
  color: ${({ theme }) => theme.COLORS.GREY};
`;

export const CustonTextInput = styled.TextInput`
  font-family: ${APP_FONT_REGULAR};
  width: 80%;
  height: 100%;
`;
