import styled from 'styled-components/native';

import { APP_FONT_REGULAR, APP_FONT_SEMI_BOLD } from '../../config';

export const ContainerTankListItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
  width: 100%;
  max-height: 180px;
  min-height: 90px;
  padding: 12px 15px;
  border-radius: 10px;
  margin-bottom: 5px;
`;
export const ContentTankListItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const AlignTankList = styled.View`
  padding-left: 10px;
`;
export const CustomOptionText = styled.Text`
  font-family: ${APP_FONT_SEMI_BOLD};
  width: 95%;
`;

export const ContainerCustomTankItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const CustomOptionTextCode = styled.Text`
  font-family: ${APP_FONT_REGULAR};
  padding: 0px 26px 0px 6px;
`;
