import { Dispatch, SetStateAction } from 'react';

import { getDBConnection } from '../../../../../../databases/conection';
import { selectAll } from '../../../../../../databases/select/selectAll';
import { insertTbBocaArmazenada } from '../../../../../../databases/TBBOCAARMAZENADA/INSERT/insertTbBocaArmazenada';
import { searchTbBocaArmazenada } from '../../../../../../databases/TBBOCAARMAZENADA/SELECT/searchTbBocaArmazenada';
import { searchTbBocaArmazenadaInsert } from '../../../../../../databases/TBBOCAARMAZENADA/SELECT/searchTbBocaArmazenadaInsert';
import { sumOfTotalVolume } from '../../../../../../databases/TBBOCAARMAZENADA/SELECT/sumOfTotalVolume';
import { updateTbBocaArmazenada } from '../../../../../../databases/TBBOCAARMAZENADA/UPDATE/updateTbBocaArmazenada';
import { mouthCapacity } from '../../../../../../databases/TBTANQUEVEICULO/SELECT/mouthCapacity';
import { InformStorageProps } from '../../../../../../routes/types/approutes/appscreen';
import { storageUpdate } from '../services';

interface IInsertOrUpdateStoredMouth {
  volume?: string | number;
  dfboca: string | number;
  idCollectItem: string;
}
interface INavigateStorage {
  idCollectItem?: string;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setNavigation?: () => void;
}

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
}

interface IValidCapacity extends ISetTypeAndOpenModal, InformStorageProps {
  idCollectItem: string;
  dfboca: string | number;
  volume: string | number;
  DFIDCOLETAAPP?: number;
}
interface IReturnScreenStoredMouth {
  idCollectItem?: string;
  dfboca?: string | number;
  setStoredMouth?: Dispatch<SetStateAction<string>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
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

const handleNavigateStorageAndCloseModal = ({
  isOpen,
  setIsOpen,
  setNavigation,
}: INavigateStorage) => {
  openModal({ isOpen, setIsOpen });
  setTimeout(() => {
    setNavigation();
  });
};

const searchBocaArmazenada = async ({
  dfboca,
  idCollectItem,
}: IInsertOrUpdateStoredMouth) => {
  const db = await getDBConnection();
  searchTbBocaArmazenadaInsert({
    db,
    DFIDITEMCOLETAAPP: idCollectItem,
    DFBOCA: dfboca,
  });
};

const updateStoredMouth = async ({
  dfboca,
  idCollectItem,
  volume,
}: IInsertOrUpdateStoredMouth): Promise<boolean> => {
  const db = await getDBConnection();
  return new Promise(resolve => {
    updateTbBocaArmazenada({
      db,
      DFBOCA: dfboca,
      DFIDITEMCOLETAAPP: idCollectItem,
      DFVOLUME: volume,
    });
    resolve(true);
    return true;
  });
};

const validCapacity = async ({
  idCollectItem,
  dfboca,
  volume,
  isOpen,
  setIsOpen,
  setModalType,
  navigation,
  route,
}: IValidCapacity) => {
  const db = await getDBConnection();
  mouthCapacity({
    db,
    DFIDITEMCOLETAAPP: idCollectItem,
    DFBOCA: dfboca,
  }).then(async res => {
    const { DFCAPACIDADE, DFIDCOLETAAPP } = res[0];
    const DFVOLUME = await sumOfTotalVolume({
      db,
      DFIDITEMCOLETAAPP: idCollectItem,
      DFBOCA: dfboca,
      DFIDCOLETAAPP,
    });
    const sum = Number(volume) + Number(DFVOLUME);

    if (sum > Number(DFCAPACIDADE)) {
      setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
    } else if (volume !== '') {
      updateStoredMouth({ dfboca, idCollectItem, volume }).then(res => {
        if (res === true) {
          storageUpdate({ idCollectItem }).then(res => {
            navigation.navigate('Storage');
          });
        }
      });
    } else {
      setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 2 });
    }
  });
};

const returnScreenStoredMouth = async ({
  idCollectItem,
  setStoredMouth,
  setLoading,
  dfboca,
}: IReturnScreenStoredMouth) => {
  const db = await getDBConnection();

  searchTbBocaArmazenada({
    db,
    DFIDITEMCOLETAAPP: idCollectItem,
    DFBOCA: dfboca,
  })
    .then(res => {
      const { DFVOLUME } = res[0];
      if (DFVOLUME !== '') {
        setStoredMouth(`${String(DFVOLUME)}`);
        setLoading(false);
      } else {
        setStoredMouth('');
        setLoading(false);
      }
      setLoading(false);
    })
    .catch(() => {
      setStoredMouth('');
      setLoading(false);
    });
};

export {
  handleNavigateStorageAndCloseModal,
  openModal,
  validCapacity,
  returnScreenStoredMouth,
  searchBocaArmazenada,
};
