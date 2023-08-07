import { Dispatch, SetStateAction } from 'react';

import { getDBConnection } from '../../../../databases/conection';
import { selectTankListItem } from '../../../../databases/TBTANQUE/SELECT/selectTankListItem';
import { HistoricTankListProps } from '../../../../routes/types/approutes/appscreen';
import { tankListItem } from '../../../../types/tankListItem';
import { searchValue } from '../../../../utils/searchValue';

interface ILoadTankList {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFilteredTankList: Dispatch<SetStateAction<tankListItem[]>>;
  idCollect: string | number;
}

interface IHandleNavigateToInformationItemCollect
  extends HistoricTankListProps {
  DFIDITEMCOLETAAPP: number;
  DFIDCOLETAAPP: number;
  DFNOMEPROPRIEDADE: string;
}

interface ISearchTankList {
  value: string;
  setFilteredTankList: Dispatch<SetStateAction<tankListItem[]>>;
}

let singletonTanks: tankListItem[] = [];

const loadTankList = async ({
  setLoading,
  setFilteredTankList,
  idCollect,
}: ILoadTankList) => {
  setLoading(true);
  const db = await getDBConnection();
  selectTankListItem({ db, DFIDCOLETAAPP: idCollect }).then(response => {
    setFilteredTankList(response);
    singletonTanks = response;
    setLoading(false);
  });
};

const handleNavigateToInformationItemCollect = ({
  DFIDITEMCOLETAAPP,
  DFIDCOLETAAPP,
  DFNOMEPROPRIEDADE,
  navigation,
}: IHandleNavigateToInformationItemCollect) => {
  navigation.navigate('InformationItemCollect', {
    idCollectItem: DFIDITEMCOLETAAPP,
    DFIDCOLETAAPP,
    DFNOMEPROPRIEDADE,
  });
};

const searchTankList = ({ value, setFilteredTankList }: ISearchTankList) => {
  if (value) {
    const filter = singletonTanks.filter(item => {
      return searchValue(item.DFDESCTANQUE, value);
    });
    setFilteredTankList(filter);
  } else {
    setFilteredTankList(singletonTanks);
  }
};

export {
  loadTankList,
  handleNavigateToInformationItemCollect,
  IHandleNavigateToInformationItemCollect,
  searchTankList,
};
