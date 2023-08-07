import { getDBConnection } from '../../databases/conection';
import { deleteTable } from '../../databases/select/delete/deleteTable';
import { InsertTbVeiculo } from '../../databases/TBVEICULO/INSERT/insertTbVeiculo';
import { GetApi } from '../../types/getApi';

const getAllVehicle = async ({
  META_COLLECT_API,
  setLoadWagonerMessage,
}: GetApi): Promise<boolean> => {
  const db = await getDBConnection();

  return new Promise(resolve => {
    try {
      META_COLLECT_API.get(`/veiculo?hasPagination=false`)
        .then(res => {
          setLoadWagonerMessage('Sicronizando os veículos');
          const { unidades } = res.data;
          deleteTable({ db, table: 'TBVEICULO' });
          for (let unidade in unidades) {
            InsertTbVeiculo({
              db,
              DFATIVO: unidades[unidade].DFATIVO,
              DFDESCVEICULO: unidades[unidade].DFDESCVEICULO,
              DFIDVEICULO: unidades[unidade].DFIDVEICULO,
              DFPLACAVEICULO: unidades[unidade].DFPLACAVEICULO,
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

export { getAllVehicle };
