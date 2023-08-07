import { useEffect, useState } from 'react';

import IdCard from '../../assets/idCard.svg';
import { useInfoCollect } from '../../context/InfoCollectContext';
import { getDBConnection } from '../../databases/conection';
import { returnTbProdutorColeta } from '../../databases/TBPRODUTORCOLETA/SELECT/returnTbProdutorColeta';
import { DistributionProps } from '../../routes/types/approutes/appscreen';
import { ProducerData } from '../../types/producerData';
import { returnAppIcons } from '../../utils/returnAppIcons';
import { CustomListItemLoad } from '../CustomListItemLoad';
import { handleNavigateInformDistribution } from './services';
import {
  ContainerCustomProducer,
  CustomProducerText,
  CustomCustomProducerTitle,
  ContentCustomProducerRow,
  ContentCustomProducer,
  CustonButtonTitle,
  CustomProducerButton,
} from './styles';

interface ICustomProducer extends DistributionProps {
  producer?: ProducerData;
  DFIDITEMCOLETAAPP: string | number;
  idCollect: string | number;
  idCollectCloud: string;
  storageVolume: string;
}

export const CustomProducer = ({
  producer,
  DFIDITEMCOLETAAPP,
  navigation,
  route,
  storageVolume,
}: ICustomProducer) => {
  const { setProducer } = useInfoCollect();
  const [loading, setLoading] = useState(true);
  const [volume, setVolume] = useState<string>('');
  const { DFIDPROPRIEDADE, DFNOMEPRODUTOR, DFMATRICULA } = producer;

  const executeGetProdutorColeta = async () => {
    const db = await getDBConnection();
    returnTbProdutorColeta({ db, DFIDITEMCOLETAAPP, DFIDPROPRIEDADE })
      .then(res => {
        setVolume(String(res[0].DFQTDENTRADA || ''));
        setLoading(false);
      })
      .catch(_ => {
        setLoading(false);
      });
  };

  useEffect(() => {
    executeGetProdutorColeta();
  }, [volume]);

  return (
    <>
      {loading ? (
        <CustomListItemLoad />
      ) : (
        <ContainerCustomProducer>
          <CustomCustomProducerTitle>
            {DFNOMEPRODUTOR}
          </CustomCustomProducerTitle>
          <ContentCustomProducerRow>
            <ContentCustomProducer>
              <IdCard width={18} height={18} />
              <CustomProducerText>{DFMATRICULA}</CustomProducerText>
            </ContentCustomProducer>
            <ContentCustomProducer>
              {returnAppIcons({ icon: 'storage', color: '#000', size: 18 })}
              <CustomProducerText>{volume || '0'}L</CustomProducerText>
            </ContentCustomProducer>
          </ContentCustomProducerRow>
          <CustomProducerButton
            onPress={() =>
              handleNavigateInformDistribution({
                navigation,
                route,
                setProducer,
                producer: { DFIDPROPRIEDADE, storageVolume, volume },
              })
            }
          >
            <CustonButtonTitle>Distribuir</CustonButtonTitle>
          </CustomProducerButton>
        </ContainerCustomProducer>
      )}
    </>
  );
};
