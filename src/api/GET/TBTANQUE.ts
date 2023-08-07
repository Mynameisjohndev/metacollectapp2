import { getDBConnection } from '../../databases/conection';
import { deleteTable } from '../../databases/select/delete/deleteTable';
import { InsertTbTanque } from '../../databases/TBTANQUE/INSERT/InsertTbTanque';
import { GetApi } from '../../types/getApi';

const getAllTank = async ({
  META_COLLECT_API,
  setLoadWagonerMessage,
}: GetApi): Promise<boolean> => {
  const db = await getDBConnection();

  return new Promise(resolve => {
    try {
      META_COLLECT_API.get(`/tanque?hasPagination=false`)
        .then(res => {
          setLoadWagonerMessage('Sicronizando os tanques');
          const { tanques } = res.data;
          deleteTable({ db, table: 'TBTANQUE' });
          for (let tanque in tanques) {
            InsertTbTanque({
              db,
              DFATIVO: tanques[tanque].DFATIVO,
              DFCOLETASELETIVA: tanques[tanque].DFCOLETASELETIVA,
              DFDESCTANQUE: tanques[tanque].DFDESCTANQUE,
              DFIDLINHA: tanques[tanque].DFIDLINHA,
              DFIDTANQUE: tanques[tanque].DFIDTANQUE,
            }).then(res => {
              if (res) {
                if (Number(tanque) === tanques.length - 1) {
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

export { getAllTank };
