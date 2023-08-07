import { Dispatch, SetStateAction } from 'react';

import { ICustomFormButtonRef } from '../../../../../components/Buttons/CustomFormButton';
import { getDBConnection } from '../../../../../databases/conection';
import { updateInformVolume } from '../../../../../databases/TBITEMCOLETA/SELECT/screenTankOptions/updateInformVolume';
import { searchTbItemColeta } from '../../../../../databases/TBITEMCOLETA/SELECT/searchTbItemColeta';
import { InformVolumeProps } from '../../../../../routes/types/approutes/appscreen';
import { CollectItem } from '../../../../../types/collectItem';
import { handleInsertRegitry } from '../../../../../utils/startRecord';

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
}

interface INavigateTankOptions {
  idCollectItem?: string;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setNavigation?: () => void;
}

interface IHandleUpdateVolumeCollectItem
  extends ISetTypeAndOpenModal,
    InformVolumeProps {
  idCollectItem: string;
  idCollectItemCloud: string;
  volume: string;
  idCollectCloud: string;
  idCollect: string | number;
  idWagoner: string | number;
  setCollectItem: Dispatch<SetStateAction<CollectItem>>;
  collectItem: CollectItem;
  ref: ICustomFormButtonRef;
  setVolumeLoading: Dispatch<SetStateAction<boolean>>;
}

const openModal = ({ setIsOpen, isOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

const setTypeAndOpenModal = ({
  isOpen,
  setIsOpen,
  type,
  setModalType,
}: ISetTypeAndOpenModal) => {
  setModalType(type);
  openModal({ isOpen, setIsOpen });
};

const handleNavigateTankOptionsAndCloseModal = ({
  isOpen,
  setIsOpen,
  setNavigation,
}: INavigateTankOptions) => {
  openModal({ isOpen, setIsOpen });
  setTimeout(() => {
    setNavigation();
  });
};

const handleUpdateVolumeCollectItem = async ({
  volume,
  idCollectItem,
  isOpen,
  setIsOpen,
  setModalType,
  idCollect,
  idWagoner,
  idCollectCloud,
  navigation,
  setCollectItem,
  collectItem,
  idCollectItemCloud,
  ref,
  setVolumeLoading,
}: IHandleUpdateVolumeCollectItem) => {
  const { disableButton, enableButton } = ref;
  setVolumeLoading(true);
  disableButton();
  const db = await getDBConnection();
  if (
    volume !== undefined &&
    volume !== '' &&
    volume !== null &&
    volume !== '0'
  ) {
    updateInformVolume({
      db,
      DFIDITEMCOLETAAPP: idCollectItem,
      DFQTDPREVISTA: volume,
    });
    setCollectItem({
      ...collectItem,
      DFQTDPREVISTA: volume,
    });
    handleInsertRegitry({
      idCollectItem,
      idCollect,
      idWagoner,
      idCollectCloud,
      idCollectItemCloud,
    });
    setVolumeLoading(false);
    navigation.replace('InformQuality');
    enableButton();
  } else {
    setVolumeLoading(false);
    enableButton();
    setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
  }
};

export {
  openModal,
  handleNavigateTankOptionsAndCloseModal,
  handleUpdateVolumeCollectItem,
};
