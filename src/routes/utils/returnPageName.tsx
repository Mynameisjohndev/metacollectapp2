/* eslint-disable no-useless-escape */
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { CustomScreenHeader } from '../../components/Header';
import { useInfoCollect } from '../../context/InfoCollectContext';

interface IPageName {
  page:
    | 'Home'
    | 'NewCollect'
    | 'MyCollect'
    | 'Historic'
    | 'infoCollect'
    | 'StartCollect'
    | 'InformationItemCollect'
    | 'HistoricTankList'
    | 'Settings'
    | 'Schedules'
    | 'FirstHistorico';
}

interface ICustomPageName {
  page:
    | 'TankOptions'
    | 'InformVolume'
    | 'Informtemperature'
    | 'InformFIrstRuler'
    | 'InformSecondRuler'
    | 'InformQuality'
    | 'Storage'
    | 'InformStorage'
    | 'Distribution'
    | 'InformDistribution'
    | 'ProblemReportProps'
    | 'TankRescue';
}

const returnPageName = ({ page }: IPageName) => {
  const { collect } = useInfoCollect();
  let { DFORDEMCOLETA } = collect.length > 0 && collect[0];

  let options: NativeStackNavigationOptions;
  switch (page) {
    case 'Home': {
      options = { headerTitle: 'Minha Coleta' };
      return { ...{ options } };
    }
    case 'infoCollect': {
      options = {
        headerTitle: `Coleta #${DFORDEMCOLETA || ''}`,
      };
      return { ...{ options } };
    }
    case 'StartCollect': {
      options = {
        headerTitle: `Coleta #${DFORDEMCOLETA || ''}`,
      };
      return { ...{ options } };
    }

    case 'FirstHistorico': {
      options = { headerTitle: 'Histórico ' };
      return { ...{ options } };
    }
    case 'InformationItemCollect': {
      options = { headerTitle: 'Informação da coleta ' };
      return { ...{ options } };
    }
    case 'NewCollect': {
      options = { headerTitle: 'Nova coleta ' };
      return { ...{ options } };
    }
    case 'HistoricTankList': {
      options = { headerTitle: 'Lista de tanques' };
      return { ...{ options } };
    }

    case 'Settings': {
      options = { headerTitle: 'Configurações' };
      return { ...{ options } };
    }
    case 'Schedules': {
      options = { headerTitle: 'Programações' };
      return { ...{ options } };
    }
    default:
  }
};

const returnCustomPageName = ({ page }: ICustomPageName) => {
  const { collect, selectdTackListItem } = useInfoCollect();
  let { DFORDEMCOLETA } = collect[0];
  const title = `Coleta #${collect.length !== 0 ? DFORDEMCOLETA : ''} - ${
    selectdTackListItem ? `${selectdTackListItem.DFDESCTANQUE}` : ''
  }`;
  let options: NativeStackNavigationOptions;
  options = {
    presentation: 'fullScreenModal',
    headerTitle: () => {
      return <CustomScreenHeader {...{ title }} />;
    },
  };
  if (selectdTackListItem) {
    if (
      page === 'Distribution' ||
      page === 'InformDistribution' ||
      page === 'InformFIrstRuler' ||
      page === 'InformQuality' ||
      page === 'InformSecondRuler' ||
      page === 'InformStorage' ||
      page === 'InformVolume' ||
      page === 'Informtemperature' ||
      page === 'ProblemReportProps' ||
      page === 'Storage' ||
      page === 'TankOptions' ||
      page === 'TankRescue'
    ) {
      return { ...{ options } };
    }
  }
};

export { returnPageName, returnCustomPageName };
