import styled, { css } from 'styled-components/native';

import {
  APP_FONT_REGULAR,
  APP_FONT_SEMI_BOLD,
  returnAdjustedFont,
} from '../../../config';

interface IContainerProps {
  isPrimary: boolean;
}

export const CustomItemTitle = styled.Text<IContainerProps>`
  margin-right: 4px;
  ${({ isPrimary }) =>
    isPrimary === true
      ? css`
          color: ${({ theme }) => theme.COLORS.PRIMARY};
          font-family: ${APP_FONT_REGULAR};
          font-size: ${returnAdjustedFont(16)};
        `
      : css`
          color: ${({ theme }) => theme.COLORS.GREY};
          font-family: ${APP_FONT_REGULAR};
          font-size: ${returnAdjustedFont(14)};
        `}
`;
