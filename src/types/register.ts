type Register = {
  DFIDREGISTROAPP?: string | number;
  DFIDREGISTRO?: string | number;
  DFDATAREGISTRO?: string | number;
  DFHORAREGISTRO?: string | number;
  DFLOCALIZACAO?: string;
  DFTIPOREGISTRO?: 'A' | 'C' | 'D' | 'F' | 'G' | 'N' | 'O' | 'Q' | 'R' | 'T';
  DFIDITEMCOLETA?: string | number;
  DFIDITEMCOLETAAPP?: string | number;
  DFIDCOLETA?: string | number;
  DFIDCOLETAAPP?: string | number;
  DFOBSERVACAO?: string | number;
  DFIMEI?: string | boolean;
  DFIDCARRETEIRO?: string | number;
  DFREGISTROENVIADO?: 'N' | 'S';
};

export { Register };
