import { CollectItem } from './collectItem';
import { ProducerCollect } from './producerCollect';
import { StoredMouth } from './storedMouth';

type GetItemCollect = CollectItem & {
  DFBOCA: StoredMouth[];
  DFPRODUTOR: ProducerCollect[];
};
export { GetItemCollect };
