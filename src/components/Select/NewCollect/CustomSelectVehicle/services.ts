/* eslint-disable no-unused-expressions */
import { debounce } from 'lodash';
import { Dispatch, SetStateAction } from 'react';

import { Vehicle } from '../../../../types/vehicle';
import { searchValue } from '../../../../utils/searchValue';

interface ISearchVehicle {
  value: string;
  vehicleList: Vehicle[];
  setVehicles: Dispatch<SetStateAction<Vehicle[]>>;
}

const SEARCH_DEBOUNCE_TIME = 500;

const searchVehicle = debounce(
  async ({ value, vehicleList, setVehicles }: ISearchVehicle) => {
    if (value !== '') {
      const filter = vehicleList.filter(item => {
        return searchValue(String(item.DFPLACAVEICULO), value);
      });
      return setVehicles(filter);
    }
    return setVehicles(vehicleList);
  },
  SEARCH_DEBOUNCE_TIME,
);

export { searchVehicle };
