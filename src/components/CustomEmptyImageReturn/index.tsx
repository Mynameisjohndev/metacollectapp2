import { ReactNode } from 'react';

import {
  ContainerCustomEmptyImageReturn,
  ContainerCustomEmptyImageReturnRow,
  ContentCustomEmptyImageReturn,
  CustomContentIcon,
  CustomLabel,
} from './styles';

interface ICustomEmptyImageReturn {
  label: string;
  iconSelect?: ReactNode;
}

export const CustomEmptyImageReturn = ({
  label,
  iconSelect,
}: ICustomEmptyImageReturn) => {
  return (
    <ContainerCustomEmptyImageReturn>
      <CustomLabel>{label}</CustomLabel>
      <ContainerCustomEmptyImageReturnRow>
        <ContentCustomEmptyImageReturn>
          <CustomContentIcon>{iconSelect}</CustomContentIcon>
        </ContentCustomEmptyImageReturn>
      </ContainerCustomEmptyImageReturnRow>
    </ContainerCustomEmptyImageReturn>
  );
};
