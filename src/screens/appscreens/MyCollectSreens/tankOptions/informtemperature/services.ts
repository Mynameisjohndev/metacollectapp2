import { Dispatch, SetStateAction } from 'react';

import { ICustomFormButtonRef } from '../../../../../components/Buttons/CustomFormButton';
import { ICurrentCollectItem } from '../../../../../context/InfoCollectContext';
import { getDBConnection } from '../../../../../databases/conection';
import { updateInformtemperature } from '../../../../../databases/TBITEMCOLETA/SELECT/screenTankOptions/updateInformtemperature';
import { searchTbItemColeta } from '../../../../../databases/TBITEMCOLETA/SELECT/searchTbItemColeta';
import { insertRegitryWithIdItemColetaApp } from '../../../../../databases/TBREGISTRO/INSERT/insertRegitryWithIdItemColetaApp';
import { InformtemperatureProps } from '../../../../../routes/types/approutes/appscreen';
import { validReceiveCurrentGpsLocationCoords } from '../../../../../services/GPS/validReceiveCurrentGpsLocationCoords';
import { currentDate } from '../../../../../utils/getCurrentDate';
import { currentTime } from '../../../../../utils/getCurrentTime';
import { returnOfImeiPermission } from '../../../../../utils/readPhoneStatePermission';
import { handleInsertRegitry } from '../../../../../utils/startRecord';

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
}

interface ICreatedRegisterCheck {
  idCollectItem: string;
  itemCollect?: string | null;
  idCarreteiro: string | number;
  idCollect: string | number;
}

interface INavigateTankOptions {
  idCollectItem?: string;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setNavigation?: () => void;
}

interface IHandleUpdateTemperatureCollectItem
  extends ISetTypeAndOpenModal,
    InformtemperatureProps {
  idCollectItem: string;
  temperature: string;
  idCollect: string | number;
  idWagoner: string | number;
  idCollectCloud: string;
  idCollectItemCloud: string;
  ref: ICustomFormButtonRef;
  setTemperatureLoading: Dispatch<SetStateAction<boolean>>;
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

const createdRegisterChecktTemperature = async ({
  idCollectItem,
  idCollect,
  idCarreteiro,
  itemCollect,
}: ICreatedRegisterCheck): Promise<string | boolean | number> => {
  const db = await getDBConnection();
  let geometry = await validReceiveCurrentGpsLocationCoords();
  return new Promise(resolver => {
    try {
      returnOfImeiPermission().then(res => {
        if (typeof res === 'string') {
          insertRegitryWithIdItemColetaApp({
            db,
            DFDATAREGISTRO: currentDate(),
            DFHORAREGISTRO: currentTime(),
            DFTIPOREGISTRO: 'T',
            DFIDCOLETAAPP: idCollect,
            DFIDITEMCOLETA: itemCollect,
            DFIDITEMCOLETAAPP: idCollectItem,
            DFOBSERVACAO: 'Registro da temperatura!',
            DFIMEI: res,
            DFIDCARRETEIRO: idCarreteiro,
            geometry,
          })
            .then(res => {
              if (!false) {
                const id = res;
                resolver(id);
                return id;
              }
              return false;
            })
            .catch(() => {
              return false;
            });
        }
      });
    } catch (error) {}
  });
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

const handleUpdateTemperatureCollectItem = async ({
  idCollectItem,
  isOpen,
  setIsOpen,
  setModalType,
  temperature,
  idCollect,
  idWagoner,
  navigation,
  idCollectCloud,
  idCollectItemCloud,
  ref,
  setTemperatureLoading,
}: IHandleUpdateTemperatureCollectItem) => {
  const { disableButton, enableButton } = ref;
  setTemperatureLoading(true);
  disableButton();
  const db = await getDBConnection();

  if (temperature !== null && Number(temperature) <= 7) {
    updateInformtemperature({
      db,
      DFIDITEMCOLETAAPP: idCollectItem,
      DFTEMPERATURA: temperature,
    }).then(() => {
      handleInsertRegitry({
        idCollectItem,
        idCollect,
        idWagoner,
        idCollectCloud,
        idCollectItemCloud,
      });
      navigation.replace('InformFIrstRuler');
      setTemperatureLoading(false);
      enableButton();
    });
  } else if (temperature === '') {
    enableButton();
    setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
    setTemperatureLoading(false);
  } else if (Number(temperature) > 7) {
    enableButton();
    setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 2 });
    setTemperatureLoading(false);
  } else {
    enableButton();
    setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 3 });
    setTemperatureLoading(false);
  }
};

export {
  openModal,
  createdRegisterChecktTemperature,
  handleNavigateTankOptionsAndCloseModal,
  handleUpdateTemperatureCollectItem,
};
