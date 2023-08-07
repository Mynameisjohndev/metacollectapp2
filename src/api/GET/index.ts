import { Alert } from 'react-native';

import { META_COLLECT_API } from '..';

import { getDBConnection } from '../../databases/conection';
import { selectOpenCollect } from '../../databases/TBCOLETA/SELECT/selectOpenCollect';
import { updateSynchronizeStatus } from '../../services/Syncronzine/services';
import { Collect } from '../../types/collect';
import { SynchronizeAppMetaCollect } from '../../types/synchronizeAppMetaCollect';
import { getAllCollectInformation } from './TBCOLETA';
import { getAllConfig } from './TBCONFIGURACAO';
import { getAllLine } from './TBLINHA';
import { getAllProperty } from './TBPROPRIEDADE';
import { getAllSilo } from './TBSILO';
import { getAllTank } from './TBTANQUE';
import { getAllVehicleTank } from './TBTANQUEVEICULO';
import { getAllRegion } from './TBTREGIAO';
import { getAllUnities } from './TBUNIDADE';
import { getAllVehicle } from './TBVEICULO';
import { getAllBondTank } from './TBVINCULOTANQUE';

const synchronizeAppMetaCollect = ({
  setLoadingExistWagoner,
  DFIDCARRETEIRO,
  setSelectedCollect,
  setLoadWagonerMessage,
  daysBefore,
  DFIMEI,
  signoutWagoner,
}: SynchronizeAppMetaCollect) => {
  const stopSynchronizeSuccess = () => {
    updateSynchronizeStatus({
      data: { isSynchronized: true, DFIDCARRETEIRO: Number(DFIDCARRETEIRO) },
    });
    return setLoadingExistWagoner(false);
  };

  const stopSynchronizeError = () => {
    updateSynchronizeStatus({
      data: { isSynchronized: false, DFIDCARRETEIRO: Number(DFIDCARRETEIRO) },
    });
    Alert.alert(
      'Erro de sincronização',
      'Durante a sincronização aconteceu um erro inesperado, clique em "sim" para iniciar ela novamente!',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            synchronizeAppMetaCollect({
              setLoadingExistWagoner,
              setLoadWagonerMessage,
              DFIDCARRETEIRO,
              setSelectedCollect,
              daysBefore,
              DFIMEI,
              signoutWagoner,
            });
          },
        },
      ],
    );
    return setLoadingExistWagoner(false);
  };

  const dataSynchronize = {
    setLoadWagonerMessage,
    META_COLLECT_API,
  };

  const dataSynchronizeCollect = {
    setLoadWagonerMessage,
    META_COLLECT_API,
    DFIDCARRETEIRO,
    daysBefore,
    DFIMEI,
    signoutWagoner,
  };

  return getAllConfig(dataSynchronizeCollect)
    .then(res => {
      if (res === true) {
        return getAllUnities(dataSynchronize)
          .then(res => {
            if (res === true) {
              // console.log('1');
              return getAllSilo(dataSynchronize)
                .then(res => {
                  if (res === true) {
                    // console.log('2');
                    return getAllRegion(dataSynchronize)
                      .then(res => {
                        if (res === true) {
                          // console.log('3');
                          return getAllLine(dataSynchronize)
                            .then(res => {
                              if (res === true) {
                                // console.log('4');
                                return getAllTank(dataSynchronize)
                                  .then(res => {
                                    if (res === true) {
                                      // console.log('5');
                                      return getAllProperty(dataSynchronize)
                                        .then(res => {
                                          if (res === true) {
                                            // console.log('6');
                                            return getAllVehicle(
                                              dataSynchronize,
                                            )
                                              .then(res => {
                                                if (res === true) {
                                                  // console.log('7');
                                                  return getAllVehicleTank(
                                                    dataSynchronize,
                                                  )
                                                    .then(res => {
                                                      if (res === true) {
                                                        // console.log('8');
                                                        return getAllBondTank(
                                                          dataSynchronize,
                                                        ).then(res => {
                                                          if (res === true) {
                                                            // console.log('9');
                                                            return getAllCollectInformation(
                                                              dataSynchronizeCollect,
                                                            )
                                                              .then(
                                                                async res => {
                                                                  // console.log(
                                                                  //   res,
                                                                  // );
                                                                  if (
                                                                    res === true
                                                                  ) {
                                                                    // console.log(
                                                                    //   '10',
                                                                    // );
                                                                    if (
                                                                      setSelectedCollect
                                                                    ) {
                                                                      const db =
                                                                        await getDBConnection();

                                                                      selectOpenCollect(
                                                                        {
                                                                          db,
                                                                        },
                                                                      ).then(
                                                                        (
                                                                          res: Collect[],
                                                                        ) => {
                                                                          setSelectedCollect(
                                                                            res,
                                                                          );
                                                                          stopSynchronizeSuccess();
                                                                        },
                                                                      );
                                                                    } else {
                                                                      stopSynchronizeSuccess();
                                                                    }
                                                                  } else {
                                                                    stopSynchronizeSuccess();
                                                                  }
                                                                },
                                                              )
                                                              .catch(() => {
                                                                // console.log(
                                                                //   '1',
                                                                // );
                                                                stopSynchronizeError();
                                                              });
                                                          }
                                                          // console.log('2');
                                                          stopSynchronizeError();
                                                        });
                                                      }
                                                      // console.log('3');
                                                      stopSynchronizeError();
                                                    })
                                                    .catch(() => {
                                                      // console.log('4');
                                                      stopSynchronizeError();
                                                    });
                                                }
                                                // console.log('3');
                                                stopSynchronizeError();
                                              })
                                              .catch(() => {
                                                // console.log('6');
                                                stopSynchronizeError();
                                              });
                                          }
                                          // console.log('7');
                                          stopSynchronizeError();
                                        })
                                        .catch(() => {
                                          // console.log('8');
                                          stopSynchronizeError();
                                        });
                                    }
                                    // console.log('9');
                                    stopSynchronizeError();
                                  })
                                  .catch(() => {
                                    // console.log('10');
                                    stopSynchronizeError();
                                  });
                              }
                              // console.log('11');
                              stopSynchronizeError();
                            })
                            .catch(() => {
                              // console.log('12');
                              stopSynchronizeError();
                            });
                        }
                        // console.log('13');
                        stopSynchronizeError();
                      })
                      .catch(() => {
                        // console.log('14');
                        stopSynchronizeError();
                      });
                  }
                  // console.log('15');
                })
                .catch(() => {
                  // console.log('16');
                  stopSynchronizeError();
                });
            }
            // console.log('17');
            stopSynchronizeError();
          })
          .catch(() => {
            // console.log('18');
            stopSynchronizeError();
          });
      }
      // console.log('19');
      stopSynchronizeError();
    })
    .catch(() => {
      // console.log('20');
      stopSynchronizeError();
    });
};
export { synchronizeAppMetaCollect };
