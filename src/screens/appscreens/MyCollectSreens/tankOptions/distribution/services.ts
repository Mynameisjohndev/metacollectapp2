import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { ICustomFormButtonRef } from '../../../../../components/Buttons/CustomFormButton';
import { getDBConnection } from '../../../../../databases/conection';
import { producerDataResearch } from '../../../../../databases/TBITEMCOLETA/SELECT/distributionScreen/producerDataResearch';
import { selectDistribution } from '../../../../../databases/TBITEMCOLETA/SELECT/distributionScreen/selectDistribution';
import { returnTbProdutorColeta } from '../../../../../databases/TBPRODUTORCOLETA/SELECT/returnTbProdutorColeta';
import { searchTbProdutorColetaCollectItem } from '../../../../../databases/TBPRODUTORCOLETA/SELECT/searchTbProdutorColetaCollectItem';
import { updateTbProdutorColeta } from '../../../../../databases/TBPRODUTORCOLETA/UPDATE/updateTbProdutorColeta';
import { selectTbProperty } from '../../../../../databases/TBPROPRIEDADE/SELECT/selectTbProperty';
import {
  DistributionProps,
  TankOptionsProps,
} from '../../../../../routes/types/approutes/appscreen';
import { CollectItem } from '../../../../../types/collectItem';
import { ProducerCollect } from '../../../../../types/producerCollect';
import { ProducerData } from '../../../../../types/producerData';
import { Property } from '../../../../../types/property';
import { TankBond } from '../../../../../types/tankBond';
import { IDataEndTankCollectObject, validEndTankCollect } from '../services';

interface IInformVolume {
  idCollectItem: string | number;
  tankCode: string | number;
  setVolume: Dispatch<SetStateAction<string | number>>;
  setStorage: Dispatch<SetStateAction<string | number>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

interface ISurplusDistribution {
  storage: string | number;
  volume: string | number;
  setSurplus: Dispatch<SetStateAction<string>>;
  setTitleSurplusAndMissing: Dispatch<
    SetStateAction<'Execedente' | 'Restante'>
  >;
}

interface IProducingData {
  DFIDCOLETAAPP: number;
  DFIDITEMCOLETAAPP: number;
  setProducers: Dispatch<SetStateAction<ProducerData[]>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  DFQTDPREVISTA: number;
}
interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
}
interface IValidDistribution extends ISetTypeAndOpenModal {
  volume: string | number;
  storage: string | number;
  dataEndTankCollect: boolean[];
  collectItemTankOptions: CollectItem;
  dataEndTankCollectObject: IDataEndTankCollectObject;
  producersCollects: ProducerCollect[];
  idCollect: string | number;
  DFIDITEMCOLETAAPP: number;
  navigator: DistributionProps;
  idCollectItemCloud: string;
  setLoadingButton: Dispatch<SetStateAction<boolean>>;
  ref: ICustomFormButtonRef;
}

interface INavigateTankOptions {
  idCollectItem?: string;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setNavigation?: () => void;
}

interface INavigateInformDistribution {
  setNavigation?: () => void;
}

interface INalidDischargeCollectWithTankHaveOneProducer {
  producer: ProducerData;
  db: SQLiteDatabase;
  setLoading: Dispatch<SetStateAction<boolean>>;
  DFQTDPREVISTA: number;
  DFIDCOLETAAPP: number;
  setProducers: Dispatch<SetStateAction<ProducerData[]>>;
}
interface IExecuteSearchTbProdutorColetaCollectItem {
  DFIDITEMCOLETAAPP: number;
  setProducersCollects: Dispatch<SetStateAction<ProducerCollect[]>>;
  setLoadingListProperty: Dispatch<SetStateAction<boolean>>;
  setLoadingNewProperty: Dispatch<SetStateAction<boolean>>;
}

