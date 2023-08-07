import styled from 'styled-components/native';

export const CustomSettingsScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontallScrollIndicator: false,
})`
  width: 100%;
  flex-grow: 0;
`;
