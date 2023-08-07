import React, { Dispatch, SetStateAction } from 'react';
import { Switch } from 'react-native';

import themes from '../../themes';

export interface ICustomSwitchProps {
  value: boolean;
  onChangeState: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
}

export const CustomSwitch = ({
  onChangeState,
  value,
  disabled,
}: ICustomSwitchProps) => (
  <Switch
    onChange={() => onChangeState(!value)}
    value={value}
    thumbColor={value ? themes.COLORS.PRIMARY : '#7c7c7c'}
    trackColor={{ true: themes.COLORS.SECONDARY, false: '#CECECE' }}
    disabled={disabled}
  />
);
