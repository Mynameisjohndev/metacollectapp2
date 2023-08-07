interface ISettingColletOptions {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  name: string;
}

interface IPermissionApp {
  id: 1 | 2 | 3 | 4;
  name: string;
}

const settingColletOptions: ISettingColletOptions[] = [
  { id: 1, name: 'Volume' },
  { id: 2, name: 'Qualidade' },
  { id: 3, name: 'Temepratura' },
  { id: 4, name: 'Régua 1' },
  { id: 5, name: 'Régua 2' },
  { id: 6, name: 'Armazenar' },
  { id: 7, name: 'Distribuir' },
];

const permissionsApp: IPermissionApp[] = [
  { id: 1, name: 'Armazenamento' },
  { id: 2, name: 'Câmera' },
  { id: 3, name: 'Local' },
  { id: 4, name: 'Telefone' },
];

export {
  ISettingColletOptions,
  settingColletOptions,
  permissionsApp,
  IPermissionApp,
};
