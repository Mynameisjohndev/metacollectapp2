import { ICustomTankOption } from '../../../../components/CustomTankOption';

const tankOptionsData: ICustomTankOption[] = [
  {
    id: 1,
    title: 'Informar\nVolume',
    icon: 'Mileage',
    path: 'InformVolume',
  },
  {
    id: 2,
    title: 'Informar\nQualidade',
    icon: 'Information',
    path: 'InformQuality',
  },
  {
    id: 3,
    title: 'Informar\nTemperatura',
    icon: 'Temperature',
    path: 'Informtemperature',
  },
  {
    id: 4,
    title: 'Informar\nRégua 1',
    icon: 'Scale',
    path: 'InformFIrstRuler',
  },
  {
    id: 5,
    title: 'Informar\nRégua 2',
    icon: 'Scale',
    path: 'InformSecondRuler',
  },
  {
    id: 6,
    title: 'Armazenar',
    icon: 'Storage',
    path: 'Storage',
  },
  {
    id: 7,
    title: 'Distribuir',
    icon: 'Distribution',
    path: 'Distribution',
  },
];

export { tankOptionsData };
