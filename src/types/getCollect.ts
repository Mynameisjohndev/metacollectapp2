import { Collect } from './collect';
import { GetItemCollect } from './getItemCollect';
import { Register } from './register';

type GetCollect = Collect & {
  DFITEMCOLETA: GetItemCollect[];
  DFREGISTRO: Register[];
};

export { GetCollect };
