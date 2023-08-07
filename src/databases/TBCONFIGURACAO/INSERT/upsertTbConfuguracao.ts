import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Config } from '../../../types/config';
import { currentDate } from '../../../utils/getCurrentDate';
import { currentTime } from '../../../utils/getCurrentTime';

interface IUpsertTbConfuguracao {
  db: SQLiteDatabase;
  config: Config;
}

const upsertTbConfuguracao = async ({
  db,
  config,
}: IUpsertTbConfuguracao): Promise<boolean> => {
  const {
    DFIDCARRETEIRO,
    DFREGUAATRAS,
    DFDISTRIBUIR,
    DFDATASINCRONIZACAO,
    DFHORASINCRONIZACAO,
    DFQUALIDADE,
    DFIMEI,
  } = config;

  const date = currentDate();
  const time = currentTime();
  const queryInsert = `
    INSERT OR REPLACE INTO TBCONFIGURACAO(
      DFIDCARRETEIRO,DFREGUAATRAS,DFDISTRIBUIR,
      DFQUALIDADE,DFDATASINCRONIZACAO, DFHORASINCRONIZACAO, DFIMEI
    )
    VALUES (?,?,?,?,?,?,?);
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            `${DFIDCARRETEIRO}`,
            `${DFREGUAATRAS || 'N'}`,
            `${DFDISTRIBUIR || 'S'}`,
            `${DFQUALIDADE || 'S'}`,
            `${DFDATASINCRONIZACAO || date}`,
            `${DFHORASINCRONIZACAO || time}`,
            `${DFIMEI ? `"${DFIMEI}"` : null}`,
          ],
          _ => {
            resolve(true);
            return true;
          },
          _ => null,
        );
      });
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};

export { upsertTbConfuguracao };
