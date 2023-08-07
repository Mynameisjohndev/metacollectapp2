import { useEffect, useRef, useState } from 'react';

import { ICustomFormButtonRef } from '../../../../../components/Buttons/CustomFormButton';
import { CustomCalculator } from '../../../../../components/Calculator/CustomCalculator';
import { CustomLoad } from '../../../../../components/CustomLoad';
import { Container } from '../../../../../components/global';
import { ValidModal } from '../../../../../components/Modal/ValidModal';
import { useInfoCollect } from '../../../../../context/InfoCollectContext';
import { wagonerContext } from '../../../../../context/wagonerContext';
import { InformSecondRulerProps } from '../../../../../routes/types/approutes/appscreen';
import { informRulerMessages } from '../../../../../utils/messages';
import {
  createdRegisterChecktRuler,
  handleUpdateRulerCollectItem,
  openModal,
} from './services';

export const InformSecondRuler = ({
  navigation,
  route,
}: InformSecondRulerProps) => {
  const { collectItem } = useInfoCollect();
  const {
    DFIDITEMCOLETAAPP,
    DFIDITEMCOLETA,
    DFIDCOLETAAPP,
    DFREGUAATRAS,
    DFIDCOLETA,
  } = collectItem && collectItem;
  const [ruler, setRuler] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const { wagoner } = wagonerContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [rulerLoading, setRulerLoading] = useState<boolean>(false);
  const ref = useRef<ICustomFormButtonRef>(null);

  useEffect(() => {
    createdRegisterChecktRuler({
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
              title: 'Régua',
              icon: 'Cm',
              buttonTitle: 'Informar a régua',
              state: ruler,
              secondState: DFREGUAATRAS,
              onChange: setRuler,
              loading: rulerLoading,
              ref,
              onPress: () =>
                handleUpdateRulerCollectItem({
                  idCollectItem: DFIDITEMCOLETAAPP,
                  isOpen,
                  setIsOpen,
                  setModalType,
                  ruler: ruler === '' ? DFREGUAATRAS : ruler,
                  idCollect: DFIDCOLETAAPP,
                  idWagoner: wagoner.DFIDCARRETEIRO,
                  navigation,
                  route,
                  idCollectCloud: DFIDCOLETA,
                  idCollectItemCloud: DFIDITEMCOLETA,
                  ref: ref.current,
                  setRulerLoading,
                }),
            }}
          />
          <ValidModal
            {...{
              isOpen,
              modalType,
              messages: informRulerMessages,
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
