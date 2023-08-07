import { Dispatch, SetStateAction } from 'react';

import { ICustomFormButtonRef } from '../../../../../../components/Buttons/CustomFormButton';
import { getDBConnection } from '../../../../../../databases/conection';
import { updateTbProdutorColeta } from '../../../../../../databases/TBPRODUTORCOLETA/UPDATE/updateTbProdutorColeta';
import { InformDistributionProps } from '../../../../../../routes/types/approutes/appscreen';

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
}
interface IInsertProducer
  extends ISetTypeAndOpenModal,
    InformDistributionProps {
  idCollectItem: string;
  idProprietario: string | number;
  volume: string | number;
}
interface IHandleNavigate {
  idCollectItem?: string;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setNavigation?: () => void;
}

interface IValidInformDistribution extends IInsertProducer {
  volume: string | number;
  storageVolume: string;
  setDistribuitionLoading: Dispatch<SetStateAction<boolean>>;
  ref: ICustomFormButtonRef;
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

const insertOrUpdateProducer = async ({
  idCollectItem,
  idProprietario,
  volume,
  navigation,
}: IInsertProducer) => {
  const db = await getDBConnection();
  updateTbProdutorColeta({
    db,
    DFIDITEMCOLETAAPP: idCollectItem,
    DFIDPROPRIEDADE: idProprietario,
    DFQTDENTRADA: volume,
  }).then(res => {
    if (res) {
      return navigation.navigate('Distribution');
    }
  });
};

const validInformDistribution = async ({
  volume,
  idCollectItem,
  idProprietario,
  isOpen,
  setIsOpen,
  setModalType,
  navigation,
  route,
  storageVolume,
  setDistribuitionLoading,
  ref,
}: IValidInformDistribution) => {
  const { disableButton, enableButton } = ref;
  disableButton();
  setDistribuitionLoading(true);
  if (storageVolume === '' || storageVolume === '0') {
    setDistribuitionLoading(false);
    enableButton();
    return setTypeAndOpenModal({
      isOpen,
      setIsOpen,
      setModalType,
      type: 2,
    });
  }
  if (volume !== '') {
    enableButton();
    setDistribuitionLoading(false);
    insertOrUpdateProducer({
      idCollectItem,
      idProprietario,
      volume,
      isOpen,
      setIsOpen,
      setModalType,
      navigation,
      route,
    });
  } else {
    enableButton();
    setDistribuitionLoading(false);
    return setTypeAndOpenModal({
      isOpen,
      setIsOpen,
      setModalType,
      type: 0,
    });
  }
};

const handleNavigateDistributionAndCloseModal = ({
  isOpen,
  setIsOpen,
  setNavigation,
}: IHandleNavigate) => {
  openModal({ isOpen, setIsOpen });
  setTimeout(() => {
    setNavigation();
  });
};

export {
  insertOrUpdateProducer,
  handleNavigateDistributionAndCloseModal,
  validInformDistribution,
};
