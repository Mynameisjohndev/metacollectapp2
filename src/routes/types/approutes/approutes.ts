import { NavigatorScreenParams } from '@react-navigation/native';

import { Collect } from '../../../types/collect';
import { tankListItem } from '../../../types/tankListItem';

export type MyCollectStackType = {
  InfoCollect: {
    collect: Collect[];
  };
  StartCollect: {
    idCollect: string | number;
  };
  TankOptions: {
    tank: tankListItem;
  };
  InformVolume: {
    First: undefined;
  };
  Informtemperature: {
    First: undefined;
  };
  InformFIrstRuler: {
    First: undefined;
  };
  InformSecondRuler: {
    First: undefined;
  };
  InformQuality: {
    First: undefined;
  };
  Storage: {
    First: undefined;
  };
  InformStorage: {
    First: undefined;
  };
  Distribution: {
    First: undefined;
  };
  InformDistribution: {
    First: undefined;
  };
  ProblemReport: {
    data: {
      idCollectItem: string;
      idCollect: string | number;
      tankCode?: number;
      itemCollect?: string | null;
    };
  };
  TankRescue: {
    First: {
      DFIDTANQUE?: number;
    };
  };
};

export type NewCollectStackType = {
  First: undefined;
};

export type HistoricStackType = {
  First: undefined;
  HistoricTankList: {
    idCollect: string | number;
  };
  InformationItemCollect: {
    idCollectItem: number;
    DFIDCOLETAAPP: number;
    DFNOMEPROPRIEDADE: string;
  };
};

export type SettingsType = {
  Home: undefined;
};

export type SchedulesType = {
  Home: undefined;
};

export type AppStackType = {
  Home: undefined;
  NewCollect: NavigatorScreenParams<NewCollectStackType>;
  MyCollect: NavigatorScreenParams<MyCollectStackType>;
  Historic: NavigatorScreenParams<HistoricStackType>;
  Settings: NavigatorScreenParams<SettingsType>;
  Schedules: NavigatorScreenParams<SchedulesType>;
};
