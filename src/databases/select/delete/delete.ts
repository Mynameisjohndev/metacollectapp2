import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface IDeleteTableRegister {
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
    | 'TBPRODUTORCOLETA';
}
const deleteTableRegister = ({ db, table }: IDeleteTableRegister) => {
  const query = `DELETE FROM ${table} `;

  db.transaction(tx => {
    tx.executeSql(query, [], (_, { rows }) => {
      console.log('apagado!');
    });
  });
};

export { deleteTableRegister };
