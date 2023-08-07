import { transparentize } from 'polished';
import styled from 'styled-components/native';

interface ICustomTimeLineItem {
  color: string;
}

const circle = 45;

export const CustomTimeLineContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContente: 'center',
  },
})`
  margin-top: 16px;
  width: 100%;
  height: ${circle}px;
`;

export const CustomTimeLineItemContainer = styled.View`
  height: ${circle}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CustomTimeLineItem = styled.View<ICustomTimeLineItem>`
  width: ${circle}px;
  height: ${circle}px;
  background-color: ${({ color }) => color};
  border-radius: ${circle / 2}px;
  justify-content: center;
  align-items: center;
`;

export const CustomTimeLineSeparator = styled.View`
  background-color: ${({ theme }) => transparentize(0.8, theme.COLORS.GREY)};
  width: 16px;
  height: 6px;
`;
