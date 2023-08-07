import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

import { ICustomFormButtonRef } from '../../../../../components/Buttons/CustomFormButton';
import { getDBConnection } from '../../../../../databases/conection';
import { deleteImage } from '../../../../../databases/TBITEMCOLETA/SELECT/screenTankOptions/deleteImage';
import { UpdateInformQuality } from '../../../../../databases/TBITEMCOLETA/SELECT/screenTankOptions/updateInformQuality';
import { searchTbItemColeta } from '../../../../../databases/TBITEMCOLETA/SELECT/searchTbItemColeta';
import { insertItemRegistro } from '../../../../../databases/TBITEMREGISTRO/INSERT/insertItemRegistro';
import { searchTbItemRegistro } from '../../../../../databases/TBITEMREGISTRO/SELECT/searchTbItemRegistro';
import { insertRegitryWithIdItemColetaApp } from '../../../../../databases/TBREGISTRO/INSERT/insertRegitryWithIdItemColetaApp';
import { InformQualityProps } from '../../../../../routes/types/approutes/appscreen';
import { validReceiveCurrentGpsLocationCoords } from '../../../../../services/GPS/validReceiveCurrentGpsLocationCoords';
import { RegisterItem } from '../../../../../types/registerItem';
import { RegisterItemDb } from '../../../../../types/registerItemDb';
import { currentDate } from '../../../../../utils/getCurrentDate';
import { currentTime } from '../../../../../utils/getCurrentTime';
import { returnOfImeiPermission } from '../../../../../utils/readPhoneStatePermission';
import { selectImageFromCameraOrStorage } from '../../../../../utils/selectImageFromCameraOrStorage';
import { handleInsertRegitry } from '../../../../../utils/startRecord';

interface ICaputureImage {
  imagesQuality: RegisterItem[];
  setImagesQuality: Dispatch<SetStateAction<RegisterItem[]>>;
  imagesTemperature: RegisterItem[];
  setImagesTemperature: Dispatch<SetStateAction<RegisterItem[]>>;
  option?: 'camera' | 'storage';
  type?: 'temperature' | 'quality';
}

interface IDataCaputureImage {
  data: ICaputureImage;
}

interface ICreatedRegisterCheck {
  idCollectItem: string;
  idCollect: string | number;
  idCarreteiro: string | number;
  itemCollect?: string | null;
}

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}
interface INavigateTankOptions {
  idCollectItem?: string;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setNavigation?: () => void;
}
interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>>;
}

interface ISelectItemCollect extends ISetTypeAndOpenModal, InformQualityProps {
  selectedAlizarol?: 'Sim' | 'Não';
  selectedTypeAlizarol?: '72' | '74' | '76' | '80' | '82';
  selectedSensory?: 'Caracteristico' | 'Não caracteristico';
  selectedQualitySample?: 'Sim' | 'Não';
  sample?: string;
  seal?: string;
  idCollectItem?: string;
  imagesQuality?: RegisterItem[];
  imagesTemperature?: RegisterItem[];
  insertIdRegister?: string | number | boolean;
}

interface IHandleTemperatureImageCapture {
  insertIdRegisterTemperature: string | number | boolean;
  imagesTemperature?: RegisterItem[];
}
interface IHandleValidationForm
  extends ISetTypeAndOpenModal,
    InformQualityProps {
  selectedAlizarol?: 'Sim' | 'Não';
  selectedTypeAlizarol?: '72' | '74' | '76' | '80' | '82';
  selectedSensory?: 'Caracteristico' | 'Não caracteristico';
  selectedQualitySample?: 'Sim' | 'Não';
  sample?: string;
  seal?: string;
  idCollectItem?: string;
  imagesQuality?: RegisterItem[];
  imagesTemperature?: RegisterItem[];
  insertIdRegister?: string | number | boolean;
  insertIdRegisterTemperature?: string | number | boolean;
  idCollect: string | number;
  idWagoner: string | number;
  idCollectCloud: string;
  idCollectItemCloud: string;
  hasQuality: boolean;
  setCollectLoading: Dispatch<SetStateAction<boolean>>;
  ref: ICustomFormButtonRef;
}

