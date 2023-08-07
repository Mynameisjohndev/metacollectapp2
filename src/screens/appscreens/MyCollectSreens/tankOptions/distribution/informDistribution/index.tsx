import { useRef, useState } from 'react';

import { ICustomFormButtonRef } from '../../../../../../components/Buttons/CustomFormButton';
import { CustomCalculator } from '../../../../../../components/Calculator/CustomCalculator';
import { CustomLoad } from '../../../../../../components/CustomLoad';
import { Container } from '../../../../../../components/global';
import { ValidModal } from '../../../../../../components/Modal/ValidModal';
import { useInfoCollect } from '../../../../../../context/InfoCollectContext';
import { InformDistributionProps } from '../../../../../../routes/types/approutes/appscreen';
import { informDistributionMessages } from '../../../../../../utils/messages';
import { openModal } from '../services';
import { validInformDistribution } from './services';

export const InformDistribution = ({
  navigation,
  route,
}: InformDistributionProps) => {
  const { collectItem, producer } = useInfoCollect();
  const { DFIDPROPRIEDADE, storageVolume, volume } = producer;
  const { DFIDITEMCOLETAAPP } = collectItem && collectItem;
  const [newVolume, setNewVolume] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const [loading, setLoading] = useState<boolean>(false);
  const [distribuitionLoading, setDistribuitionLoading] =
    useState<boolean>(false);
  const ref = useRef<ICustomFormButtonRef>(null);

  return (
    <Container>
      {loading ? (
        <CustomLoad text="Carregando dados" />
      ) : (
        <>
          <CustomCalculator
            data={{
              onChange: setNewVolume,
              title: `Proprietario #${DFIDPROPRIEDADE}`,
              icon: 'L',
              buttonTitle: 'Informar  volume',
              state: newVolume,
              secondState: volume,
              ref,
              loading: distribuitionLoading,
              onPress: () =>
                validInformDistribution({
                  idCollectItem: String(DFIDITEMCOLETAAPP),
                  idProprietario: DFIDPROPRIEDADE,
                  volume: newVolume === '' ? volume : newVolume,
                  isOpen,
                  setIsOpen,
                  setModalType,
                  navigation,
                  route,
                  storageVolume,
                  setDistribuitionLoading,
                  ref: ref.current,
                }),
            }}
          />

          <ValidModal
            {...{
              isOpen,
              modalType,
              messages: informDistributionMessages,
              openModal: () => openModal({ isOpen, setIsOpen }),
              setLoading,
              handleNavigate: () => navigation.navigate('Distribution'),
            }}
          />
        </>
      )}
    </Container>
  );
};
