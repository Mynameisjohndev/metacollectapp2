import { transparentize } from 'polished';
import { Platform, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { APP_FONT_SEMI_BOLD, returnAdjustedFont } from '../../config';

export const { width, height } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  padding: 20px 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => transparentize(0.9, theme.COLORS.PRIMARY)};
`;

export const Content = styled.View`
  border-radius: 10px;
  width: 100%;
  max-height: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: flex-start;
  justify-content: center;
`;

export const CustomScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontallScrollIndicator: false,
})`
  width: 100%;
  flex-grow: 0;
`;

export const Center = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-size: ${returnAdjustedFont(18)};
  font-family: ${APP_FONT_SEMI_BOLD};
`;

export const FormKeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'android' ? 'height' : 'padding',
})``;

export const CustomTouchableOpacity = styled.TouchableOpacity``;
