import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { SelectDistribution } from '../../../../types/selectDistribution';

interface ISelectDistribution extends SelectDistribution {
  db: SQLiteDatabase;
}
const selectDistribution = ({
  db,
  DFIDITEMCOLETAAPP,
}: ISelectDistribution): Promise<SelectDistribution[]> => {
  const query = `
  SELECT ict.DFQTDPREVISTA, Sum(pc.DFQTDENTRADA) AS DFQTDENTRADA
  FROM TBITEMCOLETA AS ict 
  LEFT JOIN TBPRODUTORCOLETA AS pc ON pc.DFIDITEMCOLETAAPP = ict.DFIDITEMCOLETAAPP 
  WHERE ict.DFIDITEMCOLETAAPP = ?
  GROUP BY ict.DFQTDPREVISTA
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDITEMCOLETAAPP], (_, results) => {
          const list = [];
          for (let i = 0; i <= results.rows.length - 1; i += 1) {
            list.push(results.rows.item(i));
          }

          resolve(list);
          return list;
        });
      });
    } catch (error) {}
  });
};

export { selectDistribution };
