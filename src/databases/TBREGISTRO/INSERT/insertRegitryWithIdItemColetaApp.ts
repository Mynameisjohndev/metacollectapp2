import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { validReceiveCurrentGpsLocationCoords } from '../../../services/GPS/validReceiveCurrentGpsLocationCoords';
import { Register } from '../../../types/register';
import { searchRegister } from '../SELECT/searchRegister';
import { insertTbRegistro } from './insertTbRegistro';

interface IInsertRegitryWithIdItemColetaApp extends Register {
  db: SQLiteDatabase;
  geometry: any;
}
const insertRegitryWithIdItemColetaApp = async ({
  db,
  DFDATAREGISTRO,
  DFHORAREGISTRO,
  DFTIPOREGISTRO,
  DFIDCOLETAAPP,
  DFIDITEMCOLETAAPP,
  DFOBSERVACAO,
  DFIMEI,
  DFIDCARRETEIRO,
  DFIDITEMCOLETA,
  DFIDCOLETA,
  geometry,
}: IInsertRegitryWithIdItemColetaApp): Promise<string | boolean | number> => {
  return new Promise(resolver => {
    try {
      searchRegister({ db, DFTIPOREGISTRO, DFIDITEMCOLETAAPP, DFIDITEMCOLETA })
        .then(res => {
          if (res !== false) {
            const option = res;
            resolver(option);
            return option;
          }
          insertTbRegistro({
            db,
            DFDATAREGISTRO,
            DFHORAREGISTRO,
            DFTIPOREGISTRO,
            DFIDITEMCOLETAAPP,
            DFIDCOLETAAPP,
            DFIDCOLETA,
            DFOBSERVACAO,
            DFIMEI,
            DFIDCARRETEIRO,
            geometry,
          }).then(res => {
            resolver(res);
            return res;
          });
          return false;
        })
        .catch(() => {
          return false;
        });
    } catch (error) {}
  });
};

export { insertRegitryWithIdItemColetaApp };
