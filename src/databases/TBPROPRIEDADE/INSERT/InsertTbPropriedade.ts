import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Property } from '../../../types/property';

interface IInsertTbPropriedade extends Property {
  db: SQLiteDatabase;
}

const InsertTbPropriedade = async ({
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
}: IInsertTbPropriedade): Promise<boolean> => {
  const queryInsert = `
    INSERT INTO TBPROPRIEDADE(
      DFIDPROPRIEDADE,
      DFMATRICULA,
      DFCNPJCPFCEI,
      DFNOMEPRODUTOR,
      DFNOMEPROPRIEDADE,
      DFNOMEMUNICIPIO,
      DFIDSIGLAUF,
      DFLOGRADOURO,
      DFNUMERO,
      DFATIVOINATIVO
    )
    VALUES (?,?,?,?,?,?,?,?,?,?);
  `;
  return new Promise(resolver => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            `${DFIDPROPRIEDADE}`,
            `${DFMATRICULA || ''}`,
            `${DFCNPJCPFCEI || ''}`,
            `${DFNOMEPRODUTOR || ''}`,
            `${DFNOMEPROPRIEDADE || ''}`,
            `${DFNOMEMUNICIPIO || ''}`,
            `${DFIDSIGLAUF || ''}`,
            `${DFLOGRADOURO || ''}`,
            `${DFNUMERO || ''}`,
            `${DFATIVOINATIVO || ''}`,
          ],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolver(true);
              return true;
            }
            resolver(false);
            return false;
          },
          _ => null,
        );
      });
    } catch (error) {
      // console.log('error propriedade ', error);
      resolver(false);
      return false;
    }
  });
};

export { InsertTbPropriedade };