interface ILoadListProperty {
  setPropertyList: Dispatch<SetStateAction<Property[]>>;
}
interface IDistributionInformation
  extends IExecuteSearchTbProdutorColetaCollectItem,
    ISurplusDistribution,
    ISetTypeAndOpenModal {
  DFIDCOLETAAPP: number;
  DFQTDPREVISTA: number;
  tankBond: TankBond[];
  setPropertyList: Dispatch<SetStateAction<Property[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setVolume: Dispatch<SetStateAction<string>>;
  setStorage: Dispatch<SetStateAction<string>>;
  setProducers: Dispatch<SetStateAction<ProducerData[]>>;
}

const openModal = ({ setIsOpen, isOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

const loadListProperty = async ({ setPropertyList }: ILoadListProperty) => {
  const db = await getDBConnection();
  selectTbProperty({ db }).then(response => {
    setPropertyList(response);
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

const handleCloseAndOpenPropertyModal = ({ setIsOpen, isOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

const informVolume = async ({
  idCollectItem,
  setVolume,
  setStorage,
  setLoading,
}: IInformVolume) => {
  const db = await getDBConnection();
  selectDistribution({
    db,
    DFIDITEMCOLETAAPP: idCollectItem,
  })
    .then(res => {
      if (res.length > 0) {
        const { DFQTDPREVISTA, DFQTDENTRADA } = res[0];
        if (DFQTDPREVISTA !== null) {
          setVolume(DFQTDPREVISTA);
          if (DFQTDENTRADA !== null) {
            setStorage(DFQTDENTRADA);
          } else {
            setStorage('');
          }
        } else {
          setVolume('');
          if (DFQTDENTRADA !== null) {
            setStorage(DFQTDENTRADA);
          } else {
            setStorage('');
          }
        }
      }
    })
    .catch(() => {
      setLoading(false);
    });
};

const surplusDistribution = async ({
  storage,
  volume,
  setSurplus,
  setTitleSurplusAndMissing,
}: ISurplusDistribution) => {
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

const validDischargeCollectWithTankHaveOneProducer = async ({
  db,
  producer,
  setLoading,
  DFQTDPREVISTA,
  DFIDCOLETAAPP,
  setProducers,
}: INalidDischargeCollectWithTankHaveOneProducer) => {
  const { DFIDITEMCOLETAAPP, DFIDPROPRIEDADE } = producer;
  returnTbProdutorColeta({ db, DFIDITEMCOLETAAPP, DFIDPROPRIEDADE })
    .then(res => {
      let countProducers = 0;
      for (let i in res) {
        if (Number(res[i].DFQTDENTRADA) === 0) {
          countProducers += 1;
        }
      }
      if (countProducers === 1 && res.length === 1 && DFQTDPREVISTA > 0) {
        return Alert.alert(
          'Descarga de tanque',
          'Você possui somente um produtor, deseja descarregar toda litragem para ele?',
          [
            { text: 'Não', style: 'cancel', onPress: () => setLoading(false) },
            {
              text: 'Sim',
              onPress: async () => {
                await updateTbProdutorColeta({
                  db,
                  DFIDITEMCOLETAAPP,
                  DFIDPROPRIEDADE,
                  DFQTDENTRADA: DFQTDPREVISTA,
                }).then(async () => {
                  await producerDataResearch({
                    db,
                    DFIDCOLETAAPP,
                    DFIDITEMCOLETAAPP: Number(DFIDITEMCOLETAAPP),
                  }).then(res => {
                    // setProducers([]);
                    setProducers(res);
                  });
                });
              },
            },
          ],
        );
      }
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
    });
};

const producingData = async ({
  DFIDCOLETAAPP,
  DFIDITEMCOLETAAPP,
  setProducers,
  setLoading,
  DFQTDPREVISTA,
}: IProducingData) => {
  const db = await getDBConnection();
  producerDataResearch({
    db,
    DFIDCOLETAAPP,
    DFIDITEMCOLETAAPP,
  })
    .then(res => {
      if (res.length === 1) {
        setProducers(res);
        return validDischargeCollectWithTankHaveOneProducer({
          producer: res[0],
          db,
          setLoading,
          DFQTDPREVISTA,
          DFIDCOLETAAPP,
          setProducers,
        });
      }
      setProducers(res);
      return setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
};

const validDistribution = ({
  volume,
  storage,
  isOpen,
  setIsOpen,
  setModalType,
  navigator,
  collectItemTankOptions,
  dataEndTankCollect,
  dataEndTankCollectObject,
  idCollect,
  DFIDITEMCOLETAAPP,
  producersCollects,
  type,
  idCollectItemCloud,
  setLoadingButton,
  ref,
}: IValidDistribution) => {
  const { disableButton, enableButton } = ref;
  disableButton();
  setLoadingButton(true);
  if (volume > storage) {
    enableButton();
    setLoadingButton(false);
    return setTypeAndOpenModal({
      isOpen,
      setIsOpen,
      setModalType,
      type: 0,
    });
  }
  validEndTankCollect({
    collectItemTankOptions,
    dataEndTankCollect,
    dataEndTankCollectObject,
    idCollect,
    idCollectItem: DFIDITEMCOLETAAPP,
    producersCollects,
    navigator,
    isOpen,
    setIsOpen,
    setModalType,
    type,
    hasDistribuition: true,
    idCollectItemCloud,
    ref,
    setEndLoading: setLoadingButton,
  })
    .then(() => {
      enableButton();
      setLoadingButton(false);
    })
    .catch(() => {
      enableButton();
      setLoadingButton(false);
    });
};

const executeSearchTbProdutorColetaCollectItem = async ({
  DFIDITEMCOLETAAPP,
  setLoadingListProperty,
  setLoadingNewProperty,
  setProducersCollects,
}: IExecuteSearchTbProdutorColetaCollectItem) => {
  const db = await getDBConnection();
  await searchTbProdutorColetaCollectItem({
    db,
    DFIDITEMCOLETAAPP,
  })
    .then(res => {
      setProducersCollects(res);
      setLoadingListProperty(false);
      setLoadingNewProperty(false);
    })
    .catch(() => {
      setLoadingListProperty(false);
      setLoadingNewProperty(false);
    });
};

const distributionInformation = async ({
  setLoading,
  setPropertyList,
  DFIDITEMCOLETAAPP,
  setLoadingListProperty,
  setLoadingNewProperty,
  setProducersCollects,
  setStorage,
  setVolume,
  tankBond,
  setSurplus,
  setTitleSurplusAndMissing,
  storage,
  volume,
  DFIDCOLETAAPP,
  DFQTDPREVISTA,
  setProducers,
  isOpen,
  setIsOpen,
  setModalType,
}: IDistributionInformation) => {
  loadListProperty({ setPropertyList });
  setLoading(true);
  executeSearchTbProdutorColetaCollectItem({
    DFIDITEMCOLETAAPP,
    setLoadingListProperty,
    setLoadingNewProperty,
    setProducersCollects,
  });
  informVolume({
    idCollectItem: DFIDITEMCOLETAAPP,
    setStorage,
    setVolume,
    tankCode: tankBond[0].DFIDTANQUE,
    setLoading,
  })
    .then(() => {
      surplusDistribution({
        setSurplus,
        storage,
        volume,
        setTitleSurplusAndMissing,
      })
        .then(() => {
          if (storage !== null) {
            producingData({
              DFIDCOLETAAPP,
              DFIDITEMCOLETAAPP,
              setProducers,
              setLoading,
              DFQTDPREVISTA: Number(DFQTDPREVISTA),
            });
          }
        })
        .catch(() =>
          setTypeAndOpenModal({
            isOpen,
            setIsOpen,
            setModalType,
            type: 1,
          }),
        );
    })
    .catch(() =>
      setTypeAndOpenModal({
        isOpen,
        setIsOpen,
        setModalType,
        type: 1,
      }),
    );
};

const handleNavigateTankOptionsAndCloseModal = ({
  isOpen,
  setIsOpen,
  setNavigation,
}: INavigateTankOptions) => {
  openModal({ isOpen, setIsOpen });
  setNavigation();
};

const handleNavigateInformDistribution = ({
  setNavigation,
}: INavigateInformDistribution) => {
  setNavigation();
};

export {
  informVolume,
  surplusDistribution,
  producingData,
  validDistribution,
  openModal,
  handleNavigateTankOptionsAndCloseModal,
  handleNavigateInformDistribution,
  loadListProperty,
  handleCloseAndOpenPropertyModal,
  distributionInformation,
};
