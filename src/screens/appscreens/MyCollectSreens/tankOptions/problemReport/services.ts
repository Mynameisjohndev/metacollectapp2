import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

import { ICustomFormButtonRef } from '../../../../../components/Buttons/CustomFormButton';
import { getDBConnection } from '../../../../../databases/conection';
import { insertItemRegistro } from '../../../../../databases/TBITEMREGISTRO/INSERT/insertItemRegistro';
import { searchTbItemRegistro } from '../../../../../databases/TBITEMREGISTRO/SELECT/searchTbItemRegistro';
import { insertRegitryWithIdItemColetaApp } from '../../../../../databases/TBREGISTRO/INSERT/insertRegitryWithIdItemColetaApp';
import { insertTbRegistro } from '../../../../../databases/TBREGISTRO/INSERT/insertTbRegistro';
import { searchRegister } from '../../../../../databases/TBREGISTRO/SELECT/searchRegister';
import { tankOccurrenceSearch } from '../../../../../databases/TBREGISTRO/SELECT/tankOccurrenceSearch';
import { updateTankOccurrence } from '../../../../../databases/TBREGISTRO/UPDATE/updateTankOccurrence';
import { ProblemReportProps } from '../../../../../routes/types/approutes/appscreen';
import { validReceiveCurrentGpsLocationCoords } from '../../../../../services/GPS/validReceiveCurrentGpsLocationCoords';
import { RegisterItem } from '../../../../../types/registerItem';
import { RegisterItemDb } from '../../../../../types/registerItemDb';
import { RegistryItem } from '../../../../../types/registryItem';
import { currentDate } from '../../../../../utils/getCurrentDate';
import { currentTime } from '../../../../../utils/getCurrentTime';
import { returnOfImeiPermission } from '../../../../../utils/readPhoneStatePermission';
import { selectImageFromCameraOrStorage } from '../../../../../utils/selectImageFromCameraOrStorage';

interface ICaputureImage {
  imagesProblemReport: RegisterItem[];
  setImagesProblemReport: Dispatch<SetStateAction<RegisterItem[]>>;
  option?: 'camera' | 'storage';
}
interface IDataCaputureImage {
  data: ICaputureImage;
}
interface ICreatedRegisterCheck {
  valueResearch: string;
  idCollectItem: string;
  idCollect: string | number;
  idCarreteiro: string | number;
  itemCollect?: string | null;
}

interface IHandleImageCapture {
  insertIdRegister: string | number | boolean;
  imagesProblemReport?: RegisterItem[];
}

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}
interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
}
interface IHandleValidProblemReport
  extends ISetTypeAndOpenModal,
    ProblemReportProps {
  imagesProblemReport?: RegisterItem[];
  valueResearch: string;
  idCollectItem: string;
  idCollect: string | number;
  idCarreteiro: string | number;
  itemCollect?: string | null;
  DFIDITEMCOLETA: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
  ref: ICustomFormButtonRef;
}
interface INavigateTankOptions {
  idCollectItem?: string;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setNavigation?: () => void;
}

interface IReturnReport {
  DFIDCOLETA: number;
  DFIDCOLETAAPP: number;
  DFIDITEMCOLETA: number;
  DFIDITEMCOLETAAPP: number;
  setValueResearch: Dispatch<SetStateAction<string>>;
  setImagesProblemReport?: Dispatch<
    SetStateAction<RegisterItem[] | RegisterItemDb[]>
  >;
}

interface IReturnScreenImages {
  insertIdRegister?: string | number | boolean;
  setImagesProblemReport?: Dispatch<
    SetStateAction<RegisterItem[] | RegisterItemDb[]>
  >;
}

interface ICreateOrUpdateProblemReport extends ProblemReportProps {
  DFIDITEMCOLETA: number;
  DFIDITEMCOLETAAPP: number;
  DFOBSERVACAO: string;
  valueResearch: string;
  idCollect: string | number;
  idCarreteiro: string | number;
  itemCollect?: string | null;
  imagesProblemReport?: RegisterItem[];
  setLoading: Dispatch<SetStateAction<boolean>>;
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

const returnScreenImages = async ({
  insertIdRegister,
  setImagesProblemReport,
}: IReturnScreenImages) => {
  const db = await getDBConnection();
  searchTbItemRegistro({
    db,
    DFIDREGISTROAPP: insertIdRegister,
  }).then(res => {
    setImagesProblemReport(res);
  });
};

const returnReport = async ({
  DFIDCOLETA,
  DFIDCOLETAAPP,
  DFIDITEMCOLETA,
  DFIDITEMCOLETAAPP,
  setValueResearch,
  setImagesProblemReport,
}: IReturnReport) => {
  const db = await getDBConnection();
  tankOccurrenceSearch({
    db,
    DFIDCOLETA,
    DFIDCOLETAAPP,
    DFIDITEMCOLETA,
    DFIDITEMCOLETAAPP,
  }).then(res => {
    setValueResearch(String(res !== false ? res[0].DFOBSERVACAO : ''));
    if (res !== false) {
      returnScreenImages({
        insertIdRegister: res[0].DFIDREGISTROAPP,
        setImagesProblemReport,
      });
    }
  });
};

const executeCaputureImage = ({ data }: IDataCaputureImage) => {
  const { imagesProblemReport, setImagesProblemReport, option } = data;
  selectImageFromCameraOrStorage({
    option,
    setImages: setImagesProblemReport,
    images: imagesProblemReport,
  });
};

const handleSelectImage = ({ data }: IDataCaputureImage) => {
  Alert.alert(
    'Selecionar opção',
    'Escolha uma opção para carregar foto da amostra analisada',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Câmera',
        style: 'default',
        onPress: () =>
          executeCaputureImage({
            data: {
              ...data,
              option: 'camera',
            },
          }),
      },
      {
        text: 'Galeria',
        style: 'default',
        onPress: () =>
          executeCaputureImage({
            data: {
              ...data,
              option: 'storage',
            },
          }),
      },
    ],
  );
};

