import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { ScrollView } from 'react-native';

import CustomFormButton, {
  ICustomFormButtonRef,
} from '../../../../components/Buttons/CustomFormButton';
import { CustomLoad } from '../../../../components/CustomLoad';
import { CustomTankOption } from '../../../../components/CustomTankOption';
import { CustomTimeLine } from '../../../../components/CustomTankOption/CustomTimeline';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../../components/global';
import { ValidModal } from '../../../../components/Modal/ValidModal';
import { useInfoCollect } from '../../../../context/InfoCollectContext';
import { useWagonerSettingsContext } from '../../../../context/wagonerSettingsContext';
import { getDBConnection } from '../../../../databases/conection';
import { searchTbProdutorColetaCollectItem } from '../../../../databases/TBPRODUTORCOLETA/SELECT/searchTbProdutorColetaCollectItem';
import { TankOptionsProps } from '../../../../routes/types/approutes/appscreen';
import { ProducerCollect } from '../../../../types/producerCollect';
import { validFinalizeCollectMessages } from '../../../../utils/messages';
import { tankOptionsData } from './options';
import {
  IDataEndTankCollectObject,
  openModal,
  validEndTankCollect,
} from './services';

export const TankOptions = ({ navigation, route }: TankOptionsProps) => {
  const { DFIDITEMCOLETAAPP } = route.params.tank;
  const {
    hasRuleBack,
    hasDischarge,
    hasQuality,
    hasRuleFront,
    hasStorage,
    hasVolume,
    hasTemperature,
  } = useWagonerSettingsContext();
  const dataEndTankCollect: boolean[] = [
    hasRuleBack,
    hasDischarge,
    hasQuality,
    hasRuleFront,
    hasStorage,
    hasVolume,
    hasTemperature,
  ];
  const dataEndTankCollectObject: IDataEndTankCollectObject = {
    hasRuleBack,
    hasDischarge,
    hasQuality,
    hasRuleFront,
    hasStorage,
    hasVolume,
    hasTemperature,
  };

  const {
    collectItem,
    loadingCollectTankOptions,
    currentCollectItem,
    setSelectdTackListItem,
  } = useInfoCollect();
  const { DFIDCOLETAAPP, DFIDITEMCOLETA } = collectItem && collectItem;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const [loading, setLoading] = useState<boolean>();
  const [endLoading, setEndLoading] = useState<boolean>(false);
  const [producersCollects, setProducersCollects] = useState<ProducerCollect[]>(
    [],
  );
  const endCollectButtonRef = useRef<ICustomFormButtonRef>(null);

  const executeSearchTbProdutorColetaCollectItem = async () => {
    const db = await getDBConnection();
    await searchTbProdutorColetaCollectItem({
      db,
      DFIDITEMCOLETAAPP,
    }).then(res => {
      setProducersCollects(res);
    });
  };

  useFocusEffect(
    useCallback(() => {
      setSelectdTackListItem(route.params.tank);
      executeSearchTbProdutorColetaCollectItem();
      currentCollectItem({ DFIDITEMCOLETAAPP });
    }, []),
  );

  return (
    <Container>
      {loadingCollectTankOptions ? (
        <CustomLoad text="Carregando dados" />
      ) : (
        <Content>
          <CustomScrollView>
            <Title>Opções de tanque</Title>
            <CustomTimeLine
              {...{
                options: tankOptionsData,
                collectItem,
                producersCollects,
              }}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 10,
                paddingLeft: 10,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                flexWrap: 'wrap',
              }}
            >
              {tankOptionsData.map((item, index) => {
                return (
                  <CustomTankOption
                    key={index}
                    navigation={navigation}
                    route={route}
                    data={item}
                  />
                );
              })}
              <CustomTankOption
                key={9}
                navigation={navigation}
                route={route}
                data={{
                  icon: 'ProblemReport',
                  id: 9,
                  path: 'ProblemReport',
                  title: 'Relatar problema',
                }}
              />
            </ScrollView>
            <CustomFormButton
              selectColor="primary"
              title="Finalizar Coleta"
              ref={endCollectButtonRef}
              loading={endLoading}
              onPress={() =>
                validEndTankCollect({
                  collectItemTankOptions: collectItem,
                  dataEndTankCollect,
                  dataEndTankCollectObject,
                  producersCollects,
                  idCollect: DFIDCOLETAAPP,
                  idCollectItem: DFIDITEMCOLETAAPP,
                  idCollectItemCloud: DFIDITEMCOLETA,
                  isOpen,
                  setIsOpen,
                  setModalType,
                  navigator: {
                    navigation,
                    route,
                  },
                  ref: endCollectButtonRef.current,
                  setEndLoading,
                })
              }
            />
          </CustomScrollView>
        </Content>
      )}
      <ValidModal
        {...{
          isOpen,
          modalType,
          messages: validFinalizeCollectMessages,
          openModal: () => openModal({ isOpen, setIsOpen }),
          setLoading,
          handleNavigate: () => navigation.navigate('TankOptions'),
        }}
      />
    </Container>
  );
};
