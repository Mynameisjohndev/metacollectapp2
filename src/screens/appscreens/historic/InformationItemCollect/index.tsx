import { useEffect, useState, useLayoutEffect } from 'react';

import { CustomDontExistItem } from '../../../../components/CustomDontExistItem';
import { CustomDistribute } from '../../../../components/CustomInformationItemCollect/CustomDistribute';
import { CustomItemCollectQuality } from '../../../../components/CustomInformationItemCollect/CustomQuality';
import { CustomSimpleField } from '../../../../components/CustomInformationItemCollect/CustomSimpleField';
import { CustomStorage } from '../../../../components/CustomInformationItemCollect/CustomStorage';
import { CustomLoad } from '../../../../components/CustomLoad';
import { Container, CustomScrollView } from '../../../../components/global';
import { CustomScreenHeader } from '../../../../components/Header';
import { HistoricInformationItemCollectProps } from '../../../../routes/types/approutes/appscreen';
import { CollectItem } from '../../../../types/collectItem';
import { ProducerData } from '../../../../types/producerData';
import { RegistryItem } from '../../../../types/registryItem';
import { VehicleMouthData } from '../../../../types/vehicleMouthData';
import {
  executeGetCollectItemformation,
  executeGetProducerDistribuition,
  executeGetRegisterByCollectItem,
  executeGetTankVehicle,
} from './services';

export const InformationItemCollect = ({
  route,
  navigation,
}: HistoricInformationItemCollectProps) => {
  const { idCollectItem, DFIDCOLETAAPP, DFNOMEPROPRIEDADE } = route.params;
  const [collectItem, setCollectItem] = useState<CollectItem>({});

  const [imagesQuality, setImagesQuality] = useState<RegistryItem[]>([]);
  const [imagesTemperature, setImagesTemperature] = useState<RegistryItem[]>(
    [],
  );
  const [loadCollectItem, setloadCollectItem] = useState<boolean>(true);
  const [loadImages, setloadImages] = useState<boolean>(true);
  const [loadStorage, setLoadStorage] = useState<boolean>(true);
  const [loadDistribuition, setLoadDistribuition] = useState<boolean>(true);
  const [vehicleTank, setVehicleTank] = useState<VehicleMouthData[]>([]);
  const [producers, setProducers] = useState<ProducerData[]>([]);

  const {
    DFALIZAROL,
    DFTIPOALIZAROL,
    DFSENSORIAL,
    DFQTDPREVISTA,
    DFCOLETOUAMOSTRA,
    DFCOLETOULACRE,
    DFTEMPERATURA,
    DFREGUAATRAS,
    DFREGUAFRENTE,
    DFQTDCOLETADA,
  } = collectItem;

  useEffect(() => {
    if (idCollectItem) {
      executeGetCollectItemformation({
        idCollectItem,
        setCollectItem,
        setloadCollectItem,
      });
      executeGetRegisterByCollectItem({
        idCollectItem,
        setImagesQuality,
        setImagesTemperature,
        setloadImages,
      });
      executeGetTankVehicle({
        DFIDCOLETAAPP,
        setLoadStorage,
        setVehicleTank,
      });
      executeGetProducerDistribuition({
        DFIDCOLETAAPP,
        DFIDITEMCOLETAAPP: idCollectItem,
        setLoadDistribuition,
        setProducers,
      });
    }
  }, [idCollectItem]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <CustomScreenHeader
          {...{
            title: `Coleta #${DFIDCOLETAAPP} - ${DFNOMEPROPRIEDADE}`,
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <Container>
      {loadCollectItem === true ||
      loadImages === true ||
      loadStorage === true ||
      loadDistribuition === true ? (
        <CustomLoad text="Carregando dados" />
      ) : (
        <>
          {!DFALIZAROL &&
          !DFTIPOALIZAROL &&
          !DFCOLETOUAMOSTRA &&
          !DFCOLETOULACRE &&
          !DFSENSORIAL &&
          !DFQTDCOLETADA &&
          !DFQTDPREVISTA ? (
            <CustomDontExistItem text="Não existe informações" />
          ) : (
            <CustomScrollView>
              <CustomSimpleField
                {...{
                  value: `${DFQTDPREVISTA ? `${DFQTDPREVISTA} L` : ''}`,
                  title: 'Informação do volume',
                  label: 'Volume',
                }}
              />
              <CustomItemCollectQuality
                {...{
                  alizarolPassed: DFALIZAROL,
                  alizarolType: DFTIPOALIZAROL,
                  imagesQuality,
                  imagesTemperature,
                  sample: DFCOLETOUAMOSTRA,
                  seal: DFCOLETOULACRE,
                  sensory: DFSENSORIAL,
                }}
              />
              <CustomSimpleField
                {...{
                  value: `${DFTEMPERATURA ? `${DFTEMPERATURA} °C` : ''}`,
                  title: 'Informação da temperatura',
                  label: 'Temperatura',
                }}
              />
              <CustomSimpleField
                {...{
                  value: `${DFREGUAATRAS ? `${DFREGUAATRAS} cm` : ''}`,
                  title: 'Informação régua atrás',
                  label: 'Medida',
                }}
              />
              <CustomSimpleField
                {...{
                  value: `${DFREGUAFRENTE ? `${DFREGUAFRENTE} cm` : ''}`,
                  title: 'Informação régua frente',
                  label: 'Medida',
                }}
              />
              <CustomStorage
                {...{
                  volume: DFQTDPREVISTA || null,
                  storage: DFQTDCOLETADA || null,
                  idCollect: DFIDCOLETAAPP,
                  vehicleTank,
                }}
              />
              <CustomDistribute
                {...{
                  volume: DFQTDPREVISTA || null,
                  storage: DFQTDCOLETADA || null,
                  DFIDCOLETAAPP,
                  DFIDITEMCOLETAAPP: idCollectItem,
                  producers,
                }}
              />
            </CustomScrollView>
          )}
        </>
      )}
    </Container>
  );
};
