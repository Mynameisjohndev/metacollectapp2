import { Dispatch, SetStateAction } from 'react';

import { ISignoutWagoner } from '../context/wagonerContext';
import { Collect } from './collect';

type SynchronizeAppMetaCollect = {
  setLoadingExistWagoner: Dispatch<SetStateAction<boolean>>;
  DFIDCARRETEIRO?: string | number;
  setSelectedCollect?: Dispatch<SetStateAction<Collect[]>>;
  setLoadWagonerMessage: Dispatch<SetStateAction<string>>;
  daysBefore: number;
  DFIMEI: string;
  signoutWagoner: ISignoutWagoner;
};
export { SynchronizeAppMetaCollect };
