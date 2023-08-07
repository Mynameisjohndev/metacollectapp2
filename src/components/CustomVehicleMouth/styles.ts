import styled, { css } from 'styled-components/native';

import {
  APP_FONT_REGULAR,
  APP_FONT_SEMI_BOLD,
  returnAdjustedFont,
} from '../../config';

interface IContainerProps {
  isPrimary?: boolean;
  isLine?: boolean;
}

export const ContainerCustomVehicleMouth = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GREY10};
  width: 100%;
  margin: 10px 0px;
  border-radius: 10px;
  justify-content: center;
`;

export const CustomVehicleMouthTitle = styled.Text`
  font-size: ${returnAdjustedFont(16)};
  font-family: ${APP_FONT_REGULAR};
  padding: 10px;
`;

export const CustomContentVehicleMouthRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px;
`;
export const ContentContentCustomVehicleMouthCollum = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65%;
`;
export const ContentCustomVehicleMouth = styled.View`
  display: flex;
  width: 90%;
  flex-direction: row;
  align-items: center;
  margin: 6px 0;
`;

export const CustomVehicleMouthcon = styled.View`
  align-items: center;
`;

export const CustomVehicleMouthText = styled.Text<IContainerProps>`
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-family: ${APP_FONT_REGULAR};
  padding-left: 4px;
  font-size: ${returnAdjustedFont(14)};

  ${({ isPrimary }) =>
    isPrimary === true
      ? css`
          color: ${({ theme }) => theme.COLORS.PRIMARY};
        `
      : css`
          color: ${({ theme }) => theme.COLORS.BLACK};
          font-size: ${returnAdjustedFont(16)};
        `}
`;

export const CustomVehicleMouthButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  width: 35%;
  min-height: 46px;
  padding: 0px 8px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
export const CustonButtonTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${APP_FONT_SEMI_BOLD};
  font-size: ${returnAdjustedFont(14)};
`;
