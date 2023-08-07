import { META_COLLECT_API } from '..';

import { upsertTbConfuguracao } from '../../databases/TBCONFIGURACAO/INSERT/upsertTbConfuguracao';
import { selectWagonerConfig } from '../../databases/TBCONFIGURACAO/SELECT/selectWagonerConfig';
import { getDBConnection } from '../../databases/conection';

interface IUpsertConfig {
  DFIDCARRETEIRO: number;
  DFIMEI: string;
}

const upsertConfig = async ({
  DFIDCARRETEIRO,
  DFIMEI,
}: IUpsertConfig): Promise<boolean> => {
  const db = await getDBConnection();

  await upsertTbConfuguracao({
    db,
    config: {
      DFIDCARRETEIRO: Number(DFIDCARRETEIRO),
      DFIMEI,
    },
  });

  const config = await selectWagonerConfig({
    db,
    DFIDCARRETEIRO: Number(DFIDCARRETEIRO),
  });

  const responseConfig = {
    ...config[0],
    DFIMEI,
  };

  return new Promise(resolve => {
    if (responseConfig) {
      try {
        return META_COLLECT_API.post(`/configuracao/criar`, [responseConfig])
          .then(_ => {
            resolve(true);
            return true;
          })
          .catch(_ => {
            resolve(true);
            return true;
          });
      } catch (_) {
        resolve(false);
        return false;
      }
    } else {
      resolve(true);
      return true;
    }
  });
};

export { upsertConfig };
