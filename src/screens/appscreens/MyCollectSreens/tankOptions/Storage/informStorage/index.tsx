import { useEffect, useState } from 'react';

import { CustomCalculator } from '../../../../../../components/Calculator/CustomCalculator';
import { CustomLoad } from '../../../../../../components/CustomLoad';
import { Container } from '../../../../../../components/global';
import { ValidModal } from '../../../../../../components/Modal/ValidModal';
import { useInfoCollect } from '../../../../../../context/InfoCollectContext';
import { InformStorageProps } from '../../../../../../routes/types/approutes/appscreen';
import { mouthVolumeMessage } from '../../../../../../utils/messages';
import {
  searchBocaArmazenada,
  openModal,
  returnScreenStoredMouth,
  validCapacity,
} from './services';

export const InformStorage = ({ navigation, route }: InformStorageProps) => {
  const { collectItem, idMouth } = useInfoCollect();
  const { DFIDITEMCOLETAAPP, DFIDCOLETAAPP } = collectItem && collectItem;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const [loading, setLoading] = useState<boolean>(false);
  const [volume, setVolume] = useState<string>('');
  const [volumeState, setVolumeState] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    searchBocaArmazenada({ dfboca: idMouth, idCollectItem: DFIDITEMCOLETAAPP });
    returnScreenStoredMouth({
      idCollectItem: DFIDITEMCOLETAAPP,
      setLoading,
      setStoredMouth: setVolume,
      dfboca: idMouth,
    });
  }, []);

  return (
    <Container>
      {loading ? (
        <CustomLoad text="Carregando dados" />
      ) : (
        <>
          <CustomCalculator
            data={{
              title: `Volume da boca #${idMouth}`,
              icon: 'L',
              buttonTitle: 'Informar  volume',
              state: volumeState,
              secondState: volume,
              onChange: setVolumeState,
              onPress: () =>
                validCapacity({
                  dfboca: idMouth,
                  idCollectItem: DFIDITEMCOLETAAPP,
                  volume: volumeState === '' ? volume : volumeState,
                  isOpen,
                  setIsOpen,
                  setModalType,
                  DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
                  navigation,
                  route,
                }),
            }}
          />
          <ValidModal
            {...{
              isOpen,
              modalType,
              messages: mouthVolumeMessage,
              openModal: () => openModal({ isOpen, setIsOpen }),
              setLoading,
              handleNavigate: () => navigation.replace('Storage'),
            }}
          />
        </>
      )}
    </Container>
  );
};
