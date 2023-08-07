type RegistryItem = {
  DFIDITEMREGISTRO?: string | number;
  DFIDITEMREGISTROAPP?: number;
  DFIDREGISTRO?: string | number;
  DFREGISTROIMAGEM?: {
    data: number[];
    type: 'Buffer';
  };
  DFIDREGISTROAPP?: string | number | boolean;
  DFITEMREGISTROENVIADO?: 'S' | 'N';
};

export { RegistryItem };