interface IReturnScreenQuality {
  idCollectItem: number;
  insertIdRegister?: string | number | boolean;
  imagesQuality?: RegisterItem[];
  setImagesQuality?: Dispatch<SetStateAction<RegisterItem[]>>;
  setSelectedAlizarol?: Dispatch<SetStateAction<'Sim' | 'Não'>>;
  setSelectedTypeAlizarol?: Dispatch<
    SetStateAction<'72' | '74' | '76' | '80' | '82'>
  >;
  setSelectedSensory?: Dispatch<
    SetStateAction<'Caracteristico' | 'Não caracteristico'>
  >;
  setSelectedQualitySample?: Dispatch<SetStateAction<any>>;
  selectedQualitySample?: 'Sim' | 'Não';
  setSample?: Dispatch<SetStateAction<string>>;
  setSeal?: Dispatch<SetStateAction<string>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}
interface IReturnScreenQualityImages {
  insertIdRegister?: string | number | boolean;
  setImagesQuality?: Dispatch<
    SetStateAction<RegisterItem[] | RegisterItemDb[]>
  >;
  setLoadingImagesQuality?: Dispatch<SetStateAction<boolean>>;
}
interface IReturnScreenTemperaturaImages {
  insertIdRegisterTemperature?: string | number | boolean;
  setImagesTemperature?: Dispatch<
    SetStateAction<RegisterItem[] | RegisterItemDb[]>
  >;
  setLoadingImagesTemperature?: Dispatch<SetStateAction<boolean>>;
}

interface IHandleRemoveImage {
  images: RegisterItem[];
  setImages: Dispatch<SetStateAction<RegisterItem[]>>;
  image: {
    item: RegisterItem;
    index: number;
  };
}

interface ISelectedRemoveImage {
  image: {
    item: RegisterItem;
    index: number;
  };
}

const openModal = ({ setIsOpen, isOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

const handleCloseAndOpenSensoryModal = ({ isOpen, setIsOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

const handleCloseAndOpenTypeAlizarol = ({ isOpen, setIsOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

const handleCloseAndOpenAlizarol = ({ isOpen, setIsOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

const handleCloseAndOpenQualitySample = ({ isOpen, setIsOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
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

const executeCaputureImage = ({ data }: IDataCaputureImage) => {
  const {
    imagesQuality,
    imagesTemperature,
    setImagesQuality,
    setImagesTemperature,
    option,
    type,
  } = data;
  if (type === 'quality') {
    return selectImageFromCameraOrStorage({
      option,
      setImages: setImagesQuality,
      images: imagesQuality,
    });
  }
  return selectImageFromCameraOrStorage({
    option,
    setImages: setImagesTemperature,
    images: imagesTemperature,
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

const returnScreenQuality = async ({
  idCollectItem,
  setSample,
  setSeal,
  setSelectedAlizarol,
  setSelectedSensory,
  setSelectedTypeAlizarol,
  setSelectedQualitySample,
  setLoading,
}: IReturnScreenQuality) => {
  const db = await getDBConnection();
  searchTbItemColeta({ db, DFIDITEMCOLETAAPP: idCollectItem }).then(res => {
    const {
      DFALIZAROL,
      DFTIPOALIZAROL,
      DFSENSORIAL,
      DFCOLETOUAMOSTRA,
      DFCOLETOULACRE,
    } = res[0];
    if (
      DFSENSORIAL === 'Caracteristico' ||
      DFSENSORIAL === 'Não caracteristico'
    ) {
      setSelectedQualitySample(DFCOLETOUAMOSTRA === '' ? 'Não' : 'Sim');
      setSelectedAlizarol(DFALIZAROL === 'S' ? 'Sim' : 'Não');
      setSelectedTypeAlizarol(DFTIPOALIZAROL);
      setSelectedSensory(DFSENSORIAL);
      setSample(DFCOLETOUAMOSTRA === '' ? '' : DFCOLETOUAMOSTRA);
      setSeal(DFCOLETOULACRE === '' ? '' : DFCOLETOULACRE);
      setLoading(false);
    }
    setLoading(false);
  });
};

const returnScreenQualityImages = async ({
  insertIdRegister,
  setImagesQuality,
  setLoadingImagesQuality,
}: IReturnScreenQualityImages) => {
  const db = await getDBConnection();
  searchTbItemRegistro({ db, DFIDREGISTROAPP: insertIdRegister })
    .then(res => {
      setImagesQuality(res);
      setLoadingImagesQuality(false);
    })
    .catch(() => {
      setLoadingImagesQuality(false);
    });
};

const returnScreenTemperatureImages = async ({
  insertIdRegisterTemperature,
  setImagesTemperature,
  setLoadingImagesTemperature,
}: IReturnScreenTemperaturaImages) => {
  const db = await getDBConnection();
  searchTbItemRegistro({
    db,
    DFIDREGISTROAPP: insertIdRegisterTemperature,
  })
    .then(res => {
      setImagesTemperature(res);
      setLoadingImagesTemperature(false);
    })
    .catch(() => {
      setLoadingImagesTemperature(false);
    });
};

const createdRegisterCheck = async ({
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
            DFTIPOREGISTRO: 'Q',
            DFIDCOLETAAPP: idCollect,
            DFIDITEMCOLETA: itemCollect,
            DFIDITEMCOLETAAPP: idCollectItem,
            DFOBSERVACAO: 'Registro da qualidade!',
            DFIMEI: res,
            DFIDCARRETEIRO: idCarreteiro,
            geometry,
          })
            .then(res => {
              const id = res;
              resolver(id);
              return id;
            })
            .catch(() => {
              return false;
            });
        }
      });
    } catch (error) {}
  });
};

const createdRegisterChecktTemperature = async ({
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
            })
            .catch(() => {
              return false;
            });
        }
      });
    } catch (error) {}
  });
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

