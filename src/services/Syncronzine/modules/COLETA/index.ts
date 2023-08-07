import { META_COLLECT_API } from '../../../../api';
import { Collect } from '../../../../types/collect';

interface IUpdateCollect {
  collect: Collect;
}
interface IGetCollect {
  collect: Collect;
}
interface ICreateCollect {
  collect: Collect;
}

const updateCollect = async ({ collect }: IUpdateCollect) => {
  const data =
    collect.DFSTATUS === 'D' && collect.DFCOLETASICRONIZADA === 'N'
      ? {
          ...collect,
          DFCOLETASICRONIZADA: 'S',
        }
      : collect.DFSTATUS === 'A'
      ? {
          ...collect,
          DFCOLETASICRONIZADA: 'N',
        }
      : null;

  return new Promise(resolve => {
    if (data !== null) {
      META_COLLECT_API.patch(`/coleta/atualizar/mobile`, data)
        .then(() => {
          resolve(true);
          return true;
        })
        .catch(err => {
          // console.log('erro catch, ', err);
          resolve(false);
          return false;
        });
    } else {
      resolve(true);
      return true;
    }
  });
};

const getCollect = async ({ collect }: IGetCollect): Promise<Collect> => {
  const { DFIDLINHA, DFIDVEICULO, DFIDREGIONAL, DFIDCARRETEIRO } = collect;
  return new Promise(resolve => {
    META_COLLECT_API.get(
      `/coleta/mobile/all?DFIDLINHA=${DFIDLINHA}&DFIDVEICULO=${DFIDVEICULO}&DFIDREGIONAL=${DFIDREGIONAL}&DFIDCARRETEIRO=${DFIDCARRETEIRO}&DFSTATUS=P`,
    )
      .then(res => {
        const receiveCollect = res.data.coletas[0] as Collect;
        if (receiveCollect) {
          // console.log("getCollect");
          resolve(receiveCollect);
          return receiveCollect;
        }
        resolve({});
        return {};
      })
      .catch(() => {
        resolve({});
        return {};
      });
  });
};

const createCollect = async ({ collect }: ICreateCollect) => {
  return new Promise(resolve => {
    META_COLLECT_API.post(`/coleta/criar/mobile`, collect)
      .then(res => {
        const DFIDCOLETA = res.data.id;
        resolve(DFIDCOLETA);
        return DFIDCOLETA;
      })
      .catch(() => {
        resolve(false);
        return false;
      });
  });
};

export { updateCollect, getCollect, createCollect };
