/* eslint-disable no-async-promise-executor */
import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { ICustomFormButtonRef } from '../../../../components/Buttons/CustomFormButton';
import { getDBConnection } from '../../../../databases/conection';
import { selectValidDateAndTimeTbColeta } from '../../../../databases/TBCOLETA/SELECT/selectValidDateandTimeTbColeta';
import { updateTbColeta } from '../../../../databases/TBCOLETA/UPDATE/updateTbColeta';
import { countCollectItensWithStatusCollected } from '../../../../databases/TBITEMCOLETA/SELECT/countCollectItensWithStatusCollected';
import { selectCollectItemByCollectId } from '../../../../databases/TBITEMCOLETA/SELECT/selectCollectItemByCollectId';
import { selectCollectItemByTankAndCollectId } from '../../../../databases/TBITEMCOLETA/SELECT/selectCollectItemByTankAndCollectId';
import { insertRegitryWithDfIdColetaApp } from '../../../../databases/TBREGISTRO/INSERT/insertRegitryWithDfIdColetaApp';
import { insertTbRegistro } from '../../../../databases/TBREGISTRO/INSERT/insertTbRegistro';
import { MyCollectProps } from '../../../../routes/types/approutes/appscreen';
import { validReceiveCurrentGpsLocationCoords } from '../../../../services/GPS/validReceiveCurrentGpsLocationCoords';
import { stopTask } from '../../../../services/Task/stopTask';
import { Tank } from '../../../../types/tank';
import { currentDate } from '../../../../utils/getCurrentDate';
import { currentTime } from '../../../../utils/getCurrentTime';
import { returnOfImeiPermission } from '../../../../utils/readPhoneStatePermission';
import { IOpenModal } from '../tankOptions/services';

interface IHandleFinalizeAndUpdateCollect {
  DFIDCOLETAAPP: number;
  DFIDCARRETEIRO: number;
  geometry: any;
  // setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
  // setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setEndCollectLoading?: Dispatch<SetStateAction<boolean>>;
  kmfinal?: number;
  setIsOpenEndCollect?: Dispatch<SetStateAction<boolean>>;
}

interface IGetQuantityTankAndStoredMilk {
  setLoadingGetQuantityTankAndStoredMilk: Dispatch<SetStateAction<boolean>>;
  DFIDCOLETAAPP: number;
  setTankInfo: Dispatch<SetStateAction<string>>;
}

interface IValidExistenceOfUncollectedTanks {
  DFIDCOLETAAPP: number;
  db: SQLiteDatabase;
}

interface IHandleStartCollect {
  setCollectLoading: Dispatch<SetStateAction<boolean>>;
  navigateProps: MyCollectProps;
  DFIDCOLETAAPP: number;
  DFIDCOLETA: number;
  DFIDCARRETEIRO: number;
  ref: ICustomFormButtonRef;
}
interface IHandleInsertAndUpdateRegister {
  DFIDCOLETAAPP: number;
  DFIDCOLETA: number;
  DFIDCARRETEIRO: number;
}

