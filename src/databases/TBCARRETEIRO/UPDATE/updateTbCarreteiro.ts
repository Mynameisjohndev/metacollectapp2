import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Carreteiro } from '../../../types/wagoner';

interface IUpdate extends Carreteiro {
  db: SQLiteDatabase;
}
const UpdateTbCarreteiro = async ({
  db,
  DFIDCARRETEIRO,
  DFNOMECARRETEIRO,
  DFATIVO,
  DFCNPJCPFCEI,
  DFSENHA,
  DFLOGIN,
  DFIDVEICULO,
}: IUpdate) => {
  const queryUpdate = `
  UPDATE TBCARRETEIRO SET 
  DFATIVO = ?,
  DFCNPJCPFCEI = ?,
  DFIDVEICULO = ?,
  DFLOGIN = ?,
  DFNOMECARRETEIRO = ?,
  DFSENHA = ?
  WHERE DFIDCARRETEIRO = ?;
`;

  await db.transaction(tx => {
    tx.executeSql(
      queryUpdate,
      [
        DFATIVO,
        DFCNPJCPFCEI,
        DFIDVEICULO,
        DFLOGIN,
        DFNOMECARRETEIRO,
        DFSENHA,
        DFIDCARRETEIRO,
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { UpdateTbCarreteiro };
