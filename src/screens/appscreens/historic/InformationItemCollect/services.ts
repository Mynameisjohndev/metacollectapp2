import { Dispatch, SetStateAction } from 'react';

import { getDBConnection } from '../../../../databases/conection';
import { itemInformationCollect } from '../../../../databases/TBITEMCOLETA/SELECT/distributionScreen/itemInformationCollect';
import { producerDataResearch } from '../../../../databases/TBITEMCOLETA/SELECT/distributionScreen/producerDataResearch';
import { searchTbItemRegistro } from '../../../../databases/TBITEMREGISTRO/SELECT/searchTbItemRegistro';
import { searchRegister } from '../../../../databases/TBREGISTRO/SELECT/searchRegister';
import { vehicleMouthData } from '../../../../databases/TBTANQUEVEICULO/SELECT/vehicleMouthData';
import { CollectItem } from '../../../../types/collectItem';
import { ProducerData } from '../../../../types/producerData';
import { RegistryItem } from '../../../../types/registryItem';
import { VehicleMouthData } from '../../../../types/vehicleMouthData';

interface IInformationItemCollect {
  setCollectItem: Dispatch<SetStateAction<CollectItem>>;
  idCollectItem: number;
  setloadCollectItem: Dispatch<SetStateAction<boolean>>;
}

interface IExecuteGetRegisterByCollectItem {
  idCollectItem: number;
  setImagesTemperature: Dispatch<SetStateAction<RegistryItem[]>>;
  setImagesQuality: Dispatch<SetStateAction<RegistryItem[]>>;
  setloadImages: Dispatch<SetStateAction<boolean>>;
}

interface IExecuteGetTankVehicle {
  DFIDCOLETAAPP: number;
  setLoadStorage: Dispatch<SetStateAction<boolean>>;
  setVehicleTank: Dispatch<SetStateAction<VehicleMouthData[]>>;
}

interface IExecuteGetProducerDistribuition {
  DFIDCOLETAAPP: number;
  DFIDITEMCOLETAAPP: number;
  setLoadDistribuition: Dispatch<SetStateAction<boolean>>;
  setProducers: Dispatch<SetStateAction<ProducerData[]>>;
}

const executeGetCollectItemformation = async ({
  idCollectItem,
  setCollectItem,
  setloadCollectItem,
}: IInformationItemCollect) => {
  const db = await getDBConnection();
  itemInformationCollect({ db, DFIDITEMCOLETAAPP: String(idCollectItem) })
    .then(res => {
      if (res.length > 0) {
        setCollectItem(res[0]);
        setloadCollectItem(false);
      }
    })
    .catch(error => {
      setloadCollectItem(false);
    });
};

const executeGetRegisterByCollectItem = async ({
  idCollectItem,
  setImagesQuality,
  setImagesTemperature,
  setloadImages,
}: IExecuteGetRegisterByCollectItem) => {
  const db = await getDBConnection();
  try {
    searchRegister({
      db,
      DFTIPOREGISTRO: 'Q',
      DFIDITEMCOLETAAPP: idCollectItem,
    }).then(res => {
      searchTbItemRegistro({ db, DFIDREGISTROAPP: res }).then(imageResponse => {
        setImagesQuality(imageResponse as unknown as RegistryItem[]);
        setloadImages(false);
      });
    });
    searchRegister({
      db,
      DFTIPOREGISTRO: 'T',
      DFIDITEMCOLETAAPP: idCollectItem,
    }).then(res => {
      searchTbItemRegistro({ db, DFIDREGISTROAPP: res }).then(imageResponse => {
        setImagesTemperature(imageResponse as unknown as RegistryItem[]);
        setloadImages(false);
      });
    });
    setloadImages(false);
  } catch (error) {
    setloadImages(false);
  }
};

const executeGetTankVehicle = async ({
  DFIDCOLETAAPP,
  setLoadStorage,
  setVehicleTank,
}: IExecuteGetTankVehicle) => {
  const db = await getDBConnection();
  try {
    vehicleMouthData({
      db,
      DFIDCOLETAAPP,
    }).then(res => {
      setVehicleTank(res);
      setLoadStorage(false);
    });
  } catch (error) {
    setLoadStorage(false);
  }
};

const executeGetProducerDistribuition = async ({
  DFIDCOLETAAPP,
  DFIDITEMCOLETAAPP,
  setLoadDistribuition,
  setProducers,
}: IExecuteGetProducerDistribuition) => {
  const db = await getDBConnection();
  try {
    producerDataResearch({
      db,
      DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
      DFIDITEMCOLETAAPP: Number(DFIDITEMCOLETAAPP),
    }).then(res => {
      setProducers(res);
      setLoadDistribuition(false);
    });
  } catch (error) {
    setLoadDistribuition(false);
  }
};

export {
  executeGetCollectItemformation,
  executeGetRegisterByCollectItem,
  executeGetTankVehicle,
  executeGetProducerDistribuition,
};
