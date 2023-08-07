import { getDBConnection } from '../databases/conection';
import { insertRegitryWithIdItemColetaApp } from '../databases/TBREGISTRO/INSERT/insertRegitryWithIdItemColetaApp';
import { insertTbRegistro } from '../databases/TBREGISTRO/INSERT/insertTbRegistro';
import { searchRegister } from '../databases/TBREGISTRO/SELECT/searchRegister';
import { validReceiveCurrentGpsLocationCoords } from '../services/GPS/validReceiveCurrentGpsLocationCoords';
import { currentDate } from './getCurrentDate';
import { currentTime } from './getCurrentTime';
import { returnOfImeiPermission } from './readPhoneStatePermission';

interface IHandleInsertRegitry {
  idCollectItem: string;
  idCollectCloud: string;
  idCollectItemCloud: string;
  idCollect: string | number;
  idWagoner: string | number;
  imei?: string | boolean;
}
const handleInsertRegitry = async ({
  idCollectItem,
  idCollect,
  idWagoner,
  idCollectCloud,
  idCollectItemCloud,
}: IHandleInsertRegitry) => {
  const db = await getDBConnection();
  let geometry = await validReceiveCurrentGpsLocationCoords();
  returnOfImeiPermission().then(res => {
    if (typeof res === 'string') {
      searchRegister({
        db,
        DFTIPOREGISTRO: 'C',
        DFIDITEMCOLETAAPP: idCollectItem,
        DFIDITEMCOLETA: idCollectItemCloud,
      }).then(register => {
        if (register === false) {
          return insertRegitryWithIdItemColetaApp({
            db,
            DFDATAREGISTRO: currentDate(),
            DFHORAREGISTRO: currentTime(),
            DFTIPOREGISTRO: 'N',
            DFIDCOLETAAPP: idCollect,
            DFIDCOLETA: idCollectCloud,
            DFIDITEMCOLETAAPP: idCollectItem,
            DFIDITEMCOLETA: idCollectItemCloud,
            DFOBSERVACAO: 'Não coletou',
            DFIMEI: res,
            DFIDCARRETEIRO: idWagoner,
            geometry,
          }).then(resultado => {
            // Adicionei o diferente de undefined para o geometry
            if (resultado !== null && geometry !== undefined) {
              insertTbRegistro({
                db,
                DFDATAREGISTRO: currentDate(),
                DFHORAREGISTRO: currentTime(),
                DFTIPOREGISTRO: 'G',
                DFIDCOLETAAPP: idCollect,
                DFIDCOLETA: idCollectCloud,
                DFIDITEMCOLETAAPP: null,
                DFOBSERVACAO: 'Registro da geolocalização!',
                DFIMEI: res,
                DFIDCARRETEIRO: idWagoner,
                geometry,
              });
            }
          });
        }
      });
    }
  });
};

export { handleInsertRegitry };
