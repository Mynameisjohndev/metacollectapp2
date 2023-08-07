import React, { Dispatch, SetStateAction } from 'react';

import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomSelectTypeAlizarolOptions } from '../../Modal/CustomSelectTypeAlizarol';
import { CustomSelectWithLabel } from '../CustomSelectWithLabel';

interface ICustomSelectionTypeAlizarol {
  closeAndOpenTypeAlizarolModal: () => void;
  selectedTypeAlizarol: '72' | '74' | '76' | '80' | '82';
  setSelectedTypeAlizarol: Dispatch<
    SetStateAction<'72' | '74' | '76' | '80' | '82'>
  >;
  isOpenModalTypeAlizarol: boolean;
}

export const CustomSelectTypeAlizarol = ({
  closeAndOpenTypeAlizarolModal,
  selectedTypeAlizarol,
  isOpenModalTypeAlizarol,
  setSelectedTypeAlizarol,
}: ICustomSelectionTypeAlizarol) => {
  const RenderSelectTypeAlizarolModal = () => {
    return isOpenModalTypeAlizarol ? (
      <CustomSelectTypeAlizarolOptions
        setSelectedTypeAlizarol={setSelectedTypeAlizarol}
        visible={isOpenModalTypeAlizarol}
        onRequestClose={closeAndOpenTypeAlizarolModal}
      />
    ) : null;
  };

  return (
    <>
      <CustomSelectWithLabel
        onPress={() => closeAndOpenTypeAlizarolModal()}
        label="Exame de alizarol"
        iconSelect={returnAppIcons({ icon: 'select', size: 15 })}
        title={
          selectedTypeAlizarol === undefined
            ? 'Selecionar opções'
            : selectedTypeAlizarol
        }
      />
      <RenderSelectTypeAlizarolModal />
    </>
  );
};
