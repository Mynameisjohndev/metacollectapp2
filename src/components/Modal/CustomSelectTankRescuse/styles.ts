import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { APP_FONT_REGULAR } from '../../../config';
import { Vehicle } from '../../../types/vehicle';

const { height } = Dimensions.get('window');

export const ContainerModal = styled.Modal``;

export const OverlayModal = styled.Pressable`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const ContentModal = styled.Pressable`
  width: 100%;
  height: 100%;
  /* elevation: 10; */
  /* height: ${height * 0.6}px; */
  /* border-top-left-radius: 15px;
  border-top-right-radius: 15px; */
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

export const ContentHeaderListOption = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListOptions = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontallScrollIndicator: false,
})<Vehicle>`
  margin-top: 16px;
  width: 100%;
`;

export const Option = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 0;
  margin-bottom: 6px;
  border-bottom-width: 0.5px;
  border-color: ${({ theme }) => theme.COLORS.GREY50};
`;

export const OtionName = styled.Text`
  font-family: ${APP_FONT_REGULAR};
`;
