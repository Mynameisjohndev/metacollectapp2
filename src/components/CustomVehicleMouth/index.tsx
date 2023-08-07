import { useFocusEffect } from '@react-navigation/native';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { getDBConnection } from '../../databases/conection';
import { sumOfStorage } from '../../databases/TBBOCAARMAZENADA/SELECT/sumOfStorage';
import { returnAppIcons } from '../../utils/returnAppIcons';
import { CustomListItemLoad } from '../CustomListItemLoad';
import {
  ContainerCustomVehicleMouth,
  ContentContentCustomVehicleMouthCollum,
  ContentCustomVehicleMouth,
  CustomContentVehicleMouthRow,
  CustomVehicleMouthButton,
  CustomVehicleMouthText,
  CustomVehicleMouthTitle,
  CustonButtonTitle,
} from './styles';

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
}
interface ICustomVehicleMouth extends ISetTypeAndOpenModal {
  id?: string | number;
  capacity?: string | number;
  informStorage?: () => void;
  DFBOCA?: string | number;
  idCollect?: string | number;
  volume?: string | number;
  hasButton?: boolean;
  type?: 0 | 1 | 2 | 3;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
}

export const CustomVehicleMouth = ({
  capacity,
  id,
  idCollect,
  DFBOCA,
  informStorage,
  hasButton,
  volume,
  isOpen,
  setIsOpen,
  setModalType,
}: ICustomVehicleMouth) => {
  const [storedValue, setStoredValue] = useState<string | number>();
  const [loading, setLoading] = useState<boolean>(true);

  const openModal = ({ setIsOpen, isOpen }: IOpenModal) => {
    setIsOpen(!isOpen);
  };

  const setTypeAndOpenModal = ({
    isOpen,
    setIsOpen,
    type,
    setModalType,
  }: ISetTypeAndOpenModal) => {
    setModalType(type);
    openModal({ isOpen, setIsOpen });
  };

  const mouthStorage = async ({ DFBOCA, idCollect }: ICustomVehicleMouth) => {
    const db = await getDBConnection();
    sumOfStorage({ db, DFIDCOLETAAPP: idCollect, DFBOCA }).then(res => {
      const { DFVOLUME } = res[0];
      if (DFVOLUME !== null) {
        setStoredValue(DFVOLUME);
        setLoading(false);
      } else {
        setStoredValue(0);
        setLoading(false);
      }
    });
  };

  const handleNavigateInformStorage = () => {
    if (volume !== '0') {
      informStorage();
    } else {
      setTypeAndOpenModal({
        isOpen,
        setIsOpen,
        setModalType,
        type: 2,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      mouthStorage({ DFBOCA, idCollect });
    }, [storedValue]),
  );

  return (
    <>
      {loading ? (
        <CustomListItemLoad />
      ) : (
        <ContainerCustomVehicleMouth>
          <CustomVehicleMouthTitle>#{id}</CustomVehicleMouthTitle>
          <CustomContentVehicleMouthRow>
            <ContentContentCustomVehicleMouthCollum>
              <ContentCustomVehicleMouth>
                {returnAppIcons({ icon: 'volume' })}
                <CustomVehicleMouthText isPrimary={true}>
                  {' '}
                  Capacidade: {''}
                  <CustomVehicleMouthText isPrimary={false}>
                    {capacity} L
                  </CustomVehicleMouthText>
                </CustomVehicleMouthText>
              </ContentCustomVehicleMouth>
              <ContentCustomVehicleMouth>
                {returnAppIcons({ icon: 'storage' })}
                <CustomVehicleMouthText isPrimary={true}>
                  {' '}
                  Armazenado: {''}
                  <CustomVehicleMouthText isPrimary={false}>
                    {storedValue} L
                  </CustomVehicleMouthText>
                </CustomVehicleMouthText>
              </ContentCustomVehicleMouth>
            </ContentContentCustomVehicleMouthCollum>
            {hasButton === false ? (
              <></>
            ) : (
              <CustomVehicleMouthButton
                onPress={() => handleNavigateInformStorage()}
              >
                <CustonButtonTitle>Armazenar</CustonButtonTitle>
              </CustomVehicleMouthButton>
            )}
          </CustomContentVehicleMouthRow>
        </ContainerCustomVehicleMouth>
      )}
    </>
  );
};
