import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';

interface IInsertCollectApi {
  db: SQLiteDatabase;
  insertCollect: Collect;
}

const insertCollectApi = async ({
  db,
  insertCollect,
}: IInsertCollectApi): Promise<string | number> => {
  const {
    DFIDCARRETEIRO,
    DFIDLINHA,
    DFIDVEICULO,
    DFIDREGIONAL,
    DFSTATUS,
    DFORDEMCOLETA,
    DFIDCOLETA,
    DFIDCOLETAERP,
    DFDATACOLETA,
    DFDATASAIDA,
    DFHORACOLETA,
    DFHORASAIDA,
    DFIMEI,
    DFKMINICIAL,
    DFKMFINAL,
    DFCOLETASICRONIZADA,
    DFBLOQUEIOERP,
    DFDATAPROGRAMADA,
  } = insertCollect;
  const queryInsert = `
  INSERT INTO TBCOLETA (
    DFIDCARRETEIRO,
    DFIDLINHA,
    DFIDVEICULO,
    DFIDREGIONAL,
    DFSTATUS,
    DFORDEMCOLETA,
    DFIDCOLETA,
    DFIDCOLETAERP,
    DFDATACOLETA,
    DFDATASAIDA,
    DFHORACOLETA,
    DFHORASAIDA,
    DFIMEI,
    DFKMINICIAL,
    DFKMFINAL,
    DFCOLETASICRONIZADA,
    DFDATAPROGRAMADA,
    DFBLOQUEIOERP
  )
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            `${DFIDCARRETEIRO || ''}`,
            `${DFIDLINHA || ''}`,
            `${DFIDVEICULO || ''}`,
            `${DFIDREGIONAL || ''}`,
            `${DFSTATUS || ''}`,
            `${DFORDEMCOLETA}`,
            `${DFIDCOLETA || ''}`,
            `${DFIDCOLETAERP || ''}`,
            `${DFDATACOLETA || ''}`,
            `${DFDATASAIDA || ''}`,
            `${DFHORACOLETA || ''}`,
            `${DFHORASAIDA || ''}`,
            `${DFIMEI || ''}`,
            `${DFKMINICIAL || ''}`,
            `${DFKMFINAL || ''}`,
            `${DFCOLETASICRONIZADA || ''}`,
            `${DFDATAPROGRAMADA || ''}`,
            `${DFBLOQUEIOERP || ''}`,
          ],
          (tx, { insertId }) => {
            resolve(insertId);
            return insertId;
          },
          _ => null,
        );
      });
    } catch (error) {
      resolve('');
      return '';
    }
  });
};

export { insertCollectApi };
