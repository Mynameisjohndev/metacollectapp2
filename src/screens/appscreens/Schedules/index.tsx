import { useEffect, useState } from 'react';

import { CustomDontExistItem } from '../../../components/CustomDontExistItem';
import { CustomLoad } from '../../../components/CustomLoad';
import { CustomScheduleCollect } from '../../../components/CustomScheduleCollect';
import { CustomSearch } from '../../../components/CustomSearch';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../components/global';
import { wagonerContext } from '../../../context/wagonerContext';
import { SchedulesTypeProps } from '../../../routes/types/approutes/appscreen';
import { IScheduleCollect } from '../../../types/scheduleCollect';
import { executegetScheduleCollects, searchScheduleCollect } from './services';

const Schedules = ({ navigation }: SchedulesTypeProps) => {
  const [scheduleCollects, setScheduleCollects] = useState<IScheduleCollect[]>(
    [],
  );
  const [scheduleCollectsLoading, setScheduleCollectsLoading] =
    useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  const { wagoner } = wagonerContext();

  useEffect(() => {
    executegetScheduleCollects({
      DFIDCARRETEIRO: String(wagoner.DFIDCARRETEIRO),
      setScheduleCollects,
      setScheduleCollectsLoading,
    });
  }, []);

  useEffect(() => {
    searchScheduleCollect({ setScheduleCollects, value: search });
  }, [search]);

  return (
    <Container>
      {scheduleCollectsLoading ? (
        <CustomLoad text="Carregando dados" />
      ) : (
        <Content>
          <Title>Coletas programadas</Title>
          <CustomSearch
            {...{
              setValue: setSearch,
              value: search,
            }}
          />
          <CustomScrollView>
            {scheduleCollects.length === 0 ? (
              <CustomDontExistItem text="Nenhuma coleta foi encontrada!" />
            ) : (
              <>
                {scheduleCollects.map((item, key) => {
                  return <CustomScheduleCollect {...item} key={key} />;
                })}
              </>
            )}
          </CustomScrollView>
        </Content>
      )}
    </Container>
  );
};

export { Schedules };
