import { getDBConnection } from '../../databases/conection';
import { deleteTable } from '../../databases/select/delete/deleteTable';
import { InsertTbPropriedade } from '../../databases/TBPROPRIEDADE/INSERT/InsertTbPropriedade';
import { GetApi } from '../../types/getApi';

const getAllProperty = async ({
  META_COLLECT_API,
  setLoadWagonerMessage,
}: GetApi): Promise<boolean> => {
  const db = await getDBConnection();

  return new Promise(resolve => {
    try {
      META_COLLECT_API.get(`/propriedade?hasPagination=false`)
        .then(res => {
          setLoadWagonerMessage('Sicronizando as propriedades');
          const { propriedades } = res.data;
          deleteTable({ db, table: 'TBPROPRIEDADE' });
          for (let propriedade in propriedades) {
            InsertTbPropriedade({
              db,
              DFATIVOINATIVO: propriedades[propriedade].DFATIVOINATIVO,
              DFCNPJCPFCEI: propriedades[propriedade].DFCNPJCPFCEI,
              DFIDPROPRIEDADE: propriedades[propriedade].DFIDPROPRIEDADE,
              DFIDSIGLAUF: propriedades[propriedade].DFIDSIGLAUF,
              DFLOGRADOURO: propriedades[propriedade].DFLOGRADOURO,
              DFMATRICULA: propriedades[propriedade].DFMATRICULA,
              DFNOMEMUNICIPIO: propriedades[propriedade].DFNOMEMUNICIPIO,
              DFNOMEPRODUTOR: propriedades[propriedade].DFNOMEPRODUTOR,
              DFNOMEPROPRIEDADE: propriedades[propriedade].DFNOMEPROPRIEDADE,
              DFNUMERO: propriedades[propriedade].DFNUMERO,
            }).then(res => {
              if (res) {
                if (Number(propriedade) === propriedades.length - 1) {
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

export { getAllProperty };
