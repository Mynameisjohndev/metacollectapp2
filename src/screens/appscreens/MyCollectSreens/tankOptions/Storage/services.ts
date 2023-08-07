import { Dispatch, SetStateAction } from 'react';

import { getDBConnection } from '../../../../../databases/conection';
import { totalSumOfMouths } from '../../../../../databases/TBBOCAARMAZENADA/SELECT/totalSumOfMouths';
import { updateTbItemColetaMouthStorage } from '../../../../../databases/TBITEMCOLETA/UPDATE/updateTbItemColetaMouthStorage';
import { selectTankItemColeta } from '../../../../../databases/TBTANQUE/SELECT/selectTankItemColeta';
import { vehicleMouthData } from '../../../../../databases/TBTANQUEVEICULO/SELECT/vehicleMouthData';
import { StorageProps } from '../../../../../routes/types/approutes/appscreen';
import { VehicleTank } from '../../../../../types/vehicleTank';

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

interface IInformVolume {
  idCollectItem: string;
  tankCode: string | number;
  setVolume: Dispatch<SetStateAction<string>>;
  setStorage: Dispatch<SetStateAction<string | number>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}
interface IStorageUpdate {
  idCollectItem: string;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

interface IInformationMouth {
  idCollectItem?: string | number;
  setVehicleTank: Dispatch<SetStateAction<VehicleTank[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  idCollect: string | number;
}

interface IValidStorage extends ISetTypeAndOpenModal, StorageProps {
  volume: string | number;
  storage: string | number;
  hasDischarge: boolean;
  setCollectLoading: Dispatch<SetStateAction<boolean>>;
}
interface INavigateInformStorage {
  setNavigation?: () => void;
  setIdMouth: Dispatch<SetStateAction<string>>;
  DFBOCA: string;
}

interface ISurplusStorage {
  storage: number;
  volume: number;
  setSurplus: Dispatch<SetStateAction<string>>;
  setTitleSurplusAndMissing: Dispatch<
    SetStateAction<'Execedente' | 'Restante'>
  >;
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

const informVolume = async ({
  idCollectItem,
  tankCode,
  setVolume,
  setStorage,
  setLoading,
}: IInformVolume) => {
  const db = await getDBConnection();
  selectTankItemColeta({
    db,
    DFIDITEMCOLETAAPP: idCollectItem,
    DFIDTANQUE: tankCode,
  })
    .then(res => {
      if (res.length > 0) {
        const { DFQTDPREVISTA, DFQTDCOLETADA } = res[0];
        if (DFQTDPREVISTA !== null) {
          setVolume(DFQTDPREVISTA);
          if (DFQTDCOLETADA !== null) {
            setStorage(DFQTDCOLETADA);
          } else {
            setStorage('0');
          }
        } else {
          setVolume('0');
          if (DFQTDCOLETADA !== null) {
            setStorage(DFQTDCOLETADA);
          } else {
            setStorage('0');
          }
        }
      }
    })
    .catch(() => {
      setLoading(false);
    });
};

const informationMouth = async ({
  setVehicleTank,
  setLoading,
  idCollect,
}: IInformationMouth) => {
  const db = await getDBConnection();
  vehicleMouthData({
    db,
    DFIDCOLETAAPP: idCollect,
  }).then(res => {
    setVehicleTank(res);
    setLoading(false);
  });
};

const validStorage = ({
  volume,
  storage,
  isOpen,
  setIsOpen,
  setModalType,
  navigation,
  route,
  hasDischarge,
  setCollectLoading,
}: IValidStorage) => {
  setCollectLoading(true);
  if (volume > storage) {
    setCollectLoading(false);
    return setTypeAndOpenModal({
      isOpen,
      setIsOpen,
      setModalType,
      type: 0,
    });
  }
  if (volume === '0') {
    setCollectLoading(false);
    return setTypeAndOpenModal({
      isOpen,
      setIsOpen,
      setModalType,
      type: 2,
    });
  }
  if (hasDischarge) {
    navigation.replace('Distribution');
    setCollectLoading(false);
  } else {
    navigation.goBack();
    setCollectLoading(false);
  }
};

const handleNavigateInformStorage = ({
  setNavigation,
  setIdMouth,
  DFBOCA,
}: INavigateInformStorage) => {
  setIdMouth(DFBOCA);
  setTimeout(() => {
    setNavigation();
  });
};

const storageUpdate = async ({
  idCollectItem,
  setLoading,
}: IStorageUpdate): Promise<boolean> => {
  const db = await getDBConnection();
  return new Promise(resolve => {
    totalSumOfMouths({ db, DFIDITEMCOLETAAPP: idCollectItem })
      .then(res => {
        const { DFVOLUME } = res[0];
        if (DFVOLUME !== null) {
          updateTbItemColetaMouthStorage({
            db,
            DFIDITEMCOLETAAPP: idCollectItem,
            DFQTDCOLETADA: DFVOLUME,
          });
          resolve(true);
          return true;
        }
      })
      .catch(() => {
        setLoading(false);
      });
  });
};

const surplusStorage = async ({
  storage,
  volume,
  setSurplus,
  setTitleSurplusAndMissing,
}: ISurplusStorage) => {
  if (storage > volume) {
    const sum = Number(storage) - Number(volume);
    setSurplus(String(sum));
    setTitleSurplusAndMissing('Execedente');
  } else if (storage < volume) {
    const sum = Number(volume) - Number(storage);
    setSurplus(String(sum));
    setTitleSurplusAndMissing('Restante');
  } else {
    setTitleSurplusAndMissing('Execedente');
    setSurplus('0');
  }
};
export {
  informVolume,
  informationMouth,
  openModal,
  handleNavigateTankOptionsAndCloseModal,
  validStorage,
  handleNavigateInformStorage,
  storageUpdate,
  surplusStorage,
};
