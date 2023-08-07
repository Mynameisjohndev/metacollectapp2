import React, { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { ContainerButton, CustonButtonTitle, ContentButton } from './styles';

type ICustomHalfButtonProps = RectButtonProps & {
  title: string;
  selectColor: 'primary' | 'secondary';
  children?: ReactNode;
  loading?: boolean;
};

export const CustomHalfButton = ({
  title,
  selectColor,
  children,
  loading,
  ...rest
}: ICustomHalfButtonProps) => {
  return (
    <ContainerButton>
      <ContentButton selectColor={selectColor} {...rest}>
        {children}
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <CustonButtonTitle hasIcon={!!children}>{title}</CustonButtonTitle>
        )}
      </ContentButton>
    </ContainerButton>
  );
};
