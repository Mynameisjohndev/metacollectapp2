import { getDBConnection } from '../../databases/conection';
import { deleteTable } from '../../databases/select/delete/deleteTable';
import { InsertTbVinculoTanque } from '../../databases/TBVINCULOTANQUE/INSERT/insertTbVinculoTanque';
import { GetApi } from '../../types/getApi';

const getAllBondTank = async ({
  META_COLLECT_API,
  setLoadWagonerMessage,
}: GetApi): Promise<boolean> => {
  const db = await getDBConnection();

  return new Promise(resolve => {
    try {
      META_COLLECT_API.get(`/vinculotanque?hasPagination=false`)
        .then(res => {
          setLoadWagonerMessage('Sicronizando os tanques vinculados');
          const { vinculos } = res.data;
          deleteTable({ db, table: 'TBVINCULOTANQUE' });
          for (let vinculo in vinculos) {
            InsertTbVinculoTanque({
              db,
              DFIDPROPRIEDADE: vinculos[vinculo].DFIDPROPRIEDADE,
              DFIDTANQUE: vinculos[vinculo].DFIDTANQUE,
              DFPROPRIETARIO: vinculos[vinculo].DFPROPRIETARIO,
            }).then(res => {
              if (res) {
                if (Number(vinculo) === vinculos.length - 1) {
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

export { getAllBondTank };
