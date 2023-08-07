import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface IDeleteTable {
  db: SQLiteDatabase;
  table:
    | 'TBUNIDADE'
    | 'TBSILO'
    | 'TBVEICULO'
    | 'TBCARRETEIRO'
    | 'TBREGIONAL'
    | 'TBLINHA'
    | 'TBCOLETA'
    | 'TBTANQUEVEICULO'
    | 'TBTANQUE'
    | 'TBPROPRIEDADE'
    | 'TBVINCULOTANQUE'
    | 'TBITEMCOLETA'
    | 'TBCOLETAFAZENDA'
    | 'TBBOCAARMAZENADA'
    | 'TBCOLETALOCALIZACAO'
    | 'TBREGISTRO'
    | 'TBITEMREGISTRO'
    | 'TBPRODUTORCOLETA'
    | 'TBCONFIGURACAO';
}
const deleteTable = async ({ db, table }: IDeleteTable): Promise<boolean> => {
  const query = `
  DELETE FROM ${table};
  UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='${table}';
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [],
          () => {
            resolve(true);
            return true;
          },
          _ => null,
        );
      });
    } catch (erro) {}
  });
};
export { deleteTable };
