import { useFocusEffect } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { CustomDontExistItem } from '../../../../components/CustomDontExistItem';
import { CustomHistoricTankListItem } from '../../../../components/CustomHistoricTankListItem';
import { CustomLoad } from '../../../../components/CustomLoad';
import { CustomSearch } from '../../../../components/CustomSearch';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../../components/global';
import { HistoricTankListProps } from '../../../../routes/types/approutes/appscreen';
import { tankListItem } from '../../../../types/tankListItem';
import {
  handleNavigateToInformationItemCollect,
  loadTankList,
  searchTankList,
} from './services';

export const HistoricTankList = ({
  navigation,
  route,
}: HistoricTankListProps) => {
  const { idCollect } = route.params;
  const [filteredTankList, setFilteredTankList] = useState<tankListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      loadTankList({ idCollect, setLoading, setFilteredTankList });
    }, []),
  );

  useEffect(() => {
    searchTankList({
      value: search,
      setFilteredTankList,
    });
  }, [search]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Coleta #${idCollect}`,
    });
  }, [navigation]);

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
            <Title>Lista de tanques</Title>
            <CustomSearch
              {...{
                setValue: setSearch,
                value: search,
              }}
            />
            <CustomScrollView>
              {filteredTankList.length > 0 ? (
                <>
                  {filteredTankList.map((tank, key) => {
                    const { DFIDITEMCOLETAAPP, DFNOMEPROPRIEDADE } = tank;
                    return (
                      <CustomHistoricTankListItem
                        {...{
                          tank,
                          handleNavigateToInformationItemCollect: () =>
                            handleNavigateToInformationItemCollect({
                              navigation,
                              route,
                              DFIDITEMCOLETAAPP,
                              DFIDCOLETAAPP: Number(idCollect),
                              DFNOMEPROPRIEDADE,
                            }),
                          key,
                        }}
                      />
                    );
                  })}
                </>
              ) : (
                <CustomDontExistItem text="Nenhum tanque foi encontrado!" />
              )}
            </CustomScrollView>
          </Content>
        )}
      </>
    </Container>
  );
};