const createdRegisterCheck = async ({
  idCollectItem,
  idCarreteiro,
  idCollect,
  itemCollect,
  valueResearch,
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
            DFTIPOREGISTRO: 'O',
            DFIDCOLETAAPP: idCollect,
            DFIDITEMCOLETA: itemCollect,
            DFIDITEMCOLETAAPP: idCollectItem,
            DFOBSERVACAO: valueResearch,
            DFIMEI: res,
            DFIDCARRETEIRO: idCarreteiro,
            geometry,
          })
            .then(resulId => {
              if (resulId !== null && geometry !== undefined) {
                insertTbRegistro({
                  db,
                  DFDATAREGISTRO: currentDate(),
                  DFHORAREGISTRO: currentTime(),
                  DFTIPOREGISTRO: 'G',
                  DFIDCOLETAAPP: idCollect,
                  DFIDITEMCOLETAAPP: null,
                  DFOBSERVACAO: 'geolocalização observção!',
                  DFIMEI: res,
                  DFIDCARRETEIRO: idCarreteiro,
                  geometry,
                }).then(res => {
                  const id = resulId;
                  resolver(id);
                  return id;
                });
              }
            })
            .catch(() => {
              return false;
            });
        }
      });
    } catch (error) {}
  });
};

const handleImageCapture = async ({
  insertIdRegister,
  imagesProblemReport,
}: IHandleImageCapture) => {
  const db = await getDBConnection();
  for (let i = 0; i <= imagesProblemReport.length - 1; i += 1) {
    const { DFREGISTROIMAGEM, DFIDREGISTROAPP } = imagesProblemReport[i];
    if (!DFIDREGISTROAPP) {
      insertItemRegistro({
        db,
        DFIDREGISTROAPP: insertIdRegister,
        DFREGISTROIMAGEM,
      });
    }
  }
};

const createOrUpdateProblemReport = async ({
  DFIDITEMCOLETAAPP,
  DFIDITEMCOLETA,
  DFOBSERVACAO,
  idCarreteiro,
  idCollect,
  valueResearch,
  itemCollect,
  imagesProblemReport,
  navigation,
  setLoading,
  route,
}: ICreateOrUpdateProblemReport) => {
  const db = await getDBConnection();
  searchRegister({
    db,
    DFTIPOREGISTRO: 'O',
    DFIDITEMCOLETAAPP,
    DFIDITEMCOLETA,
  }).then(res => {
    if (res) {
      updateTankOccurrence({
        db,
        DFIDITEMCOLETA,
        DFIDITEMCOLETAAPP,
        DFOBSERVACAO,
      }).then(_ => {
        for (let i = 0; i <= imagesProblemReport.length - 1; i += 1) {
          const { DFREGISTROIMAGEM, DFIDREGISTROAPP } = imagesProblemReport[i];
          if (!DFIDREGISTROAPP) {
            insertItemRegistro({
              db,
              DFIDREGISTROAPP: res,
              DFREGISTROIMAGEM,
            });
            navigation.goBack();
            navigation.goBack();
            setLoading(false);
          }
        }
      });
    } else {
      createdRegisterCheck({
        idCarreteiro,
        idCollect,
        idCollectItem: String(DFIDITEMCOLETAAPP),
        valueResearch,
        itemCollect,
      }).then(res => {
        handleImageCapture({ insertIdRegister: res, imagesProblemReport });
        navigation.goBack();
        navigation.goBack();
        setLoading(false);
      });
    }
    navigation.goBack();
    navigation.goBack();
  });
};

const handleValidProblemReport = async ({
  idCarreteiro,
  idCollect,
  idCollectItem,
  valueResearch,
  imagesProblemReport,
  itemCollect,
  isOpen,
  setIsOpen,
  setModalType,
  navigation,
  setLoading,
  DFIDITEMCOLETA,
  route,
  ref,
}: IHandleValidProblemReport) => {
  const { disableButton, enableButton } = ref;
  disableButton();
  setLoading(true);
  if (valueResearch !== undefined && imagesProblemReport.length > 0) {
    return createOrUpdateProblemReport({
      DFIDITEMCOLETA,
      DFIDITEMCOLETAAPP: Number(idCollectItem),
      DFOBSERVACAO: valueResearch,
      idCarreteiro,
      idCollect,
      navigation,
      setLoading,
      valueResearch,
      imagesProblemReport,
      itemCollect,
      route,
    }).catch(() => {
      setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
      setLoading(false);
      enableButton();
    });
  }
  setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
  setLoading(false);
  enableButton();
};

export {
  returnReport,
  handleSelectImage,
  handleValidProblemReport,
  handleNavigateTankOptionsAndCloseModal,
  openModal,
  returnScreenImages,
};