const handleUpdateQualityCollectItem = async ({
  selectedAlizarol,
  selectedTypeAlizarol,
  selectedSensory,
  sample,
  seal,
  idCollectItem,
  imagesQuality,
  insertIdRegister,
  isOpen,
  setIsOpen,
  setModalType,
  navigation,
  route,
}: ISelectItemCollect) => {
  const db = await getDBConnection();
  UpdateInformQuality({
    db,
    DFALIZAROL: selectedAlizarol,
    DFTIPOALIZAROL: selectedTypeAlizarol,
    DFSENSORIAL: selectedSensory,
    DFCOLETOUAMOSTRA: sample,
    DFCOLETOULACRE: seal,
    DFIDITEMCOLETAAPP: idCollectItem,
  }).then(res => {
    if (res === true) {
      for (let i = 0; i <= imagesQuality.length - 1; i += 1) {
        const { DFREGISTROIMAGEM, DFIDREGISTROAPP } = imagesQuality[i];
        if (!DFIDREGISTROAPP) {
          insertItemRegistro({
            db,
            DFIDREGISTROAPP: insertIdRegister,
            DFREGISTROIMAGEM,
          });
        }
      }
      navigation.replace('Informtemperature');
    }
  });
};

const handleTemperatureImageCapture = async ({
  insertIdRegisterTemperature,
  imagesTemperature,
}: IHandleTemperatureImageCapture) => {
  const db = await getDBConnection();
  for (let i = 0; i <= imagesTemperature.length - 1; i += 1) {
    const { DFREGISTROIMAGEM, DFIDREGISTROAPP } = imagesTemperature[i];
    if (!DFIDREGISTROAPP) {
      insertItemRegistro({
        db,
        DFIDREGISTROAPP: insertIdRegisterTemperature,
        DFREGISTROIMAGEM,
      });
    }
  }
};

