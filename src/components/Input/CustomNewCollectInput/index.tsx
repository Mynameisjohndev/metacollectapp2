import React from 'react';
import { TextInputProps } from 'react-native';

import {
  ContainerNewCollectInput,
  ContentNewCollectInput,
  CustonTextInput,
} from './styles';

export const CustomNewCollectInput = ({ ...rest }: TextInputProps) => {
  return (
    <ContainerNewCollectInput>
      <ContentNewCollectInput>
        <CustonTextInput {...rest} />
      </ContentNewCollectInput>
    </ContainerNewCollectInput>
  );
};
