import React, { FC } from 'react';

import { CustomSwitch } from '../../../../../../components/CustomSwitch';
import themes from '../../../../../../themes';
import {
  returnAppIcons,
  returnPermissionIcons,
  returnTimeLineIcons,
} from '../../../../../../utils/returnAppIcons';
import { IPermissionApp } from '../../../options';
import {
  CustomPermissionItemContainer,
  CustomPermissionItemRow,
  CustomPermissionItemText,
} from './styles';

interface ICustomPermissionItem {
  permission: IPermissionApp;
  isActive: string;
}

const CustomPermissionItem: FC<ICustomPermissionItem> = ({
  permission,
  isActive,
}) => {
  const { id, name } = permission;

  const returnIsActive = (isActive: string) => {
    return (
      <CustomSwitch
        {...{
          onChangeState: () => null,
          value: isActive === 'granted',
          disabled: true,
        }}
      />
    );
  };

  return (
    <CustomPermissionItemContainer>
      <CustomPermissionItemRow>
        {returnPermissionIcons({ type: id })}
        <CustomPermissionItemText>{name}</CustomPermissionItemText>
      </CustomPermissionItemRow>
      {returnIsActive(isActive)}
    </CustomPermissionItemContainer>
  );
};

export { CustomPermissionItem };
