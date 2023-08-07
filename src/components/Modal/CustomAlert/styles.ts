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

export const ContentModal = styled.Pressable`
  width: ${width * 0.8}px;
  min-height: 250px;
  border-radius: 15px;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  justify-content: space-between;
  align-items: center;
`;

export const BodyModal = styled.Text`
  margin-top: 20px;
  font-size: ${returnAdjustedFont(22)};
  font-family: ${APP_FONT_REGULAR};
  text-align: center;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const CloseButtonModal = styled.View`
  height: 20px;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
`;

export const ContainerButtonModal = styled.TouchableOpacity`
  margin-top: 20px;
  height: 60px;
  width: 100%;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const TextButtonModal = styled.Text`
  font-size: ${returnAdjustedFont(16)};
  font-family: ${APP_FONT_REGULAR};
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
