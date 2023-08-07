import styled, { css } from 'styled-components/native';

import { APP_FONT_REGULAR, returnAdjustedFont } from '../../config';

interface IContainerProps {
  isPrimary?: boolean;
}

export const CustomContentHistoryCard = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin: 10px 0px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.GREY10};
`;
export const ContentCustomHistoryCardCollum = styled.View`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 0px 6px 0px 6px;
`;
export const ContentCustomHistoryCardRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 2px 0px;
`;
export const CustomHistoryCardText = styled.Text<IContainerProps>`
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-family: ${APP_FONT_REGULAR};
  font-size: ${returnAdjustedFont(16)};
  padding-right: 6px;
  ${({ isPrimary }) =>
    isPrimary === true
      ? css`
          color: ${({ theme }) => theme.COLORS.PRIMARY};
        `
      : css`
          color: ${({ theme }) => theme.COLORS.BLACK};
        `};
`;

export const CustomHistoryCardArrow = styled.TouchableOpacity`
  align-items: center;
`;
