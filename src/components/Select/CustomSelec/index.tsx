import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  ContainerCustomNewSelect,
  CustomContainerIconNewCollect,
  CustomTextNewCollect,
} from './styles';

type ICustomSelectOption = TouchableOpacityProps & {
  title: string;
  iconSelect: ReactNode;
};
export const CustomSelect = ({
  title,
  iconSelect,
  ...rest
}: ICustomSelectOption) => {
  return (
    <ContainerCustomNewSelect {...rest}>
      <CustomTextNewCollect>{title}</CustomTextNewCollect>
      <CustomContainerIconNewCollect>
        {iconSelect}
      </CustomContainerIconNewCollect>
    </ContainerCustomNewSelect>
  );
};
