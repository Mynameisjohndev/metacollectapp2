import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';

import CustomFormButton, {
  ICustomFormButtonRef,
} from '../../../../../components/Buttons/CustomFormButton';
import { CustomLoad } from '../../../../../components/CustomLoad';
import { CustomProducer } from '../../../../../components/CustomProducer';
import { CustomStorageInformation } from '../../../../../components/CustomStorageInformation';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../../../components/global';
import { ValidModal } from '../../../../../components/Modal/ValidModal';
import { CustomAddProperty } from '../../../../../components/Select/CustomSelectPropertyDistribution';
import { useInfoCollect } from '../../../../../context/InfoCollectContext';
import { useWagonerSettingsContext } from '../../../../../context/wagonerSettingsContext';
import { DistributionProps } from '../../../../../routes/types/approutes/appscreen';
import { ProducerCollect } from '../../../../../types/producerCollect';
import { ProducerData } from '../../../../../types/producerData';
import { Property } from '../../../../../types/property';
import { distributionMessages } from '../../../../../utils/messages';
import { returnAppIcons } from '../../../../../utils/returnAppIcons';
import { IDataEndTankCollectObject } from '../services';
import {
  distributionInformation,
  handleCloseAndOpenPropertyModal,
  informVolume,
  openModal,
  validDistribution,
} from './services';
import { ContainerDistribution } from './styles';

export const Distribution = ({ navigation, route }: DistributionProps) => {
  const { collectItem, tankBond, currentCollectItem } = useInfoCollect();
  const {
    DFIDITEMCOLETAAPP,
    DFIDITEMCOLETA,
    DFIDCOLETAAPP,
    DFIDCOLETA,
    DFQTDPREVISTA,
  } = collectItem && collectItem;
  const {
    hasRuleBack,
    hasDischarge,
    hasQuality,
    hasRuleFront,
    hasStorage,
    hasVolume,
    hasTemperature,
  } = useWagonerSettingsContext();
  const [volume, setVolume] = useState<string>('');
  const [storage, setStorage] = useState<string>(null);
  const [surplus, setSurplus] = useState<string>('');
  const [producers, setProducers] = useState<ProducerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [producersCollects, setProducersCollects] =
    useState<ProducerCollect[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const [isOpenModalProperty, setIsOpenModalProperty] =
    useState<boolean>(false);
  const [propertyList, setPropertyList] = useState<Property[]>([]);

  const [loadingListProperty, setLoadingListProperty] = useState<boolean>(true);
  const [loadingNewProperty, setLoadingNewProperty] = useState<boolean>(true);
  const [titleSurplusAndMissing, setTitleSurplusAndMissing] = useState<string>(
    'Execedente' || 'Restante',
  );
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const ref = useRef<ICustomFormButtonRef>(null);

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

  useFocusEffect(
    useCallback(() => {
      currentCollectItem({ DFIDITEMCOLETAAPP: Number(DFIDITEMCOLETAAPP) });
      distributionInformation({
        setLoading,
        setPropertyList,
        DFIDITEMCOLETAAPP: Number(DFIDITEMCOLETAAPP),
        setLoadingListProperty,
        setLoadingNewProperty,
        setProducersCollects,
        setStorage,
        setVolume,
        tankBond,
        setSurplus,
        setTitleSurplusAndMissing,
        storage,
        volume,
        DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
        DFQTDPREVISTA: Number(DFQTDPREVISTA),
        setProducers,
      });
    }, [storage, loadingNewProperty]),
  );

  useEffect(() => {
    informVolume({
      idCollectItem: DFIDITEMCOLETAAPP,
      setStorage,
      setVolume,
      tankCode: tankBond[0].DFIDTANQUE,
      setLoading,
    });
  }, [producers]);

  return (
    <Container>
      {loading || loadingListProperty ? (
        <CustomLoad text="Carregando dados" />
      ) : (
        <Content>
          <CustomScrollView>
            <Title>Distribuição</Title>
            <ContainerDistribution>
              <CustomStorageInformation
                icon={returnAppIcons({ icon: 'volume' })}
                title="Volume"
                titleValue={volume || '0'}
                isLine={true}
              />
              <CustomStorageInformation
                icon={returnAppIcons({ icon: 'storage' })}
                title="Armazenado"
                titleValue={storage || '0'}
                isLine={true}
              />
              <CustomStorageInformation
                icon={returnAppIcons({ icon: 'distribuition' })}
                title={titleSurplusAndMissing}
                titleValue={surplus}
                isLine={false}
              />
            </ContainerDistribution>
            <Title>Produtores</Title>
            {producers.map((producer, key) => {
              return (
                <CustomProducer
                  {...{
                    producer,
                    key,
                    DFIDITEMCOLETAAPP,
                    navigation,
                    route,
                    idCollect: DFIDCOLETAAPP,
                    idCollectCloud: DFIDCOLETA,
                    storageVolume: volume,
                  }}
                />
              );
            })}
          </CustomScrollView>
          <CustomAddProperty
            closeAndOpenLineModal={() =>
              handleCloseAndOpenPropertyModal({
                isOpen: isOpenModalProperty,
                setIsOpen: setIsOpenModalProperty,
              })
            }
            isOpenModalProperty={isOpenModalProperty}
            propertyList={propertyList}
            setLoadingNewProperty={setLoadingNewProperty}
            loadingListProperty={loadingListProperty}
          />
          <CustomFormButton
            onPress={() =>
              validDistribution({
                volume,
                storage,
                isOpen,
                setIsOpen,
                setModalType,
                navigator: {
                  navigation,
                  route,
                },
                collectItemTankOptions: collectItem,
                dataEndTankCollect,
                dataEndTankCollectObject,
                producersCollects,
                idCollect: DFIDCOLETAAPP,
                DFIDITEMCOLETAAPP: Number(DFIDITEMCOLETAAPP),
                idCollectItemCloud: DFIDITEMCOLETA,
                setLoadingButton,
                ref: ref.current,
              })
            }
            title="Informar"
            selectColor="primary"
            loading={loadingButton}
            ref={ref}
          />
        </Content>
      )}
      <ValidModal
        {...{
          isOpen,
          modalType,
          messages: distributionMessages,
          openModal: () => openModal({ isOpen, setIsOpen }),
          setLoading,
          handleNavigate: () => navigation.navigate('TankOptions'),
        }}
      />
    </Container>
  );
};
