/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
import { Buffer } from 'buffer';

import { wagonerContext } from '../../context/wagonerContext';
import { getDBConnection } from '../../databases/conection';
import { deleteTable } from '../../databases/select/delete/deleteTable';
import { insertTbBocaArmazenadaApi } from '../../databases/TBBOCAARMAZENADA/INSERT/insertTbBocaArmazenadaApi';
import { insertCollectApi } from '../../databases/TBCOLETA/INSERT/insertCollectApi';
import { selectLastCollectId } from '../../databases/TBCOLETA/SELECT/selectLastCollectId';
import { insertTbItemColetaApi } from '../../databases/TBITEMCOLETA/INSERT/insertTbItemColetaApi';
import { insertItemRegistroApi } from '../../databases/TBITEMREGISTRO/INSERT/insertItemRegistroApi';
import { insertProdutorColetaApi } from '../../databases/TBPRODUTORCOLETA/INSERT/insertprodutorcoletaApi';
import { insertTbRegistroApi } from '../../databases/TBREGISTRO/INSERT/insertTbRegistroApi';
import { localSynchronizeApp } from '../../services/Syncronzine/localSyncronizeApp';
import { GetApi } from '../../types/getApi';
import { GetCollectInformation } from '../../types/getCollectInformation';

const getAllCollectInformation = async ({
  META_COLLECT_API,
  DFIDCARRETEIRO,
  setLoadWagonerMessage,
  daysBefore,
  signoutWagoner,
}: GetApi): Promise<boolean> => {
  let countItemColeta = 0;
  let countRegisterItens = 0;
  let countInsertRegisterItens = 0;
  const db = await getDBConnection();
  const DFIDULTIMACOLETA = await selectLastCollectId({
    db,
    DFIDCARRETEIRO: Number(DFIDCARRETEIRO),
  });

  return new Promise(resolve => {
    try {
      const signoutWagonerID = signoutWagoner
        ? signoutWagoner.DFIDCARRETEIRO
        : null;

      const collectDFIDCARRETEIROAndDFDIASANTESDEHOJE = `/coleta/mobile/allCollectData?DFIDCARRETEIRO=${DFIDCARRETEIRO}&DFDIASANTESDEHOJE=${daysBefore}`;

      const collectAll = `/coleta/mobile/allCollectData?DFIDCARRETEIRO=${DFIDCARRETEIRO}&DFIDULTIMACOLETA=${DFIDULTIMACOLETA}&DFDIASANTESDEHOJE=${daysBefore}`;

      const collect =
        DFIDULTIMACOLETA != null
          ? collectAll
          : collectDFIDCARRETEIROAndDFDIASANTESDEHOJE;

      if (
        !DFIDULTIMACOLETA &&
        signoutWagonerID &&
        DFIDCARRETEIRO !== signoutWagonerID
      ) {
        deleteTable({ db, table: 'TBCOLETA' });
        deleteTable({ db, table: 'TBITEMCOLETA' });
        deleteTable({ db, table: 'TBPRODUTORCOLETA' });
        deleteTable({ db, table: 'TBBOCAARMAZENADA' });
        deleteTable({ db, table: 'TBREGISTRO' });
        deleteTable({ db, table: 'TBITEMREGISTRO' });
      }

      META_COLLECT_API.get<GetCollectInformation>(collect)
        .then(res => {
          setLoadWagonerMessage('Sicronizando as informações das coletas');
          const { coletas, itensregistro } = res.data;
          if (coletas.length > 0) {
            for (let coleta in coletas) {
              const { DFIDCOLETA, DFREGISTRO, DFITEMCOLETA } = coletas[coleta];
              // COLETA
              insertCollectApi({
                db,
                insertCollect: coletas[coleta],
              }).then(resIdCollect => {
                for (let registro in DFREGISTRO) {
                  insertTbRegistroApi({
                    db,
                    register: DFREGISTRO[registro],
                    DFIDCOLETAAPP: resIdCollect,
                  });
                }

                countItemColeta = 0;
                for (let itemColeta in DFITEMCOLETA) {
                  countItemColeta++;
                  const { DFIDITEMCOLETA, DFPRODUTOR, DFBOCA } =
                    DFITEMCOLETA[itemColeta];
                  insertTbItemColetaApi({
                    db,
                    collectItem: DFITEMCOLETA[itemColeta],
                    DFIDCOLETAAPP: resIdCollect,
                  }).then(resIdCollectItem => {
                    for (let produtore in DFPRODUTOR) {
                      insertProdutorColetaApi({
                        db,
                        producerCollect: DFPRODUTOR[produtore],
                        DFIDITEMCOLETAAPP: resIdCollectItem,
                      });
                    }
                    for (let boca in DFBOCA) {
                      insertTbBocaArmazenadaApi({
                        db,
                        storedMouth: DFBOCA[boca],
                        DFIDITEMCOLETAAPP: resIdCollectItem,
                      });
                    }
                    const filteredRegisterByCollectItemId =
                      DFREGISTRO &&
                      DFREGISTRO.filter(
                        item =>
                          item.DFIDCOLETA === DFIDCOLETA &&
                          item.DFIDITEMCOLETA === DFIDITEMCOLETA,
                      );

                    for (let registro in filteredRegisterByCollectItemId) {
                      const { DFIDREGISTRO } =
                        filteredRegisterByCollectItemId[registro];
                      insertTbRegistroApi({
                        db,
                        register: filteredRegisterByCollectItemId[registro],
                        DFIDITEMCOLETAAPP: resIdCollectItem,
                        DFIDCOLETAAPP: resIdCollect,
                      }).then(idRegister => {
                        const filteredRegisterItensByCollectItemId =
                          itensregistro.filter(
                            item => item.DFIDREGISTRO === DFIDREGISTRO,
                          );

                        if (filteredRegisterItensByCollectItemId.length > 0) {
                          countRegisterItens += 1;

                          for (let registro in filteredRegisterItensByCollectItemId) {
                            let image =
                              filteredRegisterItensByCollectItemId[registro]
                                .DFREGISTROIMAGEM;
                            const buffer = Buffer.from(image.data).toString();
                            insertItemRegistroApi({
                              db,
                              registerItem:
                                filteredRegisterItensByCollectItemId[registro],
                              DFIDREGISTROAPP: idRegister,
                              DFREGISTROIMAGEM: buffer,
                            });
                            if (
                              Number(registro) ===
                              filteredRegisterItensByCollectItemId.length - 1
                            ) {
                              countInsertRegisterItens += 1;
                            }
                          }
                        }
                        if (
                          Number(itemColeta) === countItemColeta - 1 &&
                          Number(coleta) === coletas.length - 1 &&
                          countRegisterItens === countInsertRegisterItens
                        ) {
                          resolve(true);
                          return true;
                        }
                      });
                    }

                    if (
                      Number(itemColeta) === countItemColeta - 1 &&
                      Number(coleta) === coletas.length - 1 &&
                      countRegisterItens === countInsertRegisterItens
                    ) {
                      resolve(true);
                      return true;
                    }
                  });
                }
              });
            }
          } else {
            resolve(true);
            return true;
          }
        })
        .catch(error => {
          resolve(true);
          return true;
        });
    } catch (erro) {
      resolve(true);
      return true;
    }
  });
};

export { getAllCollectInformation };
