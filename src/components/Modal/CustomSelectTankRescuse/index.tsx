import React, { SetStateAction, Dispatch, useEffect, useState } from 'react';
import { ActivityIndicator, Text, ModalProps } from 'react-native';

import { Tank } from '../../../types/tank';
import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomDontExistListItem } from '../../CustomDontExistListItem';
import { CustomSearch } from '../../CustomSearch';
import { CustomTouchableOpacity, Title } from '../../global';
import { searchTank } from './services';
import {
  ContainerModal,
  OverlayModal,
  ContentModal,
  ContentHeaderListOption,
  ListOptions,
  Option,
  OtionName,
} from './styles';

type IModalAlertProps = ModalProps & {
  onRequestClose?: () => void;
  setSelectedTank: Dispatch<SetStateAction<Tank>>;
  tankList: Tank[];
  loadingListTank: boolean;
};

export const CustomSelectTankRescuse = ({
  onRequestClose,
  tankList,
  setSelectedTank,
  loadingListTank,
}: IModalAlertProps) => {
  const handleSelectVehicle = (item: any) => {
    setSelectedTank(item);
    onRequestClose();
  };

  const [search, setSearch] = useState<string>('');
  const [tank, setTank] = useState<Tank[]>(tankList);

  useEffect(() => {
    searchTank({
      value: search,
      tankList,
      setTank,
    });
  }, [search]);

  return (
    <ContainerModal transparent animationType="slide">
      <OverlayModal onPress={() => onRequestClose()}>
        <ContentModal>
          <ContentHeaderListOption>
            <Title>Selecionar tanque</Title>
            <CustomTouchableOpacity onPress={() => onRequestClose()}>
              {returnAppIcons({ icon: 'close', size: 25 })}
            </CustomTouchableOpacity>
          </ContentHeaderListOption>
          <CustomSearch
            {...{
              setValue: setSearch,
              value: search,
            }}
          />
          {loadingListTank ? (
            <>
              <ActivityIndicator size="large" color="grey" />
              <Text>Carregando dados</Text>
            </>
          ) : (
            <>
              {tank.length > 0 ? (
                <ListOptions
                  keyExtractor={(item: Tank, index) => String(index)}
                  data={tank}
                  extraData={tank}
                  renderItem={({ item }) => {
                    const tank: Tank = item;
                    const { DFDESCTANQUE } = tank;
                    return (
                      <Option onPress={() => handleSelectVehicle(item)}>
                        <OtionName>{DFDESCTANQUE}</OtionName>
                      </Option>
                    );
                  }}
                />
              ) : (
                <CustomDontExistListItem text="Nenhuma tanque encontrada" />
              )}
            </>
          )}
        </ContentModal>
      </OverlayModal>
    </ContainerModal>
  );
};
