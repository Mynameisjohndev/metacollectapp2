import styled from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../config';

export const CustomHistoricProducerContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GREY10};
  width: 100%;
  justify-content: center;
  max-height: 240px;
  margin: 10px 0px;
  padding: 10px;
  border-radius: 10px;
`;
export const CustomHistoricProducerTitle = styled.Text`
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(18)};
  font-weight: 700;
`;

export const CustomHistoricProducerRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CustomHistoricProducerContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 6px 0;
  padding-right: 26px;
`;

export const CustomHistoricProducerText = styled.Text`
  font-family: ${APP_FONT_REGULAR};
  align-items: center;
  color: ${({ theme }) => theme.COLORS.BLACK};
  font-weight: bold;
  padding-left: 4px;
  font-size: ${returnAdjustedFont(14)};
`;
