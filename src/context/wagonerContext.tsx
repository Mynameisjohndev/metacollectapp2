import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, {
  useContext,
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from 'react';
import { Alert } from 'react-native';

import { META_COLLECT_API } from '../api';
import { getDBConnection } from '../databases/conection';
import { deleteTable } from '../databases/select/delete/deleteTable';
import { getCollects } from '../databases/TBCOLETA/SELECT/getCollects';
import { selectOpenCollect } from '../databases/TBCOLETA/SELECT/selectOpenCollect';
import { selectValidateSignout } from '../databases/TBCOLETA/SELECT/selectValidateSignout';
import { updateDataAfterSynchronization } from '../databases/TBCONFIGURACAO/UPDATE/updateDataAfterSynchronization';
import { updateIMEIFromSetting } from '../databases/TBCONFIGURACAO/UPDATE/updateReleasingIMEIFromSetting';
import { localSynchronizeApp } from '../services/Syncronzine/localSyncronizeApp';
import { stopTask } from '../services/Task/stopTask';
import { Collect } from '../types/collect';
import { IValidModalContext } from '../types/validModalContext';
import { Carreteiro } from '../types/wagoner';
import { WagonerHeaders } from '../types/wagonerHeaders';
import { currentDate } from '../utils/getCurrentDate';
import { currentTime } from '../utils/getCurrentTime';
import { getInternetStatus } from '../utils/getInternetStatus';
import { returnOfImeiPermission } from '../utils/readPhoneStatePermission';
import { requestDeviceInformation } from '../utils/requestDeviceInformation';

interface IUserProviderContext {
  children: ReactNode;
}

interface IHandleValidTokenWagoner {
  cnpj?: string;
  token: string;
  setModal: Dispatch<SetStateAction<IValidModalContext>>;
  navigate: () => void;
}

interface IHandleLoginUser {
  DFLOGIN: string;
  DFSENHA: string;
  setModal: Dispatch<SetStateAction<IValidModalContext>>;
  keepConected: boolean;
  loadingExistWagoner: boolean;
  daysBefore?: number;
  signinLoading?: boolean;
  setSigninLoading?: Dispatch<SetStateAction<boolean>>;
}

export type ISignoutWagoner = {
  DFIDCARRETEIRO?: number;
  DFIDVINCULODISPOSITIVO?: number;
};
interface IHandleSignout {
  DFIDCARRETEIRO?: number;
}

interface IWagonerContext {
  wagoner: Carreteiro;
  setWagoner: Dispatch<SetStateAction<Carreteiro>>;
  loadingExistWagoner: boolean;
  handleValidTokenWagoner: ({ token, cnpj }: IHandleValidTokenWagoner) => void;
  handleLoginUser: ({
    DFLOGIN,
    DFSENHA,
    setModal,
    keepConected,
    loadingExistWagoner,
  }: IHandleLoginUser) => void;
  handleSignout: ({ DFIDCARRETEIRO }: IHandleSignout) => void;
  loadWagonerMessage: string;
  setLoadWagonerMessage: Dispatch<SetStateAction<string>>;
  validTokenLoading: boolean;
  setValidTokenLoading: Dispatch<SetStateAction<boolean>>;
  headers: WagonerHeaders;
  signoutWagoner: ISignoutWagoner;
}

interface IPostDeviceLink {
  headers: WagonerHeaders;
  DFIDCARRETEIRO: number;
}

interface ILocalSynchronizeCollect {
  DFIDCARRETEIRO: number;
  daysBefore: number;
  DFIMEI: string;
  data: Carreteiro;
  headers: WagonerHeaders;
}

interface ICheckOpenCollect {
  DFIDCARRETEIRO: number;
}

let receiveWagoner: Carreteiro;
const Context = createContext({} as IWagonerContext);

const UserProviderContext = ({ children }: IUserProviderContext) => {
  const [wagoner, setWagoner] = useState<Carreteiro>();
  const [loadingExistWagoner, setLoadingExistWagoner] = useState<boolean>(true);
  const [headers, setHeaders] = useState<WagonerHeaders>();
  const [signoutWagoner, setSignoutWagoner] = useState<ISignoutWagoner>();
  const [loadWagonerMessage, setLoadWagonerMessage] = useState('');
  const [validTokenLoading, setValidTokenLoading] = useState<boolean>();

  const handleValidTokenWagoner = async ({
    cnpj,
    token,
    setModal,
  }: IHandleValidTokenWagoner) => {
    setValidTokenLoading(true);
    if (!cnpj || !token) {
      setValidTokenLoading(false);
      return setModal({
        isOpen: true,
        modalType: 0,
      });
    }
    returnOfImeiPermission().then(async res => {
      if (typeof res === 'string') {
        const data = {
          cnpj,
          modulo: 35,
          token,
          imei: res,
        };
        return META_COLLECT_API.post('/carreteiro/validar', data)
          .then(res => {
            if (res.status === 200) {
              AsyncStorage.setItem(
                'meta_collect_headers',
                JSON.stringify(data),
              );
              META_COLLECT_API.defaults.headers = data as any;
              setValidTokenLoading(false);
              return setModal({
                isOpen: true,
                modalType: 1,
              });
            }
            setValidTokenLoading(false);
            return setModal({
              isOpen: true,
              modalType: 2,
            });
          })
          .catch(() => {
            setValidTokenLoading(false);
            return setModal({
              isOpen: true,
              modalType: 2,
            });
          });
      }
      setValidTokenLoading(false);
      return setModal({
        isOpen: true,
        modalType: 3,
      });
    });
  };

  const loginUserWithoutInternet = async ({
    DFLOGIN,
    DFSENHA,
    keepConected,
    setModal,
  }: IHandleLoginUser) => {
    if (
      DFLOGIN.toString() === receiveWagoner.DFLOGIN.toString() &&
      DFSENHA.toString() === receiveWagoner.DFSENHA.toString()
    ) {
      await AsyncStorage.setItem(
        'meta_collect_wagoner',
        JSON.stringify({ ...receiveWagoner, keepConected }),
      );
      return setWagoner(receiveWagoner);
    }
    return setModal({
      isOpen: true,
      modalType: 1,
    });
  };

  const saveSignoutWagoner = async (): Promise<ISignoutWagoner> => {
    const responseWagoner = await AsyncStorage.getItem(
      'meta_collect_signout_wagoner',
    );
    return new Promise(resolver => {
      if (responseWagoner) {
        const responseData = JSON.parse(responseWagoner);
        setSignoutWagoner(responseData);
        resolver(responseData);
        return responseData;
      }
    });
  };

  const releaseDeviceInformation = async (): Promise<boolean> => {
    const db = await getDBConnection();
    const { imei } = headers;
    const { DFIDVINCULODISPOSITIVO, DFIDCARRETEIRO } = signoutWagoner;
    const data = { DFIMEI: imei, DFIDCARRETEIRO, DFIDVINCULODISPOSITIVO };

    return new Promise(resolver => {
      try {
        META_COLLECT_API.patch(`/dispositivo/mobile/liberar`, data)
          .then(res => {
            updateIMEIFromSetting({ db, DFIDCARRETEIRO });
            resolver(true);
            return true;
          })
          .catch(error => {
            // console.log(`ERRO 1 ${error}`);
            resolver(false);
            return false;
          });
      } catch (error) {
        // console.log(`ERRO 2 ${error}`);
        resolver(false);
        return false;
      }
    });
  };

  const postDeviceLink = async ({
    DFIDCARRETEIRO,
    headers,
  }: IPostDeviceLink): Promise<boolean> => {
    const { token } = headers;
    const dataDeviceInformation = await requestDeviceInformation({
      DFIDCARRETEIRO: Number(DFIDCARRETEIRO),
      DFIDLICENCA: token,
    });

    return new Promise(resolver => {
      return META_COLLECT_API.post(
        `/dispositivo/mobile/upsert`,
        dataDeviceInformation,
      )
        .then(async res => {
          await AsyncStorage.setItem(
            'meta_collect_signout_wagoner',
            JSON.stringify({
              DFIDCARRETEIRO: null,
              DFIDVINCULODISPOSITIVO: res.data.DFIDVINCULODISPOSITIVO,
            }),
          )
            .then(() => {
              resolver(true);
              return true;
            })
            .catch(() => {
              resolver(false);
              return false;
            });
        })
        .catch(error => {
          resolver(false);
          return false;
        });
    });
  };

  const loadWagonerData = async () => {
    try {
      const responseWagoner = await AsyncStorage.getItem(
        'meta_collect_wagoner',
      );
      const responseHeaders = await AsyncStorage.getItem(
        'meta_collect_headers',
      );
      if (responseWagoner) {
        const responseData = await JSON.parse(responseWagoner);
        if (responseData && responseData.keepConected) {
          setWagoner(responseData);
        }
        receiveWagoner = responseData;
      }
      if (responseHeaders) {
        const responseData = JSON.parse(responseHeaders);
        if (responseData) {
          META_COLLECT_API.defaults.headers = responseData;
          setHeaders(responseData);
        }
      }
      setLoadingExistWagoner(false);
    } catch (error) {
      setLoadingExistWagoner(false);
    }
  };

  const localSynchronizeCollect = async ({
    DFIDCARRETEIRO,
    DFIMEI,
    daysBefore,
    data,
    headers,
  }: ILocalSynchronizeCollect) => {
    const db = await getDBConnection();
    return postDeviceLink({
      headers,
      DFIDCARRETEIRO,
    }).then(async res => {
      const collect = (await selectOpenCollect({
        db,
      })) as Collect[];
      const dischargeCollects = await getCollects({
        db,
        DFSTATUS: 'D',
      });

      await localSynchronizeApp({
        setVisible: setLoadingExistWagoner,
        DFIDCARRETEIRO,
        collect: collect[0],
        dischargeCollects,
        setLoadWagonerMessage,
        daysBefore,
        DFIMEI,
        signoutWagoner,
      });
      updateDataAfterSynchronization({
        db,
        DFDATASINCRONIZACAO: currentDate(),
        DFHORASINCRONIZACAO: currentTime(),
        DFIDCARRETEIRO: Number(DFIDCARRETEIRO),
      });

      return setWagoner(data);
    });
  };

  const handleLoginUser = async ({
    DFLOGIN,
    DFSENHA,
    keepConected,
    setModal,
    daysBefore,
    loadingExistWagoner,
    setSigninLoading,
  }: IHandleLoginUser) => {
    setSigninLoading(true);
    if (headers) {
      const { imei } = headers;

      // const isConnected = await getInternetStatus();
      if (!DFLOGIN || !DFSENHA) {
        setSigninLoading(false);
        return setModal({
          isOpen: true,
          modalType: 2,
        });
      }

      // if (!isConnected) {
      //   return loginUserWithoutInternet({
      //     DFLOGIN,
      //     DFSENHA,
      //     keepConected,
      //     setModal,
      //     loadingExistWagoner,
      //   });
      // }

      await META_COLLECT_API.post<Carreteiro>(
        '/carreteiro/login',
        {
          DFLOGIN,
          DFSENHA,
          DFIMEI: imei,
        },
        { headers },
      )
        .then(async res => {
          if (res.data) {
            const db = await getDBConnection();
            updateIMEIFromSetting({
              db,
              DFIDCARRETEIRO: Number(res.data.DFIDCARRETEIRO),
              DFIMEI: Number(imei),
            });
            await AsyncStorage.setItem(
              'meta_collect_wagoner',
              JSON.stringify({ ...res.data, keepConected }),
            );
            if (
              signoutWagoner &&
              Number(res.data.DFIDCARRETEIRO) !== signoutWagoner.DFIDCARRETEIRO
            ) {
              return releaseDeviceInformation().then(() => {
                setSigninLoading(false);
                localSynchronizeCollect({
                  DFIDCARRETEIRO: Number(res.data.DFIDCARRETEIRO),
                  data: res.data,
                  daysBefore,
                  DFIMEI: String(imei),
                  headers,
                });
              });
            }
            setSigninLoading(false);
            return localSynchronizeCollect({
              DFIDCARRETEIRO: Number(res.data.DFIDCARRETEIRO),
              data: res.data,
              daysBefore,
              DFIMEI: String(imei),
              headers,
            });
          }
        })
        .catch(error => {
          setSigninLoading(false);
          return setModal({
            isOpen: true,
            modalType:
              error.response.data.error !== undefined
                ? error.response.data.error
                : 2,
          });
        });
    } else {
      setSigninLoading(false);
      return setModal({
        isOpen: true,
        modalType: 0,
      });
    }
  };

  const checkOpenCollect = async ({ DFIDCARRETEIRO }: ICheckOpenCollect) => {
    const db = await getDBConnection();
    await selectValidateSignout({ db }).then(async res => {
      if (res[0] && res[0].DFSTATUS === 'A') {
        return Alert.alert(
          'Coleta em aberto',
          'Você não pode sair do aplicativo enquanto tiver uma coleta aberta.',
        );
      }
      stopTask();
      await AsyncStorage.setItem(
        'meta_collect_signout_wagoner',
        JSON.stringify({ ...wagoner, DFIDCARRETEIRO }),
      );
      await AsyncStorage.removeItem('meta_collect_wagoner');
      setWagoner(null);
      //   // if (res[0] && res[0].DFSTATUS === 'D') {
      //   //   return Alert.alert(
      //   //     'Sincronizar sua última coleta',
      //   //     'Você não pode sair do aplicativo antes de sincronizar sua última coleta realizada',
      //   //   );
      //   // }
    });
  };

  const handleSignout = ({ DFIDCARRETEIRO }: IHandleSignout) => {
    Alert.alert('Sair da aplicação', 'Você deseja sair da aplicação?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => {
          checkOpenCollect({ DFIDCARRETEIRO });
          // AsyncStorage.removeItem('meta_collect_wagoner');;
          // META_COLLECT_API.defaults.headers = null;
          // setHeaders(null);
          // AsyncStorage.removeItem('meta_collect_headers');
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      loadWagonerData();
      saveSignoutWagoner();
    }, []),
  );

  useEffect(() => {
    if (validTokenLoading === false) {
      loadWagonerData();
      saveSignoutWagoner();
    }
  }, [!validTokenLoading]);

  return (
    <Context.Provider
      value={{
        wagoner,
        setWagoner,
        loadingExistWagoner,
        handleValidTokenWagoner,
        handleLoginUser,
        handleSignout,
        setValidTokenLoading,
        validTokenLoading,
        loadWagonerMessage,
        setLoadWagonerMessage,
        headers,
        signoutWagoner,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const wagonerContext = () => {
  const context = useContext(Context);
  return context;
};

export { wagonerContext, UserProviderContext };
