import styled, { css } from 'styled-components/native';

import {
  APP_FONT_REGULAR,
  APP_FONT_SEMI_BOLD,
  returnAdjustedFont,
} from '../../config';

interface ITipoItemColetado {
  type: string;
}
export const CustomTankListItemContainer = styled.TouchableOpacity<ITipoItemColetado>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 90px;
  padding: 12px 15px;
  border-radius: 10px;
  margin-bottom: 5px;

  ${({ type }) =>
    type === 'N'
      ? css`
          background-color: ${({ theme }) => `${theme.COLORS.ORANGE}50`};
        `
      : type === 'NN'
      ? css`
          background-color: ${({ theme }) => `${theme.COLORS.YELLOW}50`};
        `
      : type === 'S'
      ? css`
          background-color: ${({ theme }) => `${theme.COLORS.RED}50`};
        `
      : css`
          background-color: ${({ theme }) => `${theme.COLORS.SECONDARY}50`};
        `}
`;
export const CustomTankListItemHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AlignTankList = styled.View`
  max-width: 80%;
  padding-left: 10px;
`;

export const CustomTankItemRow = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 4px;
`;

export const TankListTitle = styled.Text`
  font-family: ${APP_FONT_SEMI_BOLD};
  font-size: ${returnAdjustedFont(14)};
`;
export const TankListSubTitle = styled.Text`
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(14)};
`;
export const CustomOptionTextCode = styled.Text`
  font-size: ${returnAdjustedFont(14)};
  font-family: ${APP_FONT_REGULAR};
  padding: 0px 26px 0px 6px;
`;
