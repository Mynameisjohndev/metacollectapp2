/* eslint-disable no-await-in-loop */
/* eslint-disable no-async-promise-executor */
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { searchExistCollectItemProducer } from '../../TBITEMCOLETA/SELECT/distributionScreen/searchExistCollectItemProducer';
import { insertProdutorColeta } from '../INSERT/insertProdutorColeta';

interface ISsearchInformationAndCreateCollectProducer {
  db: SQLiteDatabase;
  DFIDITEMCOLETAAPP: number;
  DFIDCOLETAAPP: number;
}

const searchInformationAndCreateCollectProducer = ({
  DFIDCOLETAAPP,
  DFIDITEMCOLETAAPP,
  db,
}: ISsearchInformationAndCreateCollectProducer) => {
  return new Promise(async resolve => {
    try {
      const producerInfo = await searchExistCollectItemProducer({
        db,
        DFIDCOLETAAPP,
        DFIDITEMCOLETAAPP,
      });
      let count = 0;
      for (let i in producerInfo) {
        const result = await insertProdutorColeta({
          db,
          DFIDITEMCOLETAAPP,
          DFIDPROPRIEDADE: producerInfo[i].DFIDPROPRIEDADE,
          DFQTDENTRADA: null,
        });
        if (result === true) count += 1;
      }
      if (producerInfo.length === count) {
        resolve(true);
        return true;
      }
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};

export { searchInformationAndCreateCollectProducer };
