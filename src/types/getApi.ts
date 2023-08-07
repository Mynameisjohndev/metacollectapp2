import { AxiosInstance } from 'axios';
import { Dispatch, SetStateAction } from 'react';

import { ISignoutWagoner } from '../context/wagonerContext';
import { Collect } from './collect';
import { CollectItem } from './collectItem';
import { StoredMouth } from './storedMouth';

type GetApi = {
  META_COLLECT_API: AxiosInstance;
  DFIDCARRETEIRO?: string | number;
  DFIMEI?: string;
  daysBefore?: number;
  collect?: Collect;
  collectItems?: CollectItem[];
  storedMouth?: StoredMouth[];
  setLoadWagonerMessage?: Dispatch<SetStateAction<string>>;
  signoutWagoner?: ISignoutWagoner;
};
export { GetApi };
