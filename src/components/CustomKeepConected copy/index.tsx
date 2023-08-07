import React from 'react';

import { CustomSwitch, ICustomSwitchProps } from '../CustomSwitch';
import { ContainerKeepConected, TextKeepConected } from './styles';

export const CustomKeepConected = ({
  onChangeState,
  value,
}: ICustomSwitchProps) => (
  <ContainerKeepConected>
    <TextKeepConected>Manter-me conectado</TextKeepConected>
    <CustomSwitch onChangeState={onChangeState} value={value} />
  </ContainerKeepConected>
);
