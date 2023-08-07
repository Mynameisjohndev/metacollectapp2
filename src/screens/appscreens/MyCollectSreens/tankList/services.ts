/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction } from 'react';

import { getDBConnection } from '../../../../databases/conection/index';
import { selectItemCollectWithOccurrence } from '../../../../databases/TBITEMCOLETA/SELECT/selectItemCollectWithOccurrence';
import { selectTankListItem } from '../../../../databases/TBTANQUE/SELECT/selectTankListItem';
import { StartCollectProps } from '../../../../routes/types/approutes/appscreen';
import { tankListItem } from '../../../../types/tankListItem';
import { searchValue } from '../../../../utils/searchValue';

let singletonTanks: tankListItem[] = [];

interface ILoadTankList {
  setLoading: Dispatch<SetStateAction<boolean>>;
  DFIDCOLETAAPP: number;
  setFilteredTankList: Dispatch<SetStateAction<tankListItem[]>>;
}

interface ISearchTankList {
  value: string;
  setFilteredTankList: Dispatch<SetStateAction<tankListItem[]>>;
}

type IHandleTankRescue = StartCollectProps;

const loadTankList = async ({
  setLoading,
  DFIDCOLETAAPP,
  setFilteredTankList,
}: ILoadTankList) => {
  setFilteredTankList([]);
  singletonTanks = [];
  setLoading(true);
  let validColletedTanks: tankListItem[] = [];
  let validColletedTanksWithRegister: tankListItem[] = [];
  const db = await getDBConnection();
  const response = await selectTankListItem({ db, DFIDCOLETAAPP });
  const notColletedTanks = response.filter(
    tank => tank.DFTIPOITEMCOLETA === 'N',
  );
  const collectedTank = response.filter(tank => tank.DFTIPOITEMCOLETA === 'C');
  const collectTankTypeHelp = response.filter(
    tank => tank.DFTIPOITEMCOLETA === 'S',
  );

  for (let collect in notColletedTanks) {
    const response = await selectItemCollectWithOccurrence({
      db,
      DFIDITEMCOLETAAPP: notColletedTanks[collect].DFIDITEMCOLETAAPP,
    });
    if (response) {
      validColletedTanksWithRegister.push({
        ...notColletedTanks[collect],
        typeCardColor: 'NN',
      });
    } else {
      validColletedTanks.push({
        ...notColletedTanks[collect],
        typeCardColor: 'N',
      });
    }
  }

  const collectTypeHelp: tankListItem[] = collectTankTypeHelp.map(item => {
    return {
      ...item,
      typeCardColor: 'S',
    };
  });

  const collect: tankListItem[] = collectedTank.map(item => {
    return {
      ...item,
      typeCardColor: 'C',
    };
  });

  const filteredTanks = [
    ...collectTypeHelp,
    ...validColletedTanks,
    ...validColletedTanksWithRegister,
    ...collect,
  ];

  singletonTanks = filteredTanks;
  setFilteredTankList(filteredTanks);
  setLoading(false);
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

const handleTankRescue = async ({ navigation, route }: IHandleTankRescue) => {
  navigation.navigate('TankRescue');
};

export { loadTankList, searchTankList, handleTankRescue };
