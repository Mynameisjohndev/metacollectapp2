import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Permission from 'react-native-permissions';

import { IPermissionApp } from '../../options';
import { CustomPermissionItem } from './CustomPermissionItem';
import { CustomListPermissionContainer } from './styles';

interface ICustomListPermission {
  data: IPermissionApp[];
}

const CustomListPermission: FC<ICustomListPermission> = ({ data }) => {
  const [storage, setStorage] = useState<string>('');
  const [camera, seCamera] = useState<string>('');
  const [local, setLocal] = useState<string>('');
  const [device, setDevice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const getAllAppPermission = async () => {
    const responseStorage = await Permission.check(
      'android.permission.READ_EXTERNAL_STORAGE',
    );
    setStorage(responseStorage);
    const cameraStorage = await Permission.check('android.permission.CAMERA');
    seCamera(cameraStorage);
    const localStorage = await Permission.check(
      'android.permission.ACCESS_FINE_LOCATION',
    );
    setLocal(localStorage);
    const deviceStorage = await Permission.check(
      'android.permission.READ_PHONE_STATE',
    );
    setDevice(deviceStorage);
    setLoading(false);
  };

  useEffect(() => {
    getAllAppPermission();
  }, []);

  const Item = (permission: IPermissionApp) => {
    const { id } = permission;
    switch (id) {
      case 1:
        return <CustomPermissionItem {...{ permission, isActive: storage }} />;
      case 2:
        return <CustomPermissionItem {...{ permission, isActive: camera }} />;
      case 3:
        return <CustomPermissionItem {...{ permission, isActive: local }} />;
      case 4:
        return <CustomPermissionItem {...{ permission, isActive: device }} />;
      default:
        return <></>;
    }
  };

  return (
    <CustomListPermissionContainer>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {data.map((option, key) => (
            <Item {...option} key={key} />
          ))}
        </>
      )}
    </CustomListPermissionContainer>
  );
};

export { CustomListPermission };
