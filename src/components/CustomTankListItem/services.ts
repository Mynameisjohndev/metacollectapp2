import { Dispatch, SetStateAction } from 'react';

import { getDBConnection } from '../../databases/conection';
import { selectTankListProducersInfo } from '../../databases/TBPRODUTORCOLETA/SELECT/selectTankListProducersInfo';

interface IExecuteSelectTankListProducersInfo {
  DFIDITEMCOLETAAPP: number;
  setProducerInfo: Dispatch<SetStateAction<string>>;
}

const executeSelectTankListProducersInfo = async ({
  DFIDITEMCOLETAAPP,
  setProducerInfo,
}: IExecuteSelectTankListProducersInfo) => {
  if (DFIDITEMCOLETAAPP) {
    const db = await getDBConnection();
    selectTankListProducersInfo({
      db,
      DFIDITEMCOLETAAPP,
    }).then(response => {
      if (response.length > 0) {
        setProducerInfo(response);
      }
    });
  }
};

export { executeSelectTankListProducersInfo };
