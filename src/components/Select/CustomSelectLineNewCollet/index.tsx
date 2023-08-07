import React, { Dispatch, SetStateAction } from 'react';

import { Line } from '../../../types/line';
import { Region } from '../../../types/region';
import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomSelect } from '../CustomSelec';
import { CustomSelectLine } from '../NewCollect/CustomSelectLine';

interface ICustomSelectLineNewCollet {
  closeAndOpenLineModal: () => void;
  setSelectedLine: Dispatch<SetStateAction<Line>>;
  lineList: Line[];
  isOpenModalLine: boolean;
  selectedLine: Line;
  selectedRegion: Region;
  loadingListLine: boolean;
}

export const CustomSelectLineNewCollet = ({
  closeAndOpenLineModal,
  lineList,
  setSelectedLine,
  isOpenModalLine,
  selectedLine,
  selectedRegion,
  loadingListLine,
}: ICustomSelectLineNewCollet) => {
  const RenderSelectVehicleModal = () => {
    return isOpenModalLine && selectedRegion ? (
      <CustomSelectLine
        loadingListLine={loadingListLine}
        setSelectedLine={setSelectedLine}
        lineList={lineList}
        visible={isOpenModalLine}
        onRequestClose={closeAndOpenLineModal}
      />
    ) : null;
  };

  return (
    <>
      <CustomSelect
        onPress={() => closeAndOpenLineModal()}
        iconSelect={returnAppIcons({ icon: 'select', size: 15 })}
        title={
          selectedLine === undefined
            ? 'Selecionar linha'
            : selectedLine.DFNOMELINHA
        }
      />
      <RenderSelectVehicleModal />
    </>
  );
};
