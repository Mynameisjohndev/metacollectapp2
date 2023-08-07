import { getDBConnection } from '../../databases/conection';
import { deleteTable } from '../../databases/select/delete/deleteTable';
import { InsertTbUnidade } from '../../databases/TBUNIDADE/INSERT/insertTbUnidade';
import { GetApi } from '../../types/getApi';

const getAllUnities = async ({
  META_COLLECT_API,
  setLoadWagonerMessage,
}: GetApi): Promise<boolean> => {
  const db = await getDBConnection();

  return new Promise(resolve => {
    try {
      META_COLLECT_API.get(`/unidade?hasPagination=false`)
        .then(res => {
          setLoadWagonerMessage('Sicronizando as unidades');
          const { unidades } = res.data;
          deleteTable({ db, table: 'TBUNIDADE' });
          for (let unidade in unidades) {
            InsertTbUnidade({
              db,
              DFCNPJCPFCEI: unidades[unidade].DFCNPJCPFCEI,
              DFIDUNIDADE: unidades[unidade].DFIDUNIDADE,
              DFNOMEFANTASIA: unidades[unidade].DFNOMEFANTASIA,
              DFRAZSOCUNIDADE: unidades[unidade].DFRAZSOCUNIDADE,
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
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};
export { getAllUnities };
