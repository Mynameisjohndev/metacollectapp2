/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-expressions */

import React, {
  useContext,
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import { getDBConnection } from '../databases/conection';
import { upsertTbConfuguracao } from '../databases/TBCONFIGURACAO/INSERT/upsertTbConfuguracao';
import { selectWagonerConfig } from '../databases/TBCONFIGURACAO/SELECT/selectWagonerConfig';
import { requestGpsLocation } from '../services/GPS/activeLocationPermissions';
import { Config } from '../types/config';
import { currentDate } from '../utils/getCurrentDate';
import { currentTime } from '../utils/getCurrentTime';
import { returnOfImeiPermission } from '../utils/readPhoneStatePermission';
import { requestDeviceInformation } from '../utils/requestDeviceInformation';
import { wagonerContext } from './wagonerContext';

interface IUserProviderContext {
  children: ReactNode;
}

interface IUpdateConfig {
  hasRuleBack: boolean;
  hasDischarge: boolean;
  hasQuality: boolean;
}
interface IWagonerContext {
  hasVolume: boolean;
  setHasVolume: Dispatch<SetStateAction<boolean>>;
  hasQuality: boolean;
  setHasQuality: Dispatch<SetStateAction<boolean>>;
  hasTemperature: boolean;
  setHasTemperature: Dispatch<SetStateAction<boolean>>;
  hasRuleFront: boolean;
  setHasRuleFront: Dispatch<SetStateAction<boolean>>;
  hasRuleBack: boolean;
  setHasRuleBack: Dispatch<SetStateAction<boolean>>;
  hasStorage: boolean;
  setHasStorage: Dispatch<SetStateAction<boolean>>;
  hasDischarge: boolean;
  setHasDischarge: Dispatch<SetStateAction<boolean>>;
  updateConfig: ({ hasDischarge, hasRuleBack }: IUpdateConfig) => void;
  returnConfig: () => Promise<boolean>;
  restoreConfig: () => void;
  daysBefore: number;
}

const Context = createContext({} as IWagonerContext);

const WagonerSettingsProviderContext = ({ children }: IUserProviderContext) => {
  const [hasVolume, setHasVolume] = useState<boolean>(true);
  const [hasQuality, setHasQuality] = useState<boolean>(true);
  const [hasTemperature, setHasTemperature] = useState<boolean>(true);
  const [hasRuleFront, setHasRuleFront] = useState<boolean>(true);
  const [hasRuleBack, setHasRuleBack] = useState<boolean>(false);
  const [hasStorage, setHasStorage] = useState<boolean>(true);
  const [hasDischarge, setHasDischarge] = useState<boolean>(true);
  const [daysBefore, setDaysBefore] = useState<number>(15);
  const [DFIMEI, setDFIMEI] = useState<string | boolean>();

  const { wagoner, headers } = wagonerContext();

  const config: Config = wagoner && {
    DFDISTRIBUIR: hasDischarge === false ? 'N' : 'S',
    DFREGUAATRAS: hasRuleBack === false ? 'N' : 'S',
    DFQUALIDADE: hasQuality === false ? 'N' : 'S',
    DFIDCARRETEIRO: Number(wagoner.DFIDCARRETEIRO),
    DFDATASINCRONIZACAO: currentDate(),
    DFHORASINCRONIZACAO: currentTime(),
    DFIMEI: DFIMEI !== false ? String(DFIMEI) : String(headers.imei),
  };
  const restoreConfiguration: Config = wagoner && {
    DFDISTRIBUIR: 'S',
    DFREGUAATRAS: 'N',
    DFQUALIDADE: 'S',
    DFIDCARRETEIRO: Number(wagoner.DFIDCARRETEIRO),
    DFDATASINCRONIZACAO: currentDate(),
    DFHORASINCRONIZACAO: currentTime(),
    DFIMEI: DFIMEI !== false ? String(DFIMEI) : String(headers.imei),
  };

  const updateConfig = async ({
    hasDischarge,
    hasRuleBack,
    hasQuality,
  }: IUpdateConfig) => {
    const db = await getDBConnection();
    if (wagoner) {
      upsertTbConfuguracao({ db, config });
    }
    setHasDischarge(hasDischarge);
    setHasRuleBack(hasRuleBack);
    setHasQuality(hasQuality);
  };

  const returnConfig = async (): Promise<boolean> => {
    return new Promise(async resolve => {
      if (wagoner) {
        const db = await getDBConnection();
        const config = await selectWagonerConfig({
          db,
          DFIDCARRETEIRO: Number(wagoner.DFIDCARRETEIRO),
        });
        if (config[0]) {
          const { DFDISTRIBUIR, DFREGUAATRAS, DFQUALIDADE } = config[0];

          if (DFDISTRIBUIR) {
            DFDISTRIBUIR === 'N'
              ? setHasDischarge(false)
              : setHasDischarge(true);
          }

          if (DFREGUAATRAS) {
            DFREGUAATRAS === 'N' ? setHasRuleBack(false) : setHasRuleBack(true);
          }

          if (DFQUALIDADE) {
            DFQUALIDADE === 'N' ? setHasQuality(false) : setHasQuality(true);
          }
          resolve(true);
          return true;
        }
        upsertTbConfuguracao({ db, config: restoreConfiguration });
        resolve(true);
        return true;
      }
    });
  };

  const restoreConfig = async () => {
    const db = await getDBConnection();
    if (wagoner) {
      upsertTbConfuguracao({ db, config: restoreConfiguration });
      setHasDischarge(true);
      setHasRuleBack(false);
      setHasQuality(true);
    }
  };

  useEffect(() => {
    returnOfImeiPermission().then(res => {
      if (res !== false) {
        setDFIMEI(String(res));
        returnConfig();
      }
      requestGpsLocation().then(() => {
        requestDeviceInformation({ DFIDCARRETEIRO: null, DFIDLICENCA: null });
      });
    });
  }, [wagoner]);

  return (
    <Context.Provider
      value={{
        hasQuality,
        hasTemperature,
        hasVolume,
        setHasQuality,
        setHasTemperature,
        setHasVolume,
        hasRuleFront,
        setHasRuleFront,
        hasRuleBack,
        setHasRuleBack,
        hasStorage,
        setHasStorage,
        hasDischarge,
        setHasDischarge,
        updateConfig,
        returnConfig,
        restoreConfig,
        daysBefore,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useWagonerSettingsContext = () => {
  const context = useContext(Context);
  return context;
};

export { WagonerSettingsProviderContext, useWagonerSettingsContext };
