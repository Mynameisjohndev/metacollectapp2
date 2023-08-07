import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Carreteiro } from '../../../types/wagoner';

interface IInsertTbCarreteiro extends Carreteiro {
  db: SQLiteDatabase;
}

const InsertTbCarreteiro = async ({
  db,
  DFIDCARRETEIRO,
  DFNOMECARRETEIRO,
  DFATIVO,
  DFCNPJCPFCEI,
  DFSENHA,
  DFLOGIN,
  DFIDVEICULO,
}: IInsertTbCarreteiro) => {
  const queryInsert = `
    INSERT INTO TBCARRETEIRO(
      DFIDCARRETEIRO,
      DFNOMECARRETEIRO,
      DFATIVO,
      DFCNPJCPFCEI,
      DFSENHA,
      DFLOGIN,
      DFIDVEICULO
    )
    VALUES (?,?,?,?,?,?,?);
  `;

  await db.transaction(tx => {
    tx.executeSql(
      queryInsert,
      [
        DFIDCARRETEIRO,
        DFNOMECARRETEIRO,
        DFATIVO,
        DFCNPJCPFCEI,
        DFSENHA,
        DFLOGIN,
        DFIDVEICULO,
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { InsertTbCarreteiro };
