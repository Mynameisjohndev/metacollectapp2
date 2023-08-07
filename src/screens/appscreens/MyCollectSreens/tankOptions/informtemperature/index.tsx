import { useEffect, useRef, useState } from 'react';

import { ICustomFormButtonRef } from '../../../../../components/Buttons/CustomFormButton';
import { CustomCalculator } from '../../../../../components/Calculator/CustomCalculator';
import { CustomLoad } from '../../../../../components/CustomLoad';
import { Container } from '../../../../../components/global';
import { ValidModal } from '../../../../../components/Modal/ValidModal';
import { useInfoCollect } from '../../../../../context/InfoCollectContext';
import { wagonerContext } from '../../../../../context/wagonerContext';
import { InformtemperatureProps } from '../../../../../routes/types/approutes/appscreen';
import { informtemperatureMessages } from '../../../../../utils/messages';
import {
  createdRegisterChecktTemperature,
  handleUpdateTemperatureCollectItem,
  openModal,
} from './services';

export const Informtemperature = ({
  navigation,
  route,
}: InformtemperatureProps) => {
  const { collectItem } = useInfoCollect();
  const {
    DFIDITEMCOLETAAPP,
    DFIDITEMCOLETA,
    DFIDCOLETAAPP,
    DFIDCOLETA,
    DFTEMPERATURA,
  } = collectItem && collectItem;
  const [temperature, setTemperature] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const { wagoner } = wagonerContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [temperatureLoading, setTemperatureLoading] = useState<boolean>(false);
  const ref = useRef<ICustomFormButtonRef>(null);

  useEffect(() => {
    createdRegisterChecktTemperature({
      idCollectItem: DFIDITEMCOLETAAPP,
      idCollect: DFIDCOLETAAPP,
      itemCollect: DFIDITEMCOLETA,
      idCarreteiro: wagoner.DFIDCARRETEIRO,
    });
  }, [DFIDITEMCOLETAAPP]);

  return (
    <Container>
      {loading ? (
        <CustomLoad text="Carregando dados" />
      ) : (
        <>
          <CustomCalculator
            data={{
              title: 'Temperatura',
              icon: 'C°',
              buttonTitle: 'Informar temperatura',
              state: temperature,
              secondState: DFTEMPERATURA,
              onChange: setTemperature,
              loading: temperatureLoading,
              ref,
              onPress: () =>
                handleUpdateTemperatureCollectItem({
                  idCollectItem: DFIDITEMCOLETAAPP,
                  isOpen,
                  setIsOpen,
                  setModalType,
                  temperature: temperature === '' ? DFTEMPERATURA : temperature,
                  idCollect: DFIDCOLETAAPP,
                  idWagoner: wagoner.DFIDCARRETEIRO,
                  navigation,
                  route,
                  idCollectCloud: DFIDCOLETA,
                  idCollectItemCloud: DFIDITEMCOLETA,
                  ref: ref.current,
                  setTemperatureLoading,
                }),
            }}
          />
          <ValidModal
            {...{
              isOpen,
              modalType,
              messages: informtemperatureMessages,
              openModal: () => openModal({ isOpen, setIsOpen }),
              setLoading,
              handleNavigate: () => navigation.navigate('TankOptions'),
            }}
          />
        </>
      )}
    </Container>
  );
};
