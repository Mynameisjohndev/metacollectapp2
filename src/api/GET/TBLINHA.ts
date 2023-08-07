import { getDBConnection } from '../../databases/conection';
import { deleteTable } from '../../databases/select/delete/deleteTable';
import { insertTbLinha } from '../../databases/TBLINHA/INSERT/insertTbLinha';
import { GetApi } from '../../types/getApi';

const getAllLine = async ({
  META_COLLECT_API,
  setLoadWagonerMessage,
}: GetApi): Promise<boolean> => {
  const db = await getDBConnection();

  return new Promise(resolve => {
    try {
      META_COLLECT_API.get(`/linha?hasPagination=false`)
        .then(res => {
          setLoadWagonerMessage('Sicronizando as linhas');
          const { linhas } = res.data;
          deleteTable({ db, table: 'TBLINHA' });
          for (let linha in linhas) {
            insertTbLinha({
              db,
              DFATIVO: linhas[linha].DFATIVO,
              DFIDCARRETEIRO: linhas[linha].DFIDCARRETEIRO,
              DFIDLINHA: linhas[linha].DFIDLINHA,
              DFIDREGIONAL: linhas[linha].DFIDREGIONAL,
              DFIDUNIDADE: linhas[linha].DFIDUNIDADE,
              DFNOMELINHA: linhas[linha].DFNOMELINHA,
            }).then(res => {
              if (res) {
                if (Number(linha) === linhas.length - 1) {
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

export { getAllLine };
