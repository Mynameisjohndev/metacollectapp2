import { getDBConnection } from '../../databases/conection';
import { deleteTable } from '../../databases/select/delete/deleteTable';
import { upsertTbConfuguracao } from '../../databases/TBCONFIGURACAO/INSERT/upsertTbConfuguracao';
import { GetApi } from '../../types/getApi';
import { upsertConfig } from '../POST/TBCONFIGURACAO';

const getAllConfig = async ({
  META_COLLECT_API,
  setLoadWagonerMessage,
  DFIDCARRETEIRO,
  DFIMEI,
}: GetApi): Promise<boolean> => {
  const db = await getDBConnection();

  return new Promise(resolve => {
    try {
      upsertConfig({ DFIDCARRETEIRO: Number(DFIDCARRETEIRO), DFIMEI })
        .then(res => {
          setLoadWagonerMessage('Sicronizando dados para nuvem');
          if (res) {
            META_COLLECT_API.get(`/configuracao`)
              .then(res => {
                const { configuracoes } = res.data;
                deleteTable({ db, table: 'TBCONFIGURACAO' });
                for (let configuracao in configuracoes) {
                  upsertTbConfuguracao({
                    db,
                    config: configuracoes[configuracao],
                  });
                  if (Number(configuracao) === configuracoes.length - 1) {
                    resolve(true);
                    return true;
                  }
                }
              })
              .catch(error => {
                resolve(false);
                return false;
              });
          }
        })
        .catch(error => {
          resolve(false);
          return false;
        });
    } catch (erro) {
      resolve(false);
      return false;
    }
  });
};

export { getAllConfig };
