/* eslint-disable no-lonely-if */
import { Dispatch, SetStateAction } from 'react';

import { ICustomFormButtonRef } from '../../../../components/Buttons/CustomFormButton';
import { getDBConnection } from '../../../../databases/conection';
import { completedCollectTbItemColetaTbItemColeta } from '../../../../databases/TBITEMCOLETA/SELECT/completedCollectTbItemColetaTbItemColeta';
import { finishedregistrationTbItemColeta } from '../../../../databases/TBITEMCOLETA/SELECT/finishedregistrationTbItemColeta';
import {
  DistributionProps,
  TankOptionsProps,
} from '../../../../routes/types/approutes/appscreen';
import { CollectItem } from '../../../../types/collectItem';
import { ProducerCollect } from '../../../../types/producerCollect';
import { tankOptionsData } from './options';

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
}

interface IValidFinalize extends ISetTypeAndOpenModal {
  hasRuleBack: boolean;
  hasDischarge: boolean;
  collectItem: CollectItem;
  producersCollects: ProducerCollect;
}

interface IDataEndTankCollectObject {
  hasRuleBack: boolean;
  hasDischarge: boolean;
  hasQuality: boolean;
  hasRuleFront: boolean;
  hasStorage: boolean;
  hasVolume: boolean;
  hasTemperature: boolean;
}

interface IValidEndTankCollect extends ISetTypeAndOpenModal {
  dataEndTankCollect: boolean[];
  collectItemTankOptions: CollectItem;
  dataEndTankCollectObject: IDataEndTankCollectObject;
  producersCollects: ProducerCollect[];
  idCollect: string | number;
  idCollectItem: string | number;
  hasDistribuition?: boolean;
  navigator: TankOptionsProps | DistributionProps;
  idCollectItemCloud: string;
  ref: ICustomFormButtonRef;
  setEndLoading: Dispatch<SetStateAction<boolean>>;
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

const validEndTankCollect = async ({
  dataEndTankCollect,
  collectItemTankOptions,
  dataEndTankCollectObject,
  producersCollects,
  idCollect,
  idCollectItem,
  navigator,
  isOpen,
  setIsOpen,
  setModalType,
  hasDistribuition,
  idCollectItemCloud,
  setEndLoading,
  ref,
}: IValidEndTankCollect) => {
  const { disableButton, enableButton } = ref;
  disableButton();

  setEndLoading(true);
  const { navigation } = navigator;
  const {
    hasDischarge,
    hasQuality,
    hasRuleBack,
    hasRuleFront,
    hasStorage,
    hasTemperature,
    hasVolume,
  } = dataEndTankCollectObject;
  const configCount = dataEndTankCollect.filter(item => item === true).length;
  let validCount = 0;
  const {
    DFQTDPREVISTA,
    DFREGUAFRENTE,
    DFALIZAROL,
    DFTEMPERATURA,
    DFREGUAATRAS,
    DFQTDCOLETADA,
  } = collectItemTankOptions;

  for (let item in tankOptionsData) {
    const { id } = tankOptionsData[item];

    if (id === 1 && hasVolume) {
      if (DFQTDPREVISTA && DFQTDPREVISTA > '0') {
        validCount += 1;
      }
    }
    if (id === 2 && hasQuality) {
      if (DFALIZAROL) {
        validCount += 1;
      }
    }
    if (id === 3 && hasRuleFront) {
      if (DFREGUAFRENTE && DFREGUAFRENTE > '0') {
        validCount += 1;
      }
    }
    if (id === 4 && hasRuleBack) {
      if (DFREGUAATRAS && DFREGUAATRAS > '0') {
        validCount += 1;
      }
    }
    if (id === 5 && hasTemperature) {
      if (Number(DFTEMPERATURA) >= 0) {
        validCount += 1;
      }
    }
    if (id === 6 && hasStorage) {
      if (DFQTDCOLETADA && DFQTDCOLETADA > '0') {
        validCount += 1;
      }
    }
    if (id === 7 && hasDischarge && producersCollects.length > 0) {
      let countProducers = 0;
      for (let i in producersCollects) {
        if (Number(producersCollects[i].DFQTDENTRADA) > 0) {
          countProducers += 1;
        }
      }
      if (countProducers > 0) {
        validCount += 1;
      }
    }
  }
  if (configCount === validCount) {
    // return pode finalizar a coleta do tanque
    const db = await getDBConnection();
    completedCollectTbItemColetaTbItemColeta({
      db,
      DFIDITEMCOLETAAPP: String(idCollectItem),
      DFIDCOLETAAPP: idCollect,
    })
      .then(res => {
        if (res === true) {
          finishedregistrationTbItemColeta({
            db,
            DFIDITEMCOLETAAPP: String(idCollectItem),
            DFIDCOLETAAPP: idCollect,
            DFIDITEMCOLETA: idCollectItemCloud,
          }).then(res => {
            if (res && hasDistribuition) {
              navigation.goBack();
              navigation.goBack();
              setEndLoading(false);
              enableButton();
            } else if (res) {
              navigation.goBack();
              setEndLoading(false);
              enableButton();
            } else {
              setEndLoading(false);
              enableButton();
              setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 2 });
            }
          });
        }
      })
      .catch(() => {
        setEndLoading(false);
        enableButton();
        setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 1 });
      });
  } else {
    // return erro dizendo que a etapa de coleta ainda não foi concluida
    if (hasDistribuition) {
      setEndLoading(false);
      setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 3 });
    } else {
      setEndLoading(false);
      setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
    }
  }
};

