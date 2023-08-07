import { Dispatch, SetStateAction } from 'react';

import { ICustomFormButtonRef } from '../../../../../components/Buttons/CustomFormButton';
import { getDBConnection } from '../../../../../databases/conection';
import { UpdateInformSecondRuler } from '../../../../../databases/TBITEMCOLETA/SELECT/screenTankOptions/updateInformSecondRuler';
import { searchTbItemColeta } from '../../../../../databases/TBITEMCOLETA/SELECT/searchTbItemColeta';
import { insertRegitryWithIdItemColetaApp } from '../../../../../databases/TBREGISTRO/INSERT/insertRegitryWithIdItemColetaApp';
import { InformSecondRulerProps } from '../../../../../routes/types/approutes/appscreen';
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

interface INavigateTankOptions {
  idCollectItem?: string;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setNavigation?: () => void;
}

interface IHandleUpdateRulerCollectItem
  extends ISetTypeAndOpenModal,
    InformSecondRulerProps {
  idCollectItem: string;
  idCollectItemCloud: string;
  ruler: string;
  idCollect: string | number;
  idWagoner: string | number;
  idCollectCloud: string;
  ref: ICustomFormButtonRef;
  setRulerLoading: Dispatch<SetStateAction<boolean>>;
}

interface ICreatedRegisterCheck {
  idCollectItem: string;
  idCarreteiro: string | number;
  idCollect: string | number;
  itemCollect?: string | null;
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

const createdRegisterChecktRuler = async ({
  idCollectItem,
  idCarreteiro,
  idCollect,
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
            DFTIPOREGISTRO: 'R',
            DFIDCOLETAAPP: idCollect,
            DFIDITEMCOLETA: itemCollect,
            DFIDITEMCOLETAAPP: idCollectItem,
            DFOBSERVACAO: 'Registro da régua de atrás!',
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

const handleUpdateRulerCollectItem = async ({
  ruler,
  idCollectItem,
  isOpen,
  setIsOpen,
  setModalType,
  idCollect,
  idWagoner,
  navigation,
  route,
  idCollectCloud,
  idCollectItemCloud,
  ref,
  setRulerLoading,
}: IHandleUpdateRulerCollectItem) => {
  const { disableButton, enableButton } = ref;
  setRulerLoading(true);
  disableButton();
  const db = await getDBConnection();
  if (ruler !== '' && Number(ruler) > 0) {
    UpdateInformSecondRuler({
      db,
      DFIDITEMCOLETAAPP: idCollectItem,
      DFREGUAATRAS: ruler,
    });
    handleInsertRegitry({
      idCollectItem,
      idCollect,
      idWagoner,
      idCollectCloud,
      idCollectItemCloud,
    });
    setRulerLoading(false);
    navigation.replace('Storage');
    enableButton();
  } else {
    setRulerLoading(false);
    setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
    enableButton();
  }
};

export {
  openModal,
  createdRegisterChecktRuler,
  handleNavigateTankOptionsAndCloseModal,
  handleUpdateRulerCollectItem,
};
