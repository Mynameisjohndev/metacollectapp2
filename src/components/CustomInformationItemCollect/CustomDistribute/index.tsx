import { useEffect, useState } from 'react';

import { SubTitle } from '../../../screens/appscreens/MyCollectSreens/tankOptions/distribution/styles';
import { ContainerStorage } from '../../../screens/appscreens/MyCollectSreens/tankOptions/Storage/styles';
import { ProducerData } from '../../../types/producerData';
import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomHistoricProducer } from '../../CustomHistoricProducer';
import { CustomStorageInformation } from '../../CustomStorageInformation';
import { Title } from '../../global';
import {
  CustomContainerInformationCollectItem,
  CustomContentInformationCollectItem,
} from '../styles';

interface ICustomDistribute {
  volume: string;
  storage: string | number | null;
  DFIDCOLETAAPP: number;
  DFIDITEMCOLETAAPP: number;
  producers: ProducerData[];
}

const CustomDistribute = ({
  volume,
  storage,
  producers,
  DFIDITEMCOLETAAPP,
}: ICustomDistribute) => {
  const [surplus, setSurplus] = useState('');

  useEffect(() => {
    if (storage > volume) {
      const sum = Number(storage) - Number(volume);
      setSurplus(String(sum));
    } else {
      setSurplus('0');
    }
  }, []);

  return (
    <>
      {storage === null ? (
        <></>
      ) : (
        <CustomContainerInformationCollectItem>
          <CustomContentInformationCollectItem>
            <Title>Informações de distribuição</Title>
            <ContainerStorage>
              <CustomStorageInformation
                icon={returnAppIcons({ icon: 'volume' })}
                title="Volume"
                titleValue={volume || '0'}
                isLine={true}
              />
              <CustomStorageInformation
                icon={returnAppIcons({ icon: 'storage' })}
                title="Armazenado"
                titleValue={String(storage) || '0'}
                isLine={true}
              />
              <CustomStorageInformation
                icon={returnAppIcons({ icon: 'distribuition' })}
                title="Execedente"
                titleValue={surplus || '0'}
                isLine={false}
              />
            </ContainerStorage>
            <SubTitle>Produtores</SubTitle>
            {producers.map((producer, key) => {
              return (
                <CustomHistoricProducer
                  {...{
                    producer,
                    key,
                    DFIDITEMCOLETAAPP,
                  }}
                />
              );
            })}
          </CustomContentInformationCollectItem>
        </CustomContainerInformationCollectItem>
      )}
    </>
  );
};

export { CustomDistribute };
