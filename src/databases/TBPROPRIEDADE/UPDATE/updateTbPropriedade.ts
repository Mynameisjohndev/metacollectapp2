import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Property } from '../../../types/property';

interface IUpdate extends Property {
  db: SQLiteDatabase;
}
const UpdateTbPropriedade = async ({
  db,
  DFIDPROPRIEDADE,
  DFMATRICULA,
  DFCNPJCPFCEI,
  DFNOMEPRODUTOR,
  DFNOMEPROPRIEDADE,
  DFNOMEMUNICIPIO,
  DFIDSIGLAUF,
  DFLOGRADOURO,
  DFNUMERO,
  DFATIVOINATIVO,
}: IUpdate) => {
  const queryUpdate = `
  UPDATE TbPropriedade SET 
  DFMATRICULA = ?,
  DFCNPJCPFCEI = ?,
  DFNOMEPRODUTOR = ?,
  DFNOMEPROPRIEDADE = ?,
  DFNOMEMUNICIPIO = ?,
  DFIDSIGLAUF = ?,
  DFLOGRADOURO = ?,
  DFNUMERO = ?,
  DFATIVOINATIVO = ?
  WHERE DFIDPROPRIEDADE = ?
`;

  await db.transaction(tx => {
    tx.executeSql(
      queryUpdate,
      [
        DFMATRICULA,
        DFCNPJCPFCEI,
        DFNOMEPRODUTOR,
        DFNOMEPROPRIEDADE,
        DFNOMEMUNICIPIO,
        DFIDSIGLAUF,
        DFLOGRADOURO,
        DFNUMERO,
        DFATIVOINATIVO,
        DFIDPROPRIEDADE,
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { UpdateTbPropriedade };
