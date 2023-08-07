import { getDBConnection } from '../../databases/conection';
import { deleteTable } from '../../databases/select/delete/deleteTable';
import { InsertTbSilo } from '../../databases/TBSILO/INSERT/insertTbSilo';
import { GetApi } from '../../types/getApi';

const getAllSilo = async ({
  META_COLLECT_API,
  setLoadWagonerMessage,
}: GetApi): Promise<boolean> => {
  const db = await getDBConnection();

  return new Promise(resolve => {
    try {
      META_COLLECT_API.get(`/silo?hasPagination=false`)
        .then(res => {
          setLoadWagonerMessage('Sicronizando os silos');
          const { unidades } = res.data;
          deleteTable({ db, table: 'TBSILO' });
          for (let unidade in unidades) {
            InsertTbSilo({
              db,
              DFCAPACIDADE: unidades[unidade].DFCAPACIDADE,
              DFCOLETASELETIVA: unidades[unidade].DFCOLETASELETIVA,
              DFDESCRICAOSILO: unidades[unidade].DFDESCRICAOSILO,
              DFIDSILO: unidades[unidade].DFIDSILO,
              DFIDUNIDADE: unidades[unidade].DFIDUNIDADE,
            }).then(res => {
              if (res) {
                if (Number(unidade) === unidades.length - 1) {
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

export { getAllSilo };
