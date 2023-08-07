import React, { Dispatch, SetStateAction } from 'react';

import { Vehicle } from '../../../types/vehicle';
import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomSelect } from '../CustomSelec';
import { CustomSelectVehicle } from '../NewCollect/CustomSelectVehicle';

interface ICustomSelectVehicleNewCollet {
  closeAndOpenVehicleModal: () => void;
  selectedVehicle: Vehicle;
  setSelectedVehicle: Dispatch<SetStateAction<Vehicle>>;
  vehicleList: Vehicle[];
  isOpenModalVehicle: boolean;
}

export const CustomSelectVehicleNewCollet = ({
  closeAndOpenVehicleModal,
  selectedVehicle,
  vehicleList,
  isOpenModalVehicle,
  setSelectedVehicle,
}: ICustomSelectVehicleNewCollet) => {
  const RenderSelectVehicleModal = () => {
    return isOpenModalVehicle ? (
      <CustomSelectVehicle
        setSelectedVehicle={setSelectedVehicle}
        vehicleList={vehicleList}
        visible={isOpenModalVehicle}
        onRequestClose={closeAndOpenVehicleModal}
      />
    ) : null;
  };

  return (
    <>
      <CustomSelect
        onPress={() => closeAndOpenVehicleModal()}
        iconSelect={returnAppIcons({ icon: 'select', size: 15 })}
        title={
          selectedVehicle === undefined
            ? 'Selecionar veículo'
            : selectedVehicle.DFPLACAVEICULO
        }
      />
      <RenderSelectVehicleModal />
    </>
  );
};
