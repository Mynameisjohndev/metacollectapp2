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

export const ContentCustomStorageInformation = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 22px;
`;

export const CustomStorageInformationIcon = styled.View`
  align-items: center;
`;

export const CustomStorageInformationText = styled.Text<IContainerProps>`
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-size: ${returnAdjustedFont(16)};
  margin-left: 8px;

  ${({ isPrimary }) =>
    isPrimary === true
      ? css`
          color: ${({ theme }) => theme.COLORS.PRIMARY};
          font-family: ${APP_FONT_SEMI_BOLD};
        `
      : css`
          font-family: ${APP_FONT_REGULAR};
          color: ${({ theme }) => theme.COLORS.BLACK};
        `}
`;

export const CustomStorageInformationLine = styled.View<IContainerProps>`
  text-align: center;
  background-color: ${({ theme }) => theme.COLORS.GREY50};
  height: 1px;
  margin: 0px 30px;

  ${({ isLine }) =>
    isLine === true
      ? css`
          height: 1px;
        `
      : css`
          height: 0;
        `}
`;