const removeImage = async ({
  image,
  images,
  setImages,
}: IHandleRemoveImage) => {
  const filteredImages = images.filter((_, index) => index !== image.index);
  setImages(filteredImages);
  const { DFIDITEMREGISTROAPP, DFREGISTROIMAGEM } = image.item;
  if (DFIDITEMREGISTROAPP && DFREGISTROIMAGEM) {
    const db = await getDBConnection();
    deleteImage({ db, DFIDITEMREGISTROAPP, DFREGISTROIMAGEM });
  }
};

const handleAlertRemoveImage = ({
  image,
  images,
  setImages,
}: IHandleRemoveImage) => {
  Alert.alert(
    'Selecionar opção',
    'Escolha uma opção para carregar foto da amostra analisada',
    [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        style: 'default',
        onPress: () => removeImage({ image, images, setImages }),
      },
    ],
  );
};

const handleValidInformQuality = ({
  selectedAlizarol,
  selectedTypeAlizarol,
  selectedSensory,
  sample,
  seal,
  selectedQualitySample,
  idCollectItem,
  imagesQuality,
  imagesTemperature,
  insertIdRegister,
  insertIdRegisterTemperature,
  isOpen,
  setIsOpen,
  setModalType,
  idCollect,
  idWagoner,
  navigation,
  route,
  idCollectCloud,
  hasQuality,
  idCollectItemCloud,
  setCollectLoading,
  ref,
}: IHandleValidationForm) => {
  const { disableButton, enableButton } = ref;
  setCollectLoading(true);
  disableButton();
  try {
    if (selectedSensory === undefined) {
      setCollectLoading(false);
      enableButton();
      setTypeAndOpenModal({
        isOpen,
        setIsOpen,
        setModalType,
        type: 0,
      });
    } else if (selectedTypeAlizarol === undefined) {
      setCollectLoading(false);
      enableButton();
      setTypeAndOpenModal({
        isOpen,
        setIsOpen,
        setModalType,
        type: 1,
      });
    } else if (selectedAlizarol === undefined) {
      setCollectLoading(false);
      enableButton();
      setTypeAndOpenModal({
        isOpen,
        setIsOpen,
        setModalType,
        type: 2,
      });
    } else if (selectedQualitySample === undefined) {
      setCollectLoading(false);
      enableButton();
      setTypeAndOpenModal({
        isOpen,
        setIsOpen,
        setModalType,
        type: 3,
      });
    } else {
      if (selectedQualitySample === 'Sim') {
        if (
          sample === '' ||
          seal === '' ||
          (hasQuality && imagesQuality.length === 0)
        ) {
          setCollectLoading(false);
          enableButton();
          return setTypeAndOpenModal({
            isOpen,
            setIsOpen,
            setModalType,
            type: 5,
          });
        }
      }

      handleTemperatureImageCapture({
        insertIdRegisterTemperature,
        imagesTemperature,
      });

      handleInsertRegitry({
        idCollectItem,
        idCollect,
        idWagoner,
        idCollectCloud,
        idCollectItemCloud,
      });

      handleUpdateQualityCollectItem({
        selectedAlizarol,
        selectedTypeAlizarol,
        selectedSensory,
        sample,
        seal,
        idCollectItem,
        imagesQuality,
        imagesTemperature,
        insertIdRegister,
        isOpen,
        setIsOpen,
        setModalType,
        navigation,
        route,
      })
        .then(() => {
          setCollectLoading(false);
          enableButton();
        })
        .catch(() => {
          setCollectLoading(false);
          enableButton();
        });
    }
  } catch (error) {
    setCollectLoading(false);
    enableButton();
  }
};

export {
  handleSelectImage,
  createdRegisterCheck,
  createdRegisterChecktTemperature,
  handleValidInformQuality,
  handleUpdateQualityCollectItem,
  handleCloseAndOpenSensoryModal,
  handleCloseAndOpenTypeAlizarol,
  handleCloseAndOpenAlizarol,
  handleCloseAndOpenQualitySample,
  handleNavigateTankOptionsAndCloseModal,
  returnScreenQuality,
  openModal,
  returnScreenQualityImages,
  returnScreenTemperatureImages,
  handleAlertRemoveImage,
  IHandleRemoveImage,
  ISelectedRemoveImage,
};
