import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Register } from '../../../types/register';

interface ISearchRegister extends Register {
  db: SQLiteDatabase;
}
const searchRegister = ({
  db,
  DFTIPOREGISTRO,
  DFIDITEMCOLETAAPP,
  DFIDITEMCOLETA,
}: ISearchRegister): Promise<string | boolean | number> => {
  const querySelect = `
  SELECT DFIDREGISTROAPP, DFDATAREGISTRO, DFHORAREGISTRO, DFLOCALIZACAO, DFTIPOREGISTRO, DFIDITEMCOLETAAPP,  DFOBSERVACAO, DFIMEI 
  FROM TBREGISTRO 
  WHERE (DFIDITEMCOLETAAPP = ? OR DFIDITEMCOLETA = ?) AND DFTIPOREGISTRO = ?;
`;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          querySelect,
          [DFIDITEMCOLETAAPP, `${DFIDITEMCOLETA || ''}`, DFTIPOREGISTRO],
          (tx, results) => {
            if (results.rows.length > 0) {
              const list: Register[] = [];
              for (let i = 0; i <= results.rows.length - 1; i += 1) {
                list.push(results.rows.item(i));
              }
              const option = list[0].DFIDREGISTROAPP;
              resolve(option);
              return option;
            }
            const option = false;
            resolve(option);
            return option;
          },
        );
      });
    } catch (error) {}
  });
};

export { searchRegister };
