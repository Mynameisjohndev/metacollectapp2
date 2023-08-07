import { META_COLLECT_API } from '../../../../api';
import { StoredMouth } from '../../../../types/storedMouth';

interface IUpsertStoredMouth {
  DFIDITEMCOLETAAPP: string | number;
  DFIDITEMCOLETA: string | number;
  storedMouths: StoredMouth[];
}

const upsertStoredMouth = ({
  DFIDITEMCOLETA,
  DFIDITEMCOLETAAPP,
  storedMouths,
}: IUpsertStoredMouth): Promise<boolean> => {
  if (DFIDITEMCOLETAAPP) {
    const filteredMouths: StoredMouth[] = storedMouths.filter(
      item => item.DFIDITEMCOLETAAPP === DFIDITEMCOLETAAPP,
    );
    const newMouths = filteredMouths.map(item =>
      item.DFIDITEMCOLETA === null
        ? {
            ...item,
            DFIDITEMCOLETA,
          }
        : item,
    );
    return new Promise(resolve => {
      if (newMouths.length > 0) {
        try {
          META_COLLECT_API.post(`/bocaarmazenada/criar`, newMouths)
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

export { upsertStoredMouth };
