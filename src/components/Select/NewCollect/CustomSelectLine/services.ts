import { debounce } from 'lodash';
import { Dispatch, SetStateAction } from 'react';

import { Line } from '../../../../types/line';
import { searchValue } from '../../../../utils/searchValue';

interface ISearchLine {
  value: string;
  lineList: Line[];
  setLine: Dispatch<SetStateAction<Line[]>>;
}

const SEARCH_DEBOUNCE_TIME = 500;

const searchLine = debounce(
  async ({ value, lineList, setLine }: ISearchLine) => {
    if (value !== '') {
      const filter = lineList.filter(item => {
        return searchValue(String(item.DFNOMELINHA), value);
      });
      return setLine(filter);
    }
    return setLine(lineList);
  },
  SEARCH_DEBOUNCE_TIME,
);

export { searchLine };
