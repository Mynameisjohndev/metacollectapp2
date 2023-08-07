import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';

import CustomFormButton from '../../../../../components/Buttons/CustomFormButton';
import { CustomLoad } from '../../../../../components/CustomLoad';
import { CustomStorageInformation } from '../../../../../components/CustomStorageInformation';
import { CustomVehicleMouth } from '../../../../../components/CustomVehicleMouth';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../../../components/global';
import { ValidModal } from '../../../../../components/Modal/ValidModal';
import { useInfoCollect } from '../../../../../context/InfoCollectContext';
import { useWagonerSettingsContext } from '../../../../../context/wagonerSettingsContext';
import { StorageProps } from '../../../../../routes/types/approutes/appscreen';
import { VehicleMouthData } from '../../../../../types/vehicleMouthData';
import { validStorageMessages } from '../../../../../utils/messages';
import { returnAppIcons } from '../../../../../utils/returnAppIcons';
import {
  handleNavigateInformStorage,
  informationMouth,
  informVolume,
  openModal,
  storageUpdate,
  surplusStorage,
  validStorage,
} from './services';
import { ContainerStorage, SubTitle } from './styles';

export const Storage = ({ navigation, route }: StorageProps) => {
  const { hasDischarge } = useWagonerSettingsContext();
  const { collectItem, tankBond, setIdMouth } = useInfoCollect();
  const { DFIDITEMCOLETAAPP, DFIDCOLETAAPP } = collectItem && collectItem;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const [loading, setLoading] = useState<boolean>(false);
  const [volume, setVolume] = useState<string>('');
  const [storage, setStorage] = useState<string>('');
  const [vehicleTank, setVehicleTank] = useState<VehicleMouthData[]>([]);
  const [surplus, setSurplus] = useState<string>('');
  const [titleSurplusAndMissing, setTitleSurplusAndMissing] = useState<string>(
    'Execedente' || 'Restante',
  );
  const [collectLoading, setCollectLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      storageUpdate({ idCollectItem: DFIDITEMCOLETAAPP, setLoading });
      informationMouth({
        setVehicleTank,
        setLoading,
        idCollect: DFIDCOLETAAPP,
      });
      informVolume({
        idCollectItem: DFIDITEMCOLETAAPP,
        tankCode: tankBond[0].DFIDTANQUE,
        setVolume,
        setStorage,
        setLoading,
      });
    }, [DFIDITEMCOLETAAPP]),
  );

  useEffect(() => {
    surplusStorage({
      setSurplus,
      storage: Number(storage),
      volume: Number(volume),
      setTitleSurplusAndMissing,
    });
  }, [storage]);

  return (
    <Container>
      {loading ? (
        <CustomLoad text="Carregando dados" />
      ) : (
        <Content>
          <CustomScrollView>
            <Title>Informações do armazenamento</Title>
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
                titleValue={storage || '0'}
                isLine={true}
              />
              <CustomStorageInformation
                icon={returnAppIcons({ icon: 'distribuition' })}
                title={titleSurplusAndMissing}
                titleValue={surplus}
                isLine={false}
              />
            </ContainerStorage>
            <SubTitle>Boca do veículo</SubTitle>
            {vehicleTank.map(vehicle => {
              const { DFCAPACIDADE, DFBOCA } = vehicle;
              return (
                <CustomVehicleMouth
                  key={DFBOCA}
                  capacity={DFCAPACIDADE}
                  id={DFBOCA}
                  DFBOCA={DFBOCA}
                  idCollect={DFIDCOLETAAPP}
                  volume={volume || '0'}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  setModalType={setModalType}
                  informStorage={() =>
                    handleNavigateInformStorage({
                      DFBOCA: String(DFBOCA),
                      setIdMouth,
                      setNavigation: () => navigation.navigate('InformStorage'),
                    })
                  }
                />
              );
            })}
          </CustomScrollView>
          <CustomFormButton
            onPress={() =>
              validStorage({
                volume,
                storage,
                isOpen,
                setIsOpen,
                setModalType,
                navigation,
                route,
                hasDischarge,
                setCollectLoading,
              })
            }
            title="Informar"
            selectColor="primary"
            loading={collectLoading}
            enabled={!collectLoading}
          />
        </Content>
      )}
      <ValidModal
        {...{
          isOpen,
          modalType,
          messages: validStorageMessages,
          openModal: () => openModal({ isOpen, setIsOpen }),
          setLoading,
          handleNavigate: () => navigation.navigate('TankOptions'),
        }}
      />
    </Container>
  );
};
