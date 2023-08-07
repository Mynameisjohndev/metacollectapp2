import { getDBConnection } from '../../databases/conection';
import { deleteTable } from '../../databases/select/delete/deleteTable';
import { InsertTbTanqueVeiculo } from '../../databases/TBTANQUEVEICULO/INSERT/insertTbTanqueVeiculo';
import { GetApi } from '../../types/getApi';

const getAllVehicleTank = async ({
  META_COLLECT_API,
  setLoadWagonerMessage,
}: GetApi): Promise<boolean> => {
  const db = await getDBConnection();

  return new Promise(resolve => {
    try {
      META_COLLECT_API.get(`/tanqueveiculo?hasPagination=false`)
        .then(res => {
          setLoadWagonerMessage('Sicronizando os tanques dos veículos');
          const { tanqueveiculo } = res.data;
          deleteTable({ db, table: 'TBTANQUEVEICULO' });
          for (let tanqueveiculos in tanqueveiculo) {
            InsertTbTanqueVeiculo({
              db,
              DFBOCA: tanqueveiculo[tanqueveiculos].DFBOCA,
              DFCAPACIDADE: tanqueveiculo[tanqueveiculos].DFCAPACIDADE,
              DFCOLETASELETIVA: tanqueveiculo[tanqueveiculos].DFCOLETASELETIVA,
              DFIDVEICULO: tanqueveiculo[tanqueveiculos].DFIDVEICULO,
            }).then(res => {
              if (res) {
                if (Number(tanqueveiculos) === tanqueveiculo.length - 1) {
                  resolve(true);
                  return true;
                }
              }
            });
          }
        })
        .catch(() => {
          resolve(false);
          return false;
        });
    } catch (erro) {
      resolve(false);
      return false;
    }
  });
};

export { getAllVehicleTank };
