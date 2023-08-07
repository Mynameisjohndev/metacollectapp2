import { debounce } from 'lodash';
import { Dispatch, SetStateAction } from 'react';

import { Region } from '../../../../types/region';
import { searchValue } from '../../../../utils/searchValue';

interface ISearchRegion {
  value: string;
  regionList: Region[];
  setRegion: Dispatch<SetStateAction<Region[]>>;
}

const SEARCH_DEBOUNCE_TIME = 500;

const searchRegion = debounce(
  async ({ value, regionList, setRegion }: ISearchRegion) => {
    if (value !== '') {
      const filter = regionList.filter(item => {
        return searchValue(String(item.DFDESCREGIONAL), value);
      });
      return setRegion(filter);
    }
    return setRegion(regionList);
  },
  SEARCH_DEBOUNCE_TIME,
);

export { searchRegion };
