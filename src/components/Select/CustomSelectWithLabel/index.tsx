import React, { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  ContainerCustomSelectWithLabel,
  ContentCustomSelectWithLabel,
  CustomContentIcon,
  CustomText,
  CustomLabel,
} from './styles';

type ICustomSelectWithLabelOption = TouchableOpacityProps & {
  label: string;
  title: string;
  iconSelect: ReactNode;
};
export const CustomSelectWithLabel = ({
  label,
  title,
  iconSelect,
  ...rest
}: ICustomSelectWithLabelOption) => {
  return (
    <ContainerCustomSelectWithLabel>
      <CustomLabel>{label}</CustomLabel>
      <ContentCustomSelectWithLabel {...rest}>
        <CustomText>{title}</CustomText>
        <CustomContentIcon>{iconSelect}</CustomContentIcon>
      </ContentCustomSelectWithLabel>
    </ContainerCustomSelectWithLabel>
  );
};
