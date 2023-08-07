import { useEffect, useState } from 'react';

import { CustomDontExistItem } from '../../../components/CustomDontExistItem';
import { CustomHistoryCard } from '../../../components/CustomHistoryCard';
import { CustomLoad } from '../../../components/CustomLoad';
import { CustomSearch } from '../../../components/CustomSearch';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../components/global';
import { wagonerContext } from '../../../context/wagonerContext';
import { HistoricFirstProps } from '../../../routes/types/approutes/appscreen';
import { TypeHistorySearch } from '../../../types/typeHistorySearch';
import { formatDate } from '../../../utils/formatDate';
import {
  handleNavigateTCollectInformation,
  searchTankList,
  searchWagonerHistoric,
} from './services';

export const Historic = ({ navigation }: HistoricFirstProps) => {
  const { wagoner } = wagonerContext();
  const [filterdHistory, setFilteredHistory] = useState<TypeHistorySearch[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    searchWagonerHistoric({
      id: wagoner.DFIDCARRETEIRO,
      setFilteredHistory,
      setLoading,
    });
  }, []);

  useEffect(() => {
    searchTankList({ setFilteredHistory, value: search });
  }, [search]);

  return (
    <Container>
      <>
        {loading ? (
          <CustomLoad text="Carregando dados" />
        ) : (
          <Content
            style={{
              alignItems: `${loading === true ? 'center' : 'flex-start'}`,
            }}
          >
            <Title>Histórico de coletas</Title>
            <CustomSearch
              {...{
                setValue: setSearch,
                value: search,
              }}
            />
            <CustomScrollView>
              {filterdHistory.length === 0 ? (
                <CustomDontExistItem text="Nenhuma coleta foi encontrada!" />
              ) : (
                filterdHistory.map(historys => {
                  const {
                    DFDATAPROGRAMADA,
                    DFDESCREGIONAL,
                    DFPLACAVEICULO,
                    DFNOMELINHA,
                    DFIDCOLETAAPP,
                  } = historys;
                  return (
                    <CustomHistoryCard
                      key={DFIDCOLETAAPP}
                      collectDate={formatDate(DFDATAPROGRAMADA)}
                      id={DFIDCOLETAAPP}
                      line={DFNOMELINHA}
                      route={DFDESCREGIONAL}
                      vehicle={DFPLACAVEICULO}
                      handleCollectInformation={() =>
                        handleNavigateTCollectInformation({
                          setNavigation: () =>
                            navigation.navigate('HistoricTankList', {
                              idCollect: DFIDCOLETAAPP,
                            }),
                        })
                      }
                    />
                  );
                })
              )}
            </CustomScrollView>
          </Content>
        )}
      </>
    </Container>
  );
};
