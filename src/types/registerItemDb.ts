type RegisterItemDb = {
  DFIDITEMREGISTRO?: string;
  DFIDITEMREGISTROAPP?: string;
  DFIDREGISTROAPP?: string | number | boolean;
  DFITEMREGISTROENVIADO?: string | number;
  DFIDREGISTRO?: string | number;
  DFREGISTROIMAGEM?: {
    data: number[];
    type: string;
  };
};

export { RegisterItemDb };
