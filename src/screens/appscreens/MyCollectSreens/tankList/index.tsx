import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import CustomFormButton from '../../../../components/Buttons/CustomFormButton';
import { CustomDontExistItem } from '../../../../components/CustomDontExistItem';
import { CustomLoad } from '../../../../components/CustomLoad';
import { CustomSearch } from '../../../../components/CustomSearch';
import { CustomTankListItem } from '../../../../components/CustomTankListItem';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../../components/global';
import { StartCollectProps } from '../../../../routes/types/approutes/appscreen';
import { tankListItem } from '../../../../types/tankListItem';
import { handleTankRescue, loadTankList, searchTankList } from './services';

export const TankList = ({ navigation, route }: StartCollectProps) => {
  const { idCollect } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [filteredTankList, setFilteredTankList] = useState<tankListItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadTankList({
        DFIDCOLETAAPP: Number(idCollect),
        setLoading,
        setFilteredTankList,
      });
    }, []),
  );

  useEffect(() => {
    searchTankList({
      value: search,
      setFilteredTankList,
    });
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
            <Title>Lista de tanques</Title>
            <CustomSearch {...{ setValue: setSearch, value: search }} />
            <CustomScrollView>
              {filteredTankList.length === 0 ? (
                <CustomDontExistItem text="Nenhum tanque foi encontrado" />
              ) : (
                <>
                  {filteredTankList.map((tank, key) => {
                    return (
                      <CustomTankListItem
                        {...{ data: { navigation, route, tank }, key }}
                      />
                    );
                  })}
                </>
              )}
            </CustomScrollView>
            <CustomFormButton
              selectColor="primary"
              title="Socorrer"
              onPress={() => handleTankRescue({ navigation, route })}
            />
          </Content>
        )}
      </>
    </Container>
  );
};
