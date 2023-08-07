import React, { Dispatch, SetStateAction } from 'react';

import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomSelectAlizarolOptions } from '../../Modal/CustomSelectAlizarol';
import { CustomSelectWithLabel } from '../CustomSelectWithLabel';

interface ICustomSelectionAlizarol {
  closeAndOpenAlizarolModal: () => void;
  selectedAlizarol: 'Sim' | 'Não';
  setSelectedAlizarol: Dispatch<SetStateAction<'Sim' | 'Não'>>;
  isOpenModalAlizarol: boolean;
}

export const CustomSelectAlizarol = ({
  closeAndOpenAlizarolModal,
  selectedAlizarol,
  isOpenModalAlizarol,
  setSelectedAlizarol,
}: ICustomSelectionAlizarol) => {
  const RenderSelectAlizarolModal = () => {
    return isOpenModalAlizarol ? (
      <CustomSelectAlizarolOptions
        setSelectedAlizarol={setSelectedAlizarol}
        visible={isOpenModalAlizarol}
        onRequestClose={closeAndOpenAlizarolModal}
      />
    ) : null;
  };

  return (
    <>
      <CustomSelectWithLabel
        onPress={() => closeAndOpenAlizarolModal()}
        label="Passou no alizarol"
        iconSelect={returnAppIcons({ icon: 'select', size: 15 })}
        title={
          selectedAlizarol === undefined
            ? 'Selecionar opções'
            : selectedAlizarol
        }
      />
      <RenderSelectAlizarolModal />
    </>
  );
};
