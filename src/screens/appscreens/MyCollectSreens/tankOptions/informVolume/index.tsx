import { useRef, useState } from 'react';

import { ICustomFormButtonRef } from '../../../../../components/Buttons/CustomFormButton';
import { CustomCalculator } from '../../../../../components/Calculator/CustomCalculator';
import { CustomLoad } from '../../../../../components/CustomLoad';
import { Container } from '../../../../../components/global';
import { ValidModal } from '../../../../../components/Modal/ValidModal';
import { useInfoCollect } from '../../../../../context/InfoCollectContext';
import { wagonerContext } from '../../../../../context/wagonerContext';
import { InformVolumeProps } from '../../../../../routes/types/approutes/appscreen';
import { informaVolumeMessage } from '../../../../../utils/messages';
import { handleUpdateVolumeCollectItem, openModal } from './services';

export const InformVolume = ({ navigation, route }: InformVolumeProps) => {
  const { collectItem, setCollectItem } = useInfoCollect();
  const {
    DFIDITEMCOLETAAPP,
    DFIDITEMCOLETA,
    DFIDCOLETAAPP,
    DFIDCOLETA,
    DFQTDPREVISTA,
  } = collectItem && collectItem;
  const [volume, setVolume] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const [loading, setLoading] = useState<boolean>(false);
  const { wagoner } = wagonerContext();
  const [volumeLoading, setVolumeLoading] = useState<boolean>(false);
  const ref = useRef<ICustomFormButtonRef>(null);

  return (
    <Container>
      {loading ? (
        <CustomLoad text="Carregando dados" />
      ) : (
        <>
          <CustomCalculator
            data={{
              title: 'Volume',
              icon: 'L',
              buttonTitle: 'Informar  volume',
              state: volume,
              secondState: DFQTDPREVISTA,
              onChange: setVolume,
              ref,
              loading: volumeLoading,
              onPress: () =>
                handleUpdateVolumeCollectItem({
                  idCollectItem: DFIDITEMCOLETAAPP,
                  isOpen,
                  setIsOpen,
                  setModalType,
                  volume: volume === '' ? DFQTDPREVISTA : volume,
                  idCollect: DFIDCOLETAAPP,
                  idWagoner: wagoner.DFIDCARRETEIRO,
                  idCollectCloud: DFIDCOLETA,
                  navigation,
                  route,
                  setCollectItem,
                  collectItem,
                  idCollectItemCloud: DFIDITEMCOLETA,
                  ref: ref.current,
                  setVolumeLoading,
                }),
            }}
          />
          <ValidModal
            {...{
              isOpen,
              modalType,
              messages: informaVolumeMessage,
              openModal: () => openModal({ isOpen, setIsOpen }),
              setLoading,
              handleNavigate: () => navigation.replace('TankOptions'),
            }}
          />
        </>
      )}
    </Container>
  );
};
