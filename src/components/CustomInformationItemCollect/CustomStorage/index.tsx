import { SubTitle } from '../../../screens/appscreens/MyCollectSreens/tankOptions/distribution/styles';
import { ContainerStorage } from '../../../screens/appscreens/MyCollectSreens/tankOptions/Storage/styles';
import { VehicleMouthData } from '../../../types/vehicleMouthData';
import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomStorageInformation } from '../../CustomStorageInformation';
import { CustomVehicleMouth } from '../../CustomVehicleMouth';
import { Title } from '../../global';
import {
  CustomContainerInformationCollectItem,
  CustomContentInformationCollectItem,
} from '../styles';

interface ICustomStorage {
  volume: string;
  storage: string | number | null;
  idCollect: string | number;
  vehicleTank: VehicleMouthData[];
}

const CustomStorage = ({
  storage,
  volume,
  idCollect,
  vehicleTank,
}: ICustomStorage) => {
  return (
    <>
      {storage === null ? (
        <></>
      ) : (
        <CustomContainerInformationCollectItem>
          <CustomContentInformationCollectItem>
            <Title>Informações de armazenamento</Title>
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
                isLine={false}
              />
            </ContainerStorage>
            <SubTitle>Boca do veículo</SubTitle>
            {vehicleTank.map(vehicle => {
              const { DFCAPACIDADE, DFBOCA } = vehicle;
              return (
                <CustomVehicleMouth
                  key={DFBOCA}
                  capacity={DFCAPACIDADE || '0'}
                  id={DFBOCA}
                  DFBOCA={DFBOCA}
                  idCollect={idCollect}
                  hasButton={false}
                />
              );
            })}
          </CustomContentInformationCollectItem>
        </CustomContainerInformationCollectItem>
      )}
    </>
  );
};

export { CustomStorage };
