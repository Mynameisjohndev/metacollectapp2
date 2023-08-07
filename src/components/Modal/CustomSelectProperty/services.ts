import { debounce } from 'lodash';
import { Dispatch, SetStateAction } from 'react';

import { getDBConnection } from '../../../databases/conection';
import { insertProdutorColeta } from '../../../databases/TBPRODUTORCOLETA/INSERT/insertProdutorColeta';
import { returnTbProdutorColeta } from '../../../databases/TBPRODUTORCOLETA/SELECT/returnTbProdutorColeta';
import { Property } from '../../../types/property';
import { searchValue } from '../../../utils/searchValue';

interface ISearchProperty {
  value: string;
  propertyList: Property[];
  setProperty: Dispatch<SetStateAction<Property[]>>;
}

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}
interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
}
interface IHandleNewProperty {
  DFIDITEMCOLETAAPP: number;
  DFIDPROPRIEDADE: number;
}

const SEARCH_DEBOUNCE_TIME = 500;

const searchProperty = debounce(
  async ({ value, propertyList, setProperty }: ISearchProperty) => {
    if (value !== '') {
      const filter = propertyList.filter(item => {
        return searchValue(String(item.DFNOMEPRODUTOR), value);
      });
      return setProperty(filter);
    }
    return setProperty(propertyList);
  },
  SEARCH_DEBOUNCE_TIME,
);

const openModal = ({ setIsOpen, isOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

const setTypeAndOpenModal = ({
  isOpen,
  setIsOpen,
  type,
  setModalType,
}: ISetTypeAndOpenModal) => {
  setModalType(type);
  openModal({ isOpen, setIsOpen });
};

const handleNewProperty = async ({
  DFIDITEMCOLETAAPP,
  DFIDPROPRIEDADE,
}: IHandleNewProperty): Promise<boolean> => {
  const db = await getDBConnection();
  return new Promise(resolver => {
    returnTbProdutorColeta({ db, DFIDITEMCOLETAAPP, DFIDPROPRIEDADE }).then(
      res => {
        if (res.length === 0) {
          insertProdutorColeta({
            db,
            DFIDITEMCOLETAAPP,
            DFIDPROPRIEDADE,
            DFQTDENTRADA: null,
          });
          resolver(true);
          return true;
        }
        resolver(false);
        return false;
      },
    );
  });
};

export { searchProperty, handleNewProperty, openModal };
