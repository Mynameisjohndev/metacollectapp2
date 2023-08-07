import React, { Dispatch, SetStateAction } from 'react';

import { Region } from '../../../types/region';
import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomSelect } from '../CustomSelec';
import { CustomSelectRegion } from '../NewCollect/CustomSelectRegion';

interface ICustomSelectRegionNewCollet {
  closeAndOpenRegionModal: () => void;
  selectedRegion: Region;
  setSelectedRegion: Dispatch<SetStateAction<Region>>;
  regionList: Region[];
  isOpenModalRegion: boolean;
}

export const CustomSelectRegionNewCollet = ({
  closeAndOpenRegionModal,
  selectedRegion,
  regionList,
  isOpenModalRegion,
  setSelectedRegion,
}: ICustomSelectRegionNewCollet) => {
  const RenderSelectRegioinModal = () => {
    return isOpenModalRegion ? (
      <CustomSelectRegion
        setSelectedRegion={setSelectedRegion}
        regionList={regionList}
        visible={isOpenModalRegion}
        onRequestClose={closeAndOpenRegionModal}
      />
    ) : null;
  };

  return (
    <>
      <CustomSelect
        onPress={() => closeAndOpenRegionModal()}
        iconSelect={returnAppIcons({ icon: 'select', size: 15 })}
        title={
          selectedRegion === undefined
            ? 'Selecionar rota'
            : selectedRegion.DFDESCREGIONAL
        }
      />
      <RenderSelectRegioinModal />
    </>
  );
};
