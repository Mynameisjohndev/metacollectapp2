import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  AppStackType,
  HistoricStackType,
  MyCollectStackType,
  SchedulesType,
  SettingsType,
} from './approutes';

type HomeProps = NativeStackScreenProps<AppStackType, 'Home'>;

type NewCollectProps = NativeStackScreenProps<AppStackType, 'NewCollect'>;

type MyCollectProps = NativeStackScreenProps<MyCollectStackType, 'InfoCollect'>;

type StartCollectProps = NativeStackScreenProps<
  MyCollectStackType,
  'StartCollect'
>;
type TankOptionsProps = NativeStackScreenProps<
  MyCollectStackType,
  'TankOptions'
>;
type InformVolumeProps = NativeStackScreenProps<
  MyCollectStackType,
  'InformVolume'
>;
type InformtemperatureProps = NativeStackScreenProps<
  MyCollectStackType,
  'Informtemperature'
>;
type InformRulerProps = NativeStackScreenProps<
  MyCollectStackType,
  'InformFIrstRuler'
>;
type InformSecondRulerProps = NativeStackScreenProps<
  MyCollectStackType,
  'InformSecondRuler'
>;
type InformQualityProps = NativeStackScreenProps<
  MyCollectStackType,
  'InformQuality'
>;
type StorageProps = NativeStackScreenProps<MyCollectStackType, 'Storage'>;

type InformStorageProps = NativeStackScreenProps<
  MyCollectStackType,
  'InformStorage'
>;
type DistributionProps = NativeStackScreenProps<
  MyCollectStackType,
  'Distribution'
>;
type InformDistributionProps = NativeStackScreenProps<
  MyCollectStackType,
  'InformDistribution'
>;
type ProblemReportProps = NativeStackScreenProps<
  MyCollectStackType,
  'ProblemReport'
>;
type TankRescueProps = NativeStackScreenProps<MyCollectStackType, 'TankRescue'>;

// HISTÓRICO
type HistoricFirstProps = NativeStackScreenProps<HistoricStackType, 'First'>;
type HistoricTankListProps = NativeStackScreenProps<
  HistoricStackType,
  'HistoricTankList'
>;
type HistoricInformationItemCollectProps = NativeStackScreenProps<
  HistoricStackType,
  'InformationItemCollect'
>;

type CollectInformationProps = NativeStackScreenProps<
  HistoricStackType,
  'InformationItemCollect'
>;

// SETTINGS

type SettingsTypeProps = NativeStackScreenProps<SettingsType, 'Home'>;

type SchedulesTypeProps = NativeStackScreenProps<SchedulesType, 'Home'>;

export {
  HomeProps,
  NewCollectProps,
  MyCollectProps,
  StartCollectProps,
  TankOptionsProps,
  InformVolumeProps,
  InformtemperatureProps,
  InformRulerProps,
  InformSecondRulerProps,
  InformQualityProps,
  StorageProps,
  InformStorageProps,
  DistributionProps,
  InformDistributionProps,
  ProblemReportProps,
  CollectInformationProps,
  HistoricFirstProps,
  HistoricTankListProps,
  HistoricInformationItemCollectProps,
  SettingsTypeProps,
  SchedulesTypeProps,
  TankRescueProps,
};
