import { transparentize } from 'polished';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import {
  APP_FONT_REGULAR,
  APP_FONT_SEMI_BOLD,
  returnAdjustedFont,
} from '../../../config';

const { width } = Dimensions.get('window');

export const ContainerModal = styled.Modal``;

export const OverlayModal = styled.Pressable`
  background-color: ${transparentize(0.4, '#000')};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ContentModal = styled.Pressable`
  width: ${width * 0.8}px;
  min-height: 250px;
  border-radius: 15px;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  justify-content: space-between;
  align-items: center;
`;
export const CustomInput = styled.TextInput`
  margin-top: 10px;
  height: 60px;
  padding: 0px 6px;
  font-size: ${returnAdjustedFont(14)};
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.COLORS.INPUT};
`;

export const BodyModal = styled.Text`
  width: 100%;
  margin-top: 10px;
  font-size: ${returnAdjustedFont(12)};
  font-family: ${APP_FONT_REGULAR};
  color: ${({ theme }) => theme.COLORS.RED};
`;

export const CloseButtonModal = styled.View`
  height: 20px;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
`;
export const ContainerView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
export const ContainerButtonModal = styled.TouchableOpacity`
  margin-top: 20px;
  height: 60px;
  width: 48%;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  padding-left: 2px;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const TextButtonModal = styled.Text`
  font-size: ${returnAdjustedFont(16)};
  font-family: ${APP_FONT_SEMI_BOLD};
  text-align: center;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ModalLabel = styled.Text`
  font-size: ${returnAdjustedFont(18)};
  font-family: ${APP_FONT_SEMI_BOLD};
  text-align: left;
  align-self: flex-start;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
`;
