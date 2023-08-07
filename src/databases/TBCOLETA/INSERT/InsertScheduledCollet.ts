import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';

interface IInsertScheduledCollet extends Collect {
  db: SQLiteDatabase;
}

const InsertScheduledCollet = async ({
  db,
  DFIDCOLETA,
  DFIDCOLETAERP,
  DFORDEMCOLETA,
  DFIDCARRETEIRO,
  DFIDLINHA,
  DFIDVEICULO,
  DFIDREGIONAL,
  DFIMEI,
  DFSTATUS,
  DFKMINICIAL,
}: IInsertScheduledCollet) => {
  const queryInsert = `
    INSERT INTO TBCOLETA (
      DFIDCOLETA,
      DFIDCOLETAERP,
      DFORDEMCOLETA,
      DFIDCARRETEIRO,
      DFIDLINHA,
      DFIDVEICULO,
      DFIDREGIONAL,
      DFIMEI,
      DFSTATUS,
      DFKMINICIAL)
    VALUES (?,?,?,?,?,?,?,?,?,?);
  `;

  await db.transaction(tx => {
    tx.executeSql(
      queryInsert,
      [
        DFIDCOLETA,
        DFIDCOLETAERP,
        DFORDEMCOLETA,
        DFIDCARRETEIRO,
        DFIDLINHA,
        DFIDVEICULO,
        DFIDREGIONAL,
        DFIMEI,
        DFSTATUS,
        DFKMINICIAL,
      ],
      (tx, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { InsertScheduledCollet };
