import styled from 'styled-components/native';

import {
  APP_FONT_SEMI_BOLD,
  APP_FONT_REGULAR,
  returnAdjustedFont,
} from '../../config';

export const ContainerCustomProducer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GREY10};
  max-width: 100%;
  /* align-items: center; */
  justify-content: center;
  min-height: 140px;
  max-height: 240px;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 10px;
`;
export const CustomCustomProducerTitle = styled.Text`
  font-size: ${returnAdjustedFont(14)};
  font-family: ${APP_FONT_SEMI_BOLD};
`;

export const ContentCustomProducerRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ContentCustomProducer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 6px 0;
  padding-right: 26px;
`;

export const CustomProducerText = styled.Text`
  align-items: center;
  color: ${({ theme }) => theme.COLORS.BLACK};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(14)};
  padding-left: 4px;
`;

export const CustomProducerButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  width: 150px;
  height: 45px;
  margin-top: 6px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
`;
export const CustonButtonTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${APP_FONT_SEMI_BOLD};
  font-size: ${returnAdjustedFont(14)};
`;
