import { Dispatch, SetStateAction } from 'react';

import { getDBConnection } from '../../../databases/conection/index';
import { getScheduleCollects } from '../../../databases/TBCOLETA/SELECT/getScheduleCollects';
import { IScheduleCollect } from '../../../types/scheduleCollect';
import { searchValue } from '../../../utils/searchValue';

interface IExecutegetScheduleCollects {
  setScheduleCollects: Dispatch<SetStateAction<IScheduleCollect[]>>;
  setScheduleCollectsLoading: Dispatch<SetStateAction<boolean>>;
  DFIDCARRETEIRO: string;
}

interface ISearchScheduleCollects {
  setScheduleCollects: Dispatch<SetStateAction<IScheduleCollect[]>>;
  value: string;
}

let collects: IScheduleCollect[] = [];

const executegetScheduleCollects = async ({
  setScheduleCollects,
  setScheduleCollectsLoading,
  DFIDCARRETEIRO,
}: IExecutegetScheduleCollects) => {
  const db = await getDBConnection();
  setScheduleCollectsLoading(true);
  getScheduleCollects({ db, DFIDCARRETEIRO })
    .then(response => {
      setScheduleCollectsLoading(false);
      setScheduleCollects(response);
      collects = response;
    })
    .catch(() => {
      setScheduleCollectsLoading(false);
    });
};

const searchScheduleCollect = ({
  value,
  setScheduleCollects,
}: ISearchScheduleCollects) => {
  if (value) {
    const filter = collects.filter(item => {
      return searchValue(String(item.DFIDCOLETAAPP), value);
    });
    setScheduleCollects(filter);
  } else {
    setScheduleCollects(collects);
  }
};

export { executegetScheduleCollects, searchScheduleCollect };
