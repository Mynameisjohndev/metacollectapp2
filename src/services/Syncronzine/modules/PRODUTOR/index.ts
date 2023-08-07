import { META_COLLECT_API } from '../../../../api';
import { ProducerCollect } from '../../../../types/producerCollect';

interface IUpsertProducerCollect {
  DFIDITEMCOLETAAPP: number;
  DFIDITEMCOLETA: number;
  producerCollects: ProducerCollect[];
}

const upsertProducerCollect = ({
  DFIDITEMCOLETA,
  DFIDITEMCOLETAAPP,
  producerCollects,
}: IUpsertProducerCollect): Promise<boolean> => {
  if (DFIDITEMCOLETAAPP) {
    const filteredProducerCollect: ProducerCollect[] = producerCollects.filter(
      item => item.DFIDITEMCOLETAAPP === DFIDITEMCOLETAAPP,
    );

    const producerCollect = filteredProducerCollect.map(item =>
      item.DFIDITEMCOLETA === null
        ? {
            ...item,
            DFIDITEMCOLETA,
            DFQTDENTRADA: item.DFQTDENTRADA === null ? 0 : item.DFQTDENTRADA,
          }
        : item,
    );

    // console.log(`produtore: ${producerCollect}`);
    // console.log(producerCollect);
    // console.log('saiu');

    return new Promise(resolve => {
      if (producerCollect.length > 0) {
        try {
          META_COLLECT_API.post(`/produtorcoleta/criar`, producerCollect)
            .then(_ => {
              resolve(true);
              return true;
            })
            .catch(_ => {
              resolve(false);
              return false;
            });
        } catch (_) {
          resolve(false);
          return false;
        }
      }
      resolve(true);
      return true;
    });
  }
};

export { upsertProducerCollect };
