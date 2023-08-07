import React, { ReactNode } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { BUTTON_BORDER_RADIUS } from '../../../config';
import {
  ContainerCustomButtonOption,
  ContentCustomButtonOption,
  CustomButtonOptionText,
  CustomContainerIcon,
} from './styles';

type ICustomButtonOptionProps = RectButtonProps & {
  title: string;
  selectColor?: 'primary' | 'secondary';
  iconButton?: ReactNode;
};

export const CustomButtonOption = ({
  title,
  selectColor,
  iconButton,
  ...rest
}: ICustomButtonOptionProps) => {
  return (
    <ContainerCustomButtonOption>
      <ContentCustomButtonOption
        style={{
          borderRadius: BUTTON_BORDER_RADIUS,
        }}
        selectColor={selectColor}
        {...rest}
      >
        <CustomContainerIcon>{iconButton}</CustomContainerIcon>
        <CustomButtonOptionText>{title}</CustomButtonOptionText>
      </ContentCustomButtonOption>
    </ContainerCustomButtonOption>
  );
};
