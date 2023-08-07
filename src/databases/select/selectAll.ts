import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface IGETTbUnidade {
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

const selectAll = async ({ db, table }: IGETTbUnidade) => {
  const querySelect = `
    SELECT * FROM ${table}
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [], (_, results) => {
          const list = [];
          for (let i = 0; i <= results.rows.length - 1; i += 1) {
            list.push(results.rows.item(i));
          }
          // console.log(results.rows.item(0));
          resolve(list);
        });
      });
    } catch (error) {
      resolve([]);
      return [];
    }
  });
};

export { selectAll };
