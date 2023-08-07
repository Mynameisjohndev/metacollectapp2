import React, { Dispatch, SetStateAction } from 'react';

import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomSelectQualitySampleOptions } from '../../Modal/CustomSelectQualitySample';
import { CustomSelectWithLabel } from '../CustomSelectWithLabel';

interface ICustomSelectionQualitySample {
  closeAndOpenQualitySampleModal: () => void;
  selectedQualitySample: 'Sim' | 'Não';
  setSelectedQualitySample: Dispatch<SetStateAction<'Sim' | 'Não'>>;
  isOpenModalQualitySample: boolean;
}

export const CustomSelectQualitySample = ({
  closeAndOpenQualitySampleModal,
  selectedQualitySample,
  isOpenModalQualitySample,
  setSelectedQualitySample,
}: ICustomSelectionQualitySample) => {
  const RenderSelectQualitySampleModal = () => {
    return isOpenModalQualitySample ? (
      <CustomSelectQualitySampleOptions
        setSelectedQualitySample={setSelectedQualitySample}
        visible={isOpenModalQualitySample}
        onRequestClose={closeAndOpenQualitySampleModal}
      />
    ) : null;
  };

  return (
    <>
      <CustomSelectWithLabel
        onPress={() => closeAndOpenQualitySampleModal()}
        label="Amostra de qualidade"
        iconSelect={returnAppIcons({ icon: 'select', size: 15 })}
        title={
          selectedQualitySample === undefined
            ? 'Selecionar opções'
            : selectedQualitySample
        }
      />
      <RenderSelectQualitySampleModal />
    </>
  );
};
