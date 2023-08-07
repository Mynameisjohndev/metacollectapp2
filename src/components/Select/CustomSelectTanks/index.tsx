import React, { Dispatch, SetStateAction } from 'react';

import { Line } from '../../../types/line';
import { Tank } from '../../../types/tank';
import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomSelectTankRescuse } from '../../Modal/CustomSelectTankRescuse';
import { CustomSelect } from '../CustomSelec';

interface ICustomSelectTank {
  closeAndOpenLineModal: () => void;
  setSelectedTank: Dispatch<SetStateAction<Tank>>;
  tankList: Tank[];
  isOpenModalTank: boolean;
  selectedTank: Tank;
  loadingListTank: boolean;
}

export const CustomSelectTank = ({
  closeAndOpenLineModal,
  tankList,
  setSelectedTank,
  isOpenModalTank,
  selectedTank,
  loadingListTank,
}: ICustomSelectTank) => {
  const RenderSelectTankModal = () => {
    return isOpenModalTank ? (
      <CustomSelectTankRescuse
        loadingListTank={loadingListTank}
        setSelectedTank={setSelectedTank}
        tankList={tankList}
        visible={isOpenModalTank}
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
          selectedTank === undefined
            ? 'Selecionar tanque'
            : selectedTank.DFDESCTANQUE
        }
      />
      <RenderSelectTankModal />
    </>
  );
};