interface IHandleOpenScreenAndReadQrcode {
  navigateProps: MyCollectProps;
  readTank: Tank;
  setSearchTank: Dispatch<SetStateAction<boolean>>;
  DFIDCOLETAAPP: number;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const openModal = ({ setIsOpen, isOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

const insertRegisterAndUpdateCollect = async ({
  DFIDCOLETAAPP,
  DFIDCARRETEIRO,
  geometry,
  kmfinal,
}: IHandleFinalizeAndUpdateCollect): Promise<boolean> => {
  return new Promise(resolve => {
    returnOfImeiPermission().then(async res => {
      const db = await getDBConnection();
      if (typeof res === 'string') {
        insertTbRegistro({
          db,
          DFDATAREGISTRO: currentDate(),
          DFHORAREGISTRO: currentTime(),
          DFTIPOREGISTRO: 'D',
          DFIDCOLETAAPP,
          DFIDCOLETA: '',
          DFIDITEMCOLETAAPP: null,
          DFOBSERVACAO: 'Registro da descarga!',
          DFIMEI: res,
          DFIDCARRETEIRO,
          geometry,
        }).then(async id => {
          if (id) {
            updateTbColeta({
              db,
              DFSTATUS: 'D',
              DFIDCOLETAAPP,
              DFDATACOLETA: currentDate(),
              DFHORACOLETA: currentTime(),
              DFKMFINAL: kmfinal.toString(),
            })
              .then(res => {
                if (res === true) {
                  stopTask();
                  resolve(res);
                  return res;
                }
              })
              .catch(_ => {
                resolve(false);
                return false;
              });
          }
        });
      }
    });
  });
};

const validExistenceOfUncollectedTanks = ({
  DFIDCOLETAAPP,
  db,
}: IValidExistenceOfUncollectedTanks) => {
  return new Promise(async resolve => {
    const collectItens = await selectCollectItemByCollectId({
      db,
      DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
    });
    const otherCollectItensStatusIsCollected =
      await countCollectItensWithStatusCollected({
        db,
        DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
      });
    if (otherCollectItensStatusIsCollected < collectItens.length) {
      resolve(true);
      return true;
    }
    resolve(false);
    return false;
  });
};

const handleFinalizeAndUpdateCollect = async ({
  DFIDCOLETAAPP,
  DFIDCARRETEIRO,
  geometry,
  setEndCollectLoading,
  kmfinal,
  setIsOpenEndCollect,
}: IHandleFinalizeAndUpdateCollect): Promise<boolean> => {
  setEndCollectLoading(true);
  return new Promise(async resolve => {
    insertRegisterAndUpdateCollect({
      DFIDCARRETEIRO,
      DFIDCOLETAAPP,
      geometry,
      kmfinal,
    }).then(res => {
      if (res === true) {
        setEndCollectLoading(false);
        setIsOpenEndCollect(false);
        resolve(res);
        return res;
      }
    });
  });
};

const getQuantityTankAndStoredMilk = async ({
  DFIDCOLETAAPP,
  setLoadingGetQuantityTankAndStoredMilk,
  setTankInfo,
}: IGetQuantityTankAndStoredMilk) => {
  setLoadingGetQuantityTankAndStoredMilk(true);
  const db = await getDBConnection();
  const collectItens = await selectCollectItemByCollectId({
    db,
    DFIDCOLETAAPP,
  });
  const otherCollectItensStatusIsCollected =
    await countCollectItensWithStatusCollected({
      db,
      DFIDCOLETAAPP,
    });
  const storageMilk = collectItens.reduce(
    (acumulador, conta) => acumulador + Number(conta.DFQTDPREVISTA),
    0,
  );
  setTankInfo(
    `${otherCollectItensStatusIsCollected}/${collectItens.length} - ${storageMilk} Litros`,
  );
};

const handleInsertAndUpdateRegister = async ({
  DFIDCOLETAAPP,
  DFIDCOLETA,
  DFIDCARRETEIRO,
}: IHandleInsertAndUpdateRegister): Promise<boolean> => {
  return new Promise<boolean>(resolver => {
    returnOfImeiPermission().then(async res => {
      const db = await getDBConnection();
      let geometry = await validReceiveCurrentGpsLocationCoords();
      if (typeof res === 'string') {
        insertRegitryWithDfIdColetaApp({
          db,
          DFDATAREGISTRO: currentDate(),
          DFHORAREGISTRO: currentTime(),
          DFTIPOREGISTRO: 'A',
          DFIDCOLETAAPP,
          DFIDCOLETA: DFIDCOLETA === null ? '' : DFIDCOLETA,
          DFIDITEMCOLETAAPP: null,
          DFOBSERVACAO: 'Registro do início da coleta!',
          DFIMEI: res,
          DFIDCARRETEIRO,
        })
          .then(resultado => {
            if (resultado === null && geometry !== undefined) {
              insertTbRegistro({
                db,
                DFDATAREGISTRO: currentDate(),
                DFHORAREGISTRO: currentTime(),
                DFTIPOREGISTRO: 'G',
                DFIDCOLETAAPP,
                DFIDCOLETA,
                DFIDITEMCOLETAAPP: null,
                DFOBSERVACAO: 'Registro da geolocalização!',
                DFIMEI: res,
                DFIDCARRETEIRO,
                geometry,
              });
            }
            resolver(true);
            return true;
          })
          .catch(error => {
            resolver(false);
            return false;
          });
      } else {
        resolver(false);
        return false;
      }
    });
  });
};

const handleStartCollect = async ({
  setCollectLoading,
  navigateProps,
  DFIDCARRETEIRO,
  DFIDCOLETA,
  DFIDCOLETAAPP,
  ref,
}: IHandleStartCollect) => {
  const { disableButton, enableButton } = ref;
  disableButton();
  const { navigation } = navigateProps;
  setCollectLoading(true);
  const db = await getDBConnection();
  selectValidDateAndTimeTbColeta({
    db,
    DFDATASAIDA: currentDate(),
    DFHORASAIDA: currentTime(),
  });
  handleInsertAndUpdateRegister({
    DFIDCARRETEIRO,
    DFIDCOLETA,
    DFIDCOLETAAPP,
  })
    .then(() => {
      setCollectLoading(false);
      navigation.navigate('StartCollect', {
        idCollect: DFIDCOLETAAPP,
      });
      enableButton();
    })
    .catch(() => {
      setCollectLoading(false);
      enableButton();
    });
};

const executeSearchReadQrcodeTankExistsInYourCollect = async ({
  navigateProps,
  readTank,
  DFIDCOLETAAPP,
  setSearchTank,
  setIsOpen,
  setModalType,
}: IHandleOpenScreenAndReadQrcode) => {
  const { navigation } = navigateProps;
  if (readTank && readTank.DFIDTANQUE) {
    const { DFIDTANQUE } = readTank;
    setSearchTank(true);
    const db = await getDBConnection();
    selectCollectItemByTankAndCollectId({ db, DFIDCOLETAAPP, DFIDTANQUE })
      .then(tank => {
        if (tank) {
          navigation.navigate('TankOptions', { tank });
        } else {
          Alert.alert(
            'Tanque encontrado',
            'O tanque selecionado não consta na rota, deseja continuar?',
            [
              {
                text: 'Não',
                style: 'cancel',
              },
              {
                text: 'Sim',
                style: 'destructive',
                onPress: () =>
                  navigation.navigate('TankRescue', { First: { DFIDTANQUE } }),
              },
            ],
          );
        }
        return setSearchTank(false);
      })
      .catch(() => {
        setSearchTank(false);
        setIsOpen(true);
        setModalType(2);
      });
  } else {
    setSearchTank(false);
    setIsOpen(true);
    setModalType(2);
  }
};

export {
  handleFinalizeAndUpdateCollect,
  getQuantityTankAndStoredMilk,
  openModal,
  validExistenceOfUncollectedTanks,
  handleStartCollect,
  executeSearchReadQrcodeTankExistsInYourCollect,
};
