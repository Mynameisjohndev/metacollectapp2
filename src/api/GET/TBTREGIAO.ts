import { getDBConnection } from '../../databases/conection';
import { deleteTable } from '../../databases/select/delete/deleteTable';
import { InsertTbRegional } from '../../databases/TBREGIONAL/INSERT/insertTbRegional';
import { GetApi } from '../../types/getApi';

const getAllRegion = async ({
  META_COLLECT_API,
  setLoadWagonerMessage,
}: GetApi): Promise<boolean> => {
  const db = await getDBConnection();

  return new Promise(resolve => {
    try {
      META_COLLECT_API.get(`/regiao?hasPagination=false`)
        .then(res => {
          setLoadWagonerMessage('Sicronizando as regiões');
          const { unidades } = res.data;
          deleteTable({ db, table: 'TBREGIONAL' });
          for (let unidade in unidades) {
            InsertTbRegional({
              db,
              DFDESCREGIONAL: unidades[unidade].DFDESCREGIONAL,
              DFIDREGIONAL: unidades[unidade].DFIDREGIONAL,
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

export { getAllRegion };
