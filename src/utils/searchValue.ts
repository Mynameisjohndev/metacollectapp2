import { formatSearchValue } from './formatSearchValue';

const searchValue = (a: string, b: string) => {
  if (formatSearchValue(a).includes(formatSearchValue(b)) === true) {
    if (formatSearchValue(a).indexOf(formatSearchValue(b)) > -1) {
      return true;
    }
    return false;
  }
  return false;
};

export { searchValue };
