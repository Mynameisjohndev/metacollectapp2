/* eslint-disable no-loop-func */
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { META_COLLECT_API } from '../../../../api';
import { updateRegisterById } from '../../../../databases/TBREGISTRO/UPDATE/updateRegisterById';
import { Register } from '../../../../types/register';
import { RegisterItemDb } from '../../../../types/registerItemDb';
import { createItemRegister } from '../ITEMREGISTRO';

interface ICreateRegisterBetch {
  DFIDCOLETA: string;
  DFIDCOLETAAPP: number;
  registerCollects: Register[];
  db: SQLiteDatabase;
}

interface ICreateRegisterWithItemRegister {
  DFIDCOLETA: string;
  DFIDCOLETAAPP: string;
  DFIDITEMCOLETA: string;
  DFIDITEMCOLETAAPP: string;
  registerCollects: Register[];
  registerItemCollect: RegisterItemDb[];
  db: SQLiteDatabase;
}

let countRegisterCollectItemStatusN = 0;
let countRegisterStatusS = 0;

const createRegisterBetch = ({
  DFIDCOLETA,
  db,
  registerCollects,
  DFIDCOLETAAPP,
}: ICreateRegisterBetch): Promise<boolean> => {
  const filterRegisterByDFIDCOLETA = registerCollects.filter(
    item =>
      item.DFIDCOLETAAPP === DFIDCOLETAAPP &&
      item.DFIDITEMCOLETAAPP === null &&
      item.DFREGISTROENVIADO === 'N',
  );

  return new Promise(resolve => {
    if (filterRegisterByDFIDCOLETA.length > 0) {
      META_COLLECT_API.post(
        `/registro/lote/criar?DFIDCOLETA=${DFIDCOLETA}`,
        filterRegisterByDFIDCOLETA,
      )
        .then(() => {
          for (let register in filterRegisterByDFIDCOLETA) {
            const { DFIDREGISTROAPP } = filterRegisterByDFIDCOLETA[register];
            updateRegisterById({ db, DFIDREGISTROAPP });
          }
          resolve(true);
          return true;
        })
        .catch(error => {
          for (let register in filterRegisterByDFIDCOLETA) {
            const { DFIDREGISTROAPP } = filterRegisterByDFIDCOLETA[register];
            updateRegisterById({ db, DFIDREGISTROAPP });
          }
          resolve(false);
          return false;
        });
    } else {
      resolve(true);
      return true;
    }
  });
};

const createRegisterWithItemRegister = ({
  DFIDCOLETA,
  DFIDCOLETAAPP,
  DFIDITEMCOLETA,
  DFIDITEMCOLETAAPP,
  registerCollects,
  registerItemCollect,
  db,
}: ICreateRegisterWithItemRegister): Promise<boolean> => {
  const filterRegisters = registerCollects.filter(
    item =>
      item.DFIDCOLETAAPP === Number(DFIDCOLETAAPP) &&
      item.DFIDITEMCOLETAAPP === Number(DFIDITEMCOLETAAPP),
  );

  return new Promise(resolve => {
    if (filterRegisters.length > 0) {
      for (let register in filterRegisters) {
        if (
          filterRegisters[register].DFREGISTROENVIADO === 'N' &&
          filterRegisters[register].DFTIPOREGISTRO === 'C' &&
          filterRegisters[register].DFIDREGISTRO !== null
        ) {
          const {
            DFIDREGISTROAPP,
            DFIDREGISTRO,
            DFOBSERVACAO,
            DFTIPOREGISTRO,
          } = filterRegisters[register];
          META_COLLECT_API.patch(`/registro/atualizar`, {
            DFIDREGISTRO,
            DFOBSERVACAO,
            DFREGISTROENVIADO: 'S',
            DFTIPOREGISTRO,
          })
            .then(_ => {
              updateRegisterById({
                db,
                DFIDREGISTROAPP,
                DFIDREGISTRO,
              });
              createItemRegister({
                db,
                DFIDREGISTRO,
                DFIDREGISTROAPP,
                registerItemCollect,
              }).then(resItemRegister => {
                if (resItemRegister === true) {
                  countRegisterCollectItemStatusN += 1;
                }
              });
            })
            .catch(_ => {
              resolve(false);
              return false;
            });
        } else if (
          filterRegisters[register].DFREGISTROENVIADO === 'N' &&
          filterRegisters[register].DFIDREGISTRO === null
        ) {
          let LOCALIZACAO = JSON.parse(filterRegisters[register].DFLOCALIZACAO);
          const { DFIDREGISTROAPP } = filterRegisters[register];
          META_COLLECT_API.post(`/registro/criar`, {
            ...filterRegisters[register],
            DFIDCOLETA,
            DFIDITEMCOLETA,

            DFREGISTROENVIADO: 'S',
            DFLOCALIZACAO: LOCALIZACAO,
          })
            .then(id => {
              updateRegisterById({
                db,
                DFIDREGISTROAPP,
                DFIDREGISTRO: id.data.id,
              });
              createItemRegister({
                db,
                DFIDREGISTRO: id.data.id,
                DFIDREGISTROAPP,
                registerItemCollect,
              });
            })
            .catch(_ => {
              resolve(false);
              return false;
            });
        } else {
          createItemRegister({
            registerItemCollect,
            db,
            DFIDREGISTRO: filterRegisters[register].DFIDREGISTRO,
            DFIDREGISTROAPP: filterRegisters[register].DFIDREGISTROAPP,
          }).then(res => {
            if (res === true) {
              countRegisterStatusS += 1;
            }
          });
        }
        let sumRegister =
          countRegisterCollectItemStatusN + countRegisterStatusS;
        if (filterRegisters.length === sumRegister) {
          resolve(true);
          return true;
        }
      }
    }
    resolve(true);
    return true;
  });
};

export { createRegisterWithItemRegister };

export { createRegisterBetch };
