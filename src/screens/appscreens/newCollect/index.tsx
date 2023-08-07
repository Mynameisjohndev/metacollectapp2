import React, { useRef, useEffect, useState } from 'react';

import CustomFormButton, {
  ICustomFormButtonRef,
} from '../../../components/Buttons/CustomFormButton';
import { CustomConectedWagoner } from '../../../components/CustomConectedWagoner';
import { CustomLoad } from '../../../components/CustomLoad';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../components/global';
import { CustomNewCollectInput } from '../../../components/Input/CustomNewCollectInput';
import { ValidNewCollect } from '../../../components/Modal/ValidNewCollect';
import { CustomSelectLineNewCollet } from '../../../components/Select/CustomSelectLineNewCollet';
import { CustomSelectRegionNewCollet } from '../../../components/Select/CustomSelectRegionNewCollet';
import { CustomSelectVehicleNewCollet } from '../../../components/Select/CustomSelectVehicleNewCollet';
import { wagonerContext } from '../../../context/wagonerContext';
import { NewCollectProps } from '../../../routes/types/approutes/appscreen';
import { Line } from '../../../types/line';
import { Region } from '../../../types/region';
import { Vehicle } from '../../../types/vehicle';
import { newCollectMessages } from '../../../utils/messages';
import { returnOfImeiPermission } from '../../../utils/readPhoneStatePermission';
import { returnAppIcons } from '../../../utils/returnAppIcons';
import {
  handleCloseAndOpenLineModal,
  handleCloseAndOpenRegionModal,
  handleCloseAndOpenVehicleModal,
  handleCreateNewCollect,
  loadList,
  loadListLine,
  openModal,
  validLine,
  validVehicle,
} from './services';
import { CutomNewCollectForm } from './styles';

export const NewCollect = ({ navigation }: NewCollectProps) => {
  const { wagoner } = wagonerContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  >();
  const [isOpenModalVehicle, setIsOpenModalVehicle] = useState<boolean>(false);
  const [isOpenModalRegion, setIsOpenModalRegion] = useState<boolean>(false);
  const [isOpenModalLine, setIsOpenModalLine] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();
  const [selectedRegion, setSelectedRegion] = useState<Region | undefined>();
  const [selectedLine, setSelectedLine] = useState<Line | undefined>();
  const [initialKm, setInitialKm] = useState('');
  const [loadingCreateCollect, setLoadingCreateCollect] =
    useState<boolean>(false);
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
  const [regionList, setRegionList] = useState<Region[]>([]);
  const [lineList, setLineList] = useState<Line[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [loadingListLine, setLoadingListLine] = useState<boolean>(false);
  const [validationLoading, setValidationLoading] = useState<boolean>(false);
  const [imei, setImei] = useState<string | boolean>();
  const ref = useRef<ICustomFormButtonRef>(null);

  const onReplaceCommaToPoint = (text: string) => {
    const word = text.replace(/[^0-9/]/g, '');
    setInitialKm(word);
  };

  useEffect(() => {
    returnOfImeiPermission().then(res => {
      setImei(res);
    });
    loadList({ setRegionList, setVehicleList });
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      loadListLine({
        setSelectedLine,
        selectedRegion: selectedRegion.DFIDREGIONAL,
        setLoadingListLine,
        setLineList,
        setSelectedRegion,
        setIsOpen,
        setModalType,
        setValidationLoading,
      });
    }
  }, [selectedRegion]);

  useEffect(() => {
    setLoadingList(true);
    if (
      regionList.length === 0 ||
      vehicleList.length === 0 ||
      lineList.length === 0
    ) {
      setLoadingList(false);
    } else {
      setLoadingList(true);
    }
  }, []);

  useEffect(() => {
    validVehicle({
      selectedVehicle,
      setIsOpen,
      setModalType,
      setSelectedVehicle,
      setValidationLoading,
    });
  }, [selectedVehicle]);

  useEffect(() => {
    validLine({
      selectedLine,
      setIsOpen,
      setModalType,
      setSelectedLine,
      selectedRegion,
      selectedVehicle,
      setValidationLoading,
    });
  }, [selectedLine]);

  return (
    <Container>
      {loadingList ? (
        <CustomLoad text="Carregando dados" />
      ) : (
        <Content>
          <CustomScrollView>
            <Title>Informações da coleta</Title>
            <CutomNewCollectForm>
              <CustomConectedWagoner
                iconUser={returnAppIcons({ icon: 'wagoner' })}
                name={wagoner.DFNOMECARRETEIRO}
              />
              <CustomNewCollectInput
                keyboardType="numeric"
                placeholder="Km inícial"
                value={initialKm}
                onChangeText={text => onReplaceCommaToPoint(text)}
              />
              <CustomSelectVehicleNewCollet
                closeAndOpenVehicleModal={() =>
                  handleCloseAndOpenVehicleModal({
                    isOpen: isOpenModalVehicle,
                    setIsOpen: setIsOpenModalVehicle,
                  })
                }
                selectedVehicle={selectedVehicle}
                vehicleList={vehicleList}
                setSelectedVehicle={setSelectedVehicle}
                isOpenModalVehicle={isOpenModalVehicle}
              />
              <CustomSelectRegionNewCollet
                closeAndOpenRegionModal={() =>
                  handleCloseAndOpenRegionModal({
                    isOpen: isOpenModalRegion,
                    setIsOpen: setIsOpenModalRegion,
                    setIsOpenModalLine,
                  })
                }
                isOpenModalRegion={isOpenModalRegion}
                regionList={regionList}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
              />
              <CustomSelectLineNewCollet
                closeAndOpenLineModal={() =>
                  handleCloseAndOpenLineModal({
                    isOpen: isOpenModalLine,
                    setIsOpen: setIsOpenModalLine,
                  })
                }
                isOpenModalLine={isOpenModalLine}
                lineList={lineList}
                setSelectedLine={setSelectedLine}
                selectedLine={selectedLine}
                selectedRegion={selectedRegion}
                loadingListLine={loadingListLine}
              />
            </CutomNewCollectForm>
            <CustomFormButton
              onPress={() => {
                handleCreateNewCollect({
                  initialKm: initialKm === '' ? '' : initialKm,
                  selectedVehicle,
                  selectedRegion,
                  selectedLine,
                  vehicle:
                    selectedVehicle === undefined
                      ? undefined
                      : selectedVehicle.DFIDVEICULO,
                  region:
                    selectedRegion === undefined
                      ? undefined
                      : selectedRegion.DFIDREGIONAL,
                  line:
                    selectedLine === undefined
                      ? undefined
                      : selectedLine.DFIDLINHA,
                  imei,
                  idCarreteiro: wagoner.DFIDCARRETEIRO,
                  setModalType,
                  setIsOpen,
                  buttonRef: ref.current,
                });
              }}
              ref={ref}
              title="Iniciar"
              selectColor="primary"
              loading={loadingCreateCollect}
            />
          </CustomScrollView>
        </Content>
      )}
      <ValidNewCollect
        {...{
          isOpen,
          modalType,
          messages: newCollectMessages,
          openModal: () => openModal({ isOpen, setIsOpen }),
          setLoading: setLoadingCreateCollect,
          handleNavigate: () => navigation.navigate('Home'),
        }}
      />
    </Container>
  );
};
