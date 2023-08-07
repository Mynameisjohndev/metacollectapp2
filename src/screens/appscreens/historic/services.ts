import { Dispatch, SetStateAction } from 'react';

import { getDBConnection } from '../../../databases/conection';
import { historySearch } from '../../../databases/TBCOLETA/SELECT/historySearch';
import { TypeHistorySearch } from '../../../types/typeHistorySearch';
import { formatSearchValue } from '../../../utils/formatSearchValue';
import { searchValue } from '../../../utils/searchValue';

let collectHistory: TypeHistorySearch[] = [];
interface ISearchWagonerHistoric {
  setFilteredHistory?: Dispatch<SetStateAction<TypeHistorySearch[]>>;
  id: string | number;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
interface INavigateTCollectInformation {
  setNavigation?: () => void;
}

interface ISearchCollectHistoric {
  value: string;
  setFilteredHistory: Dispatch<SetStateAction<TypeHistorySearch[]>>;
}

const searchWagonerHistoric = async ({
  id,
  setFilteredHistory,
  setLoading,
}: ISearchWagonerHistoric) => {
  const db = await getDBConnection();
  historySearch({ db, DFIDCARRETEIRO: id }).then(response => {
    setFilteredHistory(response);
    collectHistory = response;
    setLoading(false);
  });
};

const handleNavigateTCollectInformation = ({
  setNavigation,
}: INavigateTCollectInformation) => {
  setTimeout(() => {
    setNavigation();
  });
};

const searchTankList = ({
  value,
  setFilteredHistory,
}: ISearchCollectHistoric) => {
  if (value) {
    const filter = collectHistory.filter(item => {
      return searchValue(item.DFIDCOLETAAPP, value);
    });
    setFilteredHistory(filter);
  } else {
    setFilteredHistory(collectHistory);
  }
};

export {
  searchWagonerHistoric,
  handleNavigateTCollectInformation,
  searchTankList,
};
