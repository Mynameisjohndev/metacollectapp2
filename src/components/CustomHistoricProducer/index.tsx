import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import IdCard from '../../assets/idCard.svg';
import StorageIcon from '../../assets/storage.svg';
import { getDBConnection } from '../../databases/conection';
import { returnTbProdutorColeta } from '../../databases/TBPRODUTORCOLETA/SELECT/returnTbProdutorColeta';
import themes from '../../themes';
import { ProducerData } from '../../types/producerData';
import { returnAppIcons } from '../../utils/returnAppIcons';
import {
  CustomHistoricProducerContainer,
  CustomHistoricProducerText,
  CustomHistoricProducerTitle,
  CustomHistoricProducerRow,
  CustomHistoricProducerContent,
} from './styles';

interface ICustomHistoricProducer {
  producer?: ProducerData;
  DFIDITEMCOLETAAPP: string | number;
}

export const CustomHistoricProducer = ({
  producer,
  DFIDITEMCOLETAAPP,
}: ICustomHistoricProducer) => {
  const [loading, setLoading] = useState(true);
  const [volume, setVolume] = useState<string>('');
  const { DFIDPROPRIEDADE, DFNOMEPRODUTOR, DFMATRICULA } = producer;

  const executeGetProdutorColeta = async () => {
    const db = await getDBConnection();
    returnTbProdutorColeta({ db, DFIDITEMCOLETAAPP, DFIDPROPRIEDADE })
      .then(res => {
        setVolume(String(res[0].DFQTDENTRADA));
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  useEffect(() => {
    executeGetProdutorColeta();
  }, []);

  return (
    <CustomHistoricProducerContainer>
      {loading ? (
        <ActivityIndicator size="large" color={themes.COLORS.GREY} />
      ) : (
        <>
          <CustomHistoricProducerTitle>
            {DFNOMEPRODUTOR}
          </CustomHistoricProducerTitle>
          <CustomHistoricProducerRow>
            <CustomHistoricProducerContent>
              <IdCard width={18} height={18} />
              <CustomHistoricProducerText>
                {DFMATRICULA}
              </CustomHistoricProducerText>
            </CustomHistoricProducerContent>
            <CustomHistoricProducerContent>
              {returnAppIcons({ icon: 'storage', color: '#000', size: 18 })}
              <CustomHistoricProducerText>
                {volume || '0'}L
              </CustomHistoricProducerText>
            </CustomHistoricProducerContent>
          </CustomHistoricProducerRow>
        </>
      )}
    </CustomHistoricProducerContainer>
  );
};
