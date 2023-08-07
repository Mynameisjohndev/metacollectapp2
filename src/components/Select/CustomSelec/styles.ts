import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../../config';

export const ContainerCustomNewSelect = styled.TouchableOpacity`
  width: 100%;
  min-height: 65px;
  margin: 6px 0px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  align-items: center;
  flex-direction: row;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
`;

export const CustomContainerIconNewCollect = styled.View`
  align-items: center;
  justify-content: center;
`;

export const CustomTextNewCollect = styled.Text`
  color: ${({ theme }) => theme.COLORS.GREY};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)};
  max-width: 95%;
`;
