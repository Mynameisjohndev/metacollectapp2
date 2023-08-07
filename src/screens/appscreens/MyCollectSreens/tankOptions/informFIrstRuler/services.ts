import { Dispatch, SetStateAction } from 'react';

import { ICustomFormButtonRef } from '../../../../../components/Buttons/CustomFormButton';
import { getDBConnection } from '../../../../../databases/conection';
import { UpdateInformRuler } from '../../../../../databases/TBITEMCOLETA/SELECT/screenTankOptions/updateInformRuler';
import { insertRegitryWithIdItemColetaApp } from '../../../../../databases/TBREGISTRO/INSERT/insertRegitryWithIdItemColetaApp';
import { InformRulerProps } from '../../../../../routes/types/approutes/appscreen';
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
    InformRulerProps {
  idCollectItem: string;
  idCollectItemCloud: string;
  idCollect: string | number;
  idWagoner: string | number;
  ruler: string;
  idCollectCloud: string;
  hasRuleBack: boolean;
  ref: ICustomFormButtonRef;
  setRulerLoading: Dispatch<SetStateAction<boolean>>;
}

interface ICreatedRegisterCheck {
  idCollectItem: string;
  idCarreteiro: string | number;
  idCollect: string | number;
  itemCollect: string | number;
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
            DFIDITEMCOLETAAPP: idCollectItem,
            DFIDITEMCOLETA: itemCollect,
            DFOBSERVACAO: 'Registro da régua!',
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
  idCollectCloud,
  hasRuleBack,
  idCollectItemCloud,
  ref,
  setRulerLoading,
}: IHandleUpdateRulerCollectItem) => {
  const { disableButton, enableButton } = ref;
  setRulerLoading(true);
  disableButton();
  const db = await getDBConnection();
  if (ruler !== '' && Number(ruler) > 0) {
    UpdateInformRuler({
      db,
      DFIDITEMCOLETAAPP: idCollectItem,
      DFREGUAFRENTE: ruler,
    });
    handleInsertRegitry({
      idCollectItem,
      idCollect,
      idWagoner,
      idCollectCloud,
      idCollectItemCloud,
    });
    if (hasRuleBack) {
      setRulerLoading(false);
      navigation.replace('InformSecondRuler');
      enableButton();
    } else {
      setRulerLoading(false);
      navigation.replace('Storage');
      enableButton();
    }
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
