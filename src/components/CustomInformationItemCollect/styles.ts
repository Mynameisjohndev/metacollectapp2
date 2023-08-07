import styled from 'styled-components/native';

export const CustomContainerInformationCollectItem = styled.SafeAreaView`
  width: 100%;
  margin-bottom: 20px;
`;
export const CustomContentInformationCollectItem = styled.View`
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  align-items: flex-start;
  justify-content: center;
`;
