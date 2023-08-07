import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getDBConnection } from '../databases/conection';
import { searchTbItemColeta } from '../databases/TBITEMCOLETA/SELECT/searchTbItemColeta';
import { selectAllProducersFromTank } from '../databases/TBTANQUE/SELECT/selectAllProducersFromTank';
import { Collect } from '../types/collect';
import { CollectItem } from '../types/collectItem';
import { InformDistribution } from '../types/informDistribution';
import { TankBond } from '../types/tankBond';
import { tankListItem } from '../types/tankListItem';

interface IInfoCollectContext {
  children: ReactNode;
}

export interface ICurrentCollectItem {
  DFIDITEMCOLETAAPP: number;
}

interface IInfoCollect {
  setTankBond?: Dispatch<SetStateAction<TankBond[]>>;
  tankBond?: TankBond[];
  setCollect: Dispatch<SetStateAction<Collect[]>>;
  collect: Collect[];
  currentCollectItem: ({ DFIDITEMCOLETAAPP }: ICurrentCollectItem) => void;
  setIdMouth: Dispatch<SetStateAction<string>>;
  idMouth: string;
  setProducer: Dispatch<SetStateAction<InformDistribution>>;
  producer: InformDistribution;
  loadingCollectTankOptions: boolean;
  collectItem: CollectItem;
  setCollectItem: Dispatch<SetStateAction<CollectItem>>;
  selectdTackListItem: tankListItem;
  setSelectdTackListItem: Dispatch<SetStateAction<tankListItem>>;
}
const Context = createContext({} as IInfoCollect);

const InfoCollectContext = ({ children }: IInfoCollectContext) => {
  const [collect, setCollect] = useState<Collect[]>([]);
  const [tankBond, setTankBond] = useState<TankBond[]>([]);
  const [selectdTackListItem, setSelectdTackListItem] =
    useState<tankListItem>();
  const [idMouth, setIdMouth] = useState<string>();
  const [producer, setProducer] = useState<InformDistribution>();
  const [collectItem, setCollectItem] = useState<CollectItem>({});
  const [loadingCollectTankOptions, setLoadingCollectTankOptions] =
    useState<boolean>(false);

  const currentCollectItem = async ({
    DFIDITEMCOLETAAPP,
  }: ICurrentCollectItem) => {
    setLoadingCollectTankOptions(true);
    const db = await getDBConnection();
    await searchTbItemColeta({ db, DFIDITEMCOLETAAPP })
      .then(res => {
        setCollectItem(res[0]);
        setLoadingCollectTankOptions(false);
      })
      .catch(() => {
        setLoadingCollectTankOptions(false);
      });
  };

  const loadItemCollect = async (DFIDTANQUE: number) => {
    // setLoading(true);
    const db = await getDBConnection();
    selectAllProducersFromTank({ db, DFIDTANQUE: Number(DFIDTANQUE) }).then(
      response => {
        setTankBond(response);
      },
    );
  };

  useEffect(() => {
    if (collectItem) {
      loadItemCollect(Number(collectItem.DFIDTANQUE));
      // SE DER UM ERRO DE MA FORMAÇÃO PODE SER ISSO AQUI QUE ESTAVA DENTRO
      // DO INDEX DO TANKOPTION
    }
  }, [collectItem]);

  return (
    <Context.Provider
      value={{
        collect,
        setCollect,
        setTankBond,
        tankBond,
        collectItem,
        setCollectItem,
        currentCollectItem,
        setIdMouth,
        idMouth,
        producer,
        setProducer,
        loadingCollectTankOptions,
        selectdTackListItem,
        setSelectdTackListItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};
const useInfoCollect = () => {
  const context = useContext(Context);
  return context;
};

export { useInfoCollect, InfoCollectContext };
