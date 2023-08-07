import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface IUpdateDischargeCollect {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: number;
}
const updateDischargeCollect = async ({
  db,
  DFIDCOLETAAPP,
}: IUpdateDischargeCollect): Promise<boolean> => {
  const queryUpdate = `
  UPDATE TBCOLETA SET
  DFCOLETASICRONIZADA = "S"
  WHERE DFIDCOLETAAPP = ?;
`;

  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        queryUpdate,
        [DFIDCOLETAAPP],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(true);
            return true;
          }
          resolve(false);
          return false;
        },
        () => {
          resolve(false);
          return false;
        },
      );
    });
  });
};

export { updateDischargeCollect };
