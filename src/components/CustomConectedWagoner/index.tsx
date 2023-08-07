import React, { ReactNode } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  CustomConectedWagonerContainer,
  CustomConectedWagonerContent,
  CustomConectedWagonerText,
} from './styles';

type ICustomConectedWagoner = RectButtonProps & {
  name: string;
  iconUser: ReactNode;
};

export const CustomConectedWagoner = ({
  name,
  iconUser,
}: ICustomConectedWagoner) => {
  return (
    <CustomConectedWagonerContainer>
      <CustomConectedWagonerContent>
        {iconUser}
        <CustomConectedWagonerText>{name}</CustomConectedWagonerText>
      </CustomConectedWagonerContent>
    </CustomConectedWagonerContainer>
  );
};