const validFinalize = ({
  collectItem,
  producersCollects,
  hasDischarge,
  hasRuleBack,
  isOpen,
  setIsOpen,
  setModalType,
}: IValidFinalize): Promise<boolean> => {
  return new Promise(resolve => {
    if (collectItem !== undefined) {
      const {
        DFQTDPREVISTA,
        DFREGUAFRENTE,
        DFALIZAROL,
        DFTEMPERATURA,
        DFREGUAATRAS,
        DFQTDCOLETADA,
      } = collectItem!;
      if (hasDischarge && hasRuleBack) {
        if (
          DFQTDPREVISTA &&
          DFALIZAROL &&
          DFTEMPERATURA &&
          DFREGUAFRENTE &&
          DFREGUAATRAS &&
          DFQTDCOLETADA &&
          producersCollects
        ) {
          resolve(true);
          return true;
        }
        setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
        resolve(false);
        return false;
      }
      if (hasDischarge && !hasRuleBack) {
        if (
          DFQTDPREVISTA &&
          DFALIZAROL &&
          DFTEMPERATURA &&
          DFREGUAFRENTE &&
          DFQTDCOLETADA &&
          producersCollects
        ) {
          resolve(true);
          return true;
        }
        setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
        resolve(false);
        return false;
      }
      if (!hasDischarge && hasRuleBack) {
        if (
          DFQTDPREVISTA &&
          DFALIZAROL &&
          DFTEMPERATURA &&
          DFREGUAFRENTE &&
          DFREGUAATRAS &&
          DFQTDCOLETADA
        ) {
          setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
          resolve(true);
          return true;
        }
        resolve(false);
        return false;
      }
      if (!hasDischarge && !hasRuleBack) {
        if (
          DFQTDPREVISTA &&
          DFALIZAROL &&
          DFTEMPERATURA &&
          DFREGUAFRENTE &&
          DFQTDCOLETADA
        ) {
          resolve(true);
          return true;
        }
        setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
        resolve(false);
        return false;
      }
      setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
      resolve(false);
      return false;
    }
  });
};

export {
  validFinalize,
  openModal,
  validEndTankCollect,
  IDataEndTankCollectObject,
  IOpenModal,
};
