import React, { Dispatch, SetStateAction } from 'react';

import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomSelectSensoryOptions } from '../../Modal/CustomSelectSensory';
import { CustomSelectWithLabel } from '../CustomSelectWithLabel';

interface ICustomSelectionSensory {
  closeAndOpenSensoryModal: () => void;
  selectedSensory: 'Caracteristico' | 'Não caracteristico';
  setSelectedSensory: Dispatch<
    SetStateAction<'Caracteristico' | 'Não caracteristico'>
  >;
  isOpenModalSensory: boolean;
}

export const CustomSelectSensory = ({
  closeAndOpenSensoryModal,
  selectedSensory,
  isOpenModalSensory,
  setSelectedSensory,
}: ICustomSelectionSensory) => {
  const RenderSelectSensoryModal = () => {
    return isOpenModalSensory ? (
      <CustomSelectSensoryOptions
        setSelectedSensory={setSelectedSensory}
        visible={isOpenModalSensory}
        onRequestClose={closeAndOpenSensoryModal}
      />
    ) : null;
  };

  return (
    <>
      <CustomSelectWithLabel
        onPress={() => closeAndOpenSensoryModal()}
        label="Exame sensorial"
        iconSelect={returnAppIcons({ icon: 'select', size: 15 })}
        title={
          selectedSensory === undefined ? 'Selecionar opções' : selectedSensory
        }
      />
      <RenderSelectSensoryModal />
    </>
  );
};
