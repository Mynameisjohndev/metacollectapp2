import React, { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { ModalProps } from 'react-native';

import { Vehicle } from '../../../../types/vehicle';
import { returnAppIcons } from '../../../../utils/returnAppIcons';
import { CustomDontExistListItem } from '../../../CustomDontExistListItem';
import { CustomSearch } from '../../../CustomSearch';
import { CustomTouchableOpacity, Title } from '../../../global';
import {
  ContainerModal,
  OverlayModal,
  ContentModal,
  ContentHeaderListOption,
  ListOptions,
  Option,
  OptionName,
} from '../styles';
import { searchVehicle } from './services';

type IModalAlertProps = ModalProps & {
  onRequestClose?: () => void;
  setSelectedVehicle: Dispatch<SetStateAction<Vehicle>>;
  vehicleList: Vehicle[];
};

export const CustomSelectVehicle = ({
  onRequestClose,
  vehicleList,
  setSelectedVehicle,
}: IModalAlertProps) => {
  const handleSelectVehicle = (item: any) => {
    setSelectedVehicle(item);
    onRequestClose();
  };

  const [search, setSearch] = useState<string>('');
  const [vehicles, setVehicles] = useState<Vehicle[]>(vehicleList);

  useEffect(() => {
    searchVehicle({
      setVehicles,
      value: search,
      vehicleList,
    });
  }, [search]);

  return (
    <ContainerModal transparent animationType="slide">
      <OverlayModal onPress={() => onRequestClose()}>
        <ContentModal>
          <ContentHeaderListOption>
            <Title>Selecionar veículo</Title>
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
          {vehicles.length > 0 ? (
            <ListOptions
              keyExtractor={(item: Vehicle) => String(item.DFIDVEICULO)}
              data={vehicles}
              renderItem={({ item }) => {
                const vehicle: Vehicle = item;
                return (
                  <Option onPress={() => handleSelectVehicle(vehicle)}>
                    <OptionName>{vehicle.DFPLACAVEICULO}</OptionName>
                  </Option>
                );
              }}
            />
          ) : (
            <CustomDontExistListItem text="Nenhum veículo encontrado" />
          )}
        </ContentModal>
      </OverlayModal>
    </ContainerModal>
  );
};
