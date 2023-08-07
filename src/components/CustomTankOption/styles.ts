import styled, { css } from 'styled-components/native';

import { APP_FONT_REGULAR } from '../../config';

export const ContainerCustomTankOption = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.INPUT};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 130px;
  padding: 0px 20px;
  margin: 12px 6px 0px;
  border-radius: 10px;
`;
export const TextCustomTankOption = styled.Text`
  text-align: center;
  font-family: ${APP_FONT_REGULAR};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  padding-top: 10px;
`;
