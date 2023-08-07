import { debounce } from 'lodash';
import { Dispatch, SetStateAction } from 'react';

import { Tank } from '../../../types/tank';
import { searchValue } from '../../../utils/searchValue';

interface ISearchTank {
  value: string;
  tankList: Tank[];
  setTank: Dispatch<SetStateAction<Tank[]>>;
}

const SEARCH_DEBOUNCE_TIME = 500;

const searchTank = debounce(
  async ({ value, tankList, setTank }: ISearchTank) => {
    if (value !== '') {
      const filter = tankList.filter(item => {
        return searchValue(String(item.DFDESCTANQUE), value);
      });
      return setTank(filter);
    }
    return setTank(tankList);
  },
  SEARCH_DEBOUNCE_TIME,
);

export { searchTank };
