import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface IProducerDataResearch {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: number;
  DFIDITEMCOLETAAPP: number;
}
interface IResponseProducer {
  DFIDPROPRIEDADE: number;
  DFIDITEMCOLETAAPP: number;
}

const searchExistCollectItemProducer = ({
  db,
  DFIDCOLETAAPP,
  DFIDITEMCOLETAAPP,
}: IProducerDataResearch): Promise<IResponseProducer[]> => {
  const query = `
    SELECT DISTINCT  pp.DFIDPROPRIEDADE, ict.DFIDITEMCOLETAAPP
    FROM TBITEMCOLETA AS ict
    INNER JOIN TBVINCULOTANQUE AS vt ON vt.DFIDTANQUE = ict.DFIDTANQUE
    INNER JOIN TBPROPRIEDADE AS pp ON pp.DFIDPROPRIEDADE = vt.DFIDPROPRIEDADE
    WHERE ict.DFIDCOLETAAPP = ? and ict.DFIDITEMCOLETAAPP = ?
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [DFIDCOLETAAPP, DFIDITEMCOLETAAPP],
          (_, results) => {
            let list = results.rows.raw();
            resolve(list);
            return list;
          },
        );
      });
    } catch (_) {
      resolve([]);
      return [];
    }
  });
};

export { searchExistCollectItemProducer };
