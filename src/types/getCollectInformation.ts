import { Collect } from './collect';
import { CollectItem } from './collectItem';
import { GetCollect } from './getCollect';
import { ProducerCollect } from './producerCollect';
import { Register } from './register';
import { RegistryItem } from './registryItem';
import { StoredMouth } from './storedMouth';

type GetCollectInformation = {
  coletas: GetCollect[];
  itensregistro: RegistryItem[];
};
export { GetCollectInformation };
