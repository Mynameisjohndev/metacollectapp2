import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Qrcode from '../../../../assets/qrcode-scan.svg';
import CustomFormButton, {
  ICustomFormButtonRef,
} from '../../../../components/Buttons/CustomFormButton';
import { CustomCollectInformation } from '../../../../components/CustomCollectInformation';
import { CustomLoad } from '../../../../components/CustomLoad';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../../components/global';
import { CustomReadQrcode } from '../../../../components/Modal/CustomReadQrcode';
import { EndCollectModal } from '../../../../components/Modal/EndCollect';
import { ValidModal } from '../../../../components/Modal/ValidModal';
import { wagonerContext } from '../../../../context/wagonerContext';
import { getDBConnection } from '../../../../databases/conection';
import { selectTbLinhaMyCollect } from '../../../../databases/TBLINHA/SELECT/selectTbLinhaMyCollect';
import { selectTbRegionalMyCollect } from '../../../../databases/TBREGIONAL/SELECT/selectTbRegionalMyCollect';
import { searchTbRegistroApi } from '../../../../databases/TBREGISTRO/SELECT/searchTbRegistroApi';
import { selectTbVeiculoMyCollect } from '../../../../databases/TBVEICULO/SELECT/selectTbVeiculoMyCollect';
import { MyCollectProps } from '../../../../routes/types/approutes/appscreen';
import { validReceiveCurrentGpsLocationCoords } from '../../../../services/GPS/validReceiveCurrentGpsLocationCoords';
import { Line } from '../../../../types/line';
import { Region } from '../../../../types/region';
import { Tank } from '../../../../types/tank';
import { Vehicle } from '../../../../types/vehicle';
import { validFinalizeAllCollectsMessages } from '../../../../utils/messages';
import { returnAppIcons } from '../../../../utils/returnAppIcons';
import {
  executeSearchReadQrcodeTankExistsInYourCollect,
  getQuantityTankAndStoredMilk,
  handleFinalizeAndUpdateCollect,
  handleStartCollect,
  openModal,
  validExistenceOfUncollectedTanks,
} from './services';

export const MyCollect = ({ navigation, route }: MyCollectProps) => {
  const { collect } = route.params;
  const { DFIDCOLETAAPP, DFIDCOLETA, DFIDLINHA, DFIDREGIONAL, DFIDVEICULO } =
    collect[0];
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [qrcodeIsOpen, setQrcodeIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const [region, setRegion] = useState<Region>();
  const [line, setLine] = useState<Line>();
  const [loading, setLoading] = useState<boolean>(false);
  const [endCollectLoading, setEndCollectLoading] = useState<boolean>(false);
  const [collectLoading, setCollectLoading] = useState<boolean>(false);
  const [
    looadingGetQuantityTankAndStoredMilk,
    setLoadingGetQuantityTankAndStoredMilk,
  ] = useState<boolean>(false);
  const [tankInfo, setTankInfo] = useState<string>('');
  const [label, setLabel] = useState<'Iniciar coleta' | 'Coleta em Andamento'>(
    'Iniciar coleta',
  );
  const [isOpenEndCollect, setIsOpenEndCollect] = useState<boolean>(false);
  const [readTank, setReadTank] = useState<Tank>();
  const [searchTank, setSearchTank] = useState<boolean>(false);
  const startButtonRef = useRef<ICustomFormButtonRef>(null);
  const endButtonRef = useRef<ICustomFormButtonRef>(null);
  const qrcodeButtonRef = useRef<ICustomFormButtonRef>(null);

  const openAndCloseQrcode = () => {
    setQrcodeIsOpen(!qrcodeIsOpen);
  };

  const { wagoner } = wagonerContext();

  const loandCollectInformation = async () => {
    setLoading(true);
    const db = await getDBConnection();
    selectTbVeiculoMyCollect({
      db,
      DFIDVEICULO: Number(DFIDVEICULO),
    }).then((res: Vehicle[]) => {
      setVehicle(res[0]);
      selectTbRegionalMyCollect({
        db,
        DFIDREGIONAL: Number(DFIDREGIONAL),
      }).then((res: Region[]) => {
        setRegion(res[0]);
        selectTbLinhaMyCollect({
          db,
          DFIDLINHA,
        }).then((res: Line[]) => {
          setLine(res[0]);
          setLoading(false);
        });
      });
    });
  };

  const openAndCloseEndColletModal = () => {
    setIsOpenEndCollect(!isOpenEndCollect);
    setEndCollectLoading(false);
  };

  const handleFinalizeCollect = async (kmfinal: number) => {
    setEndCollectLoading(true);
    const geometry = await validReceiveCurrentGpsLocationCoords();
    handleFinalizeAndUpdateCollect({
      DFIDCARRETEIRO: wagoner.DFIDCARRETEIRO,
      DFIDCOLETAAPP,
      geometry,
      setEndCollectLoading,
      setIsOpenEndCollect,
      kmfinal,
    }).then(res => {
      if (res === true) {
        navigation.goBack();
      }
    });
  };

  const alterButtonLabel = async () => {
    const db = await getDBConnection();
    searchTbRegistroApi({ db, DFIDCOLETAAPP }).then(res => {
      const filter = res.filter(item => item.DFTIPOREGISTRO === 'A');
      if (filter.length !== 0) {
        setLabel('Coleta em Andamento');
        return false;
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      alterButtonLabel();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      getQuantityTankAndStoredMilk({
        DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
        setLoadingGetQuantityTankAndStoredMilk,
        setTankInfo,
      });
    }, []),
  );

  useEffect(() => {
    loandCollectInformation();
  }, []);

  const handleValidTanks = async () => {
    const db = await getDBConnection();
    const resultValid = await validExistenceOfUncollectedTanks({
      db,
      DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
    });
    if (resultValid) {
      setIsOpenEndCollect(false);
      setModalType(0);
      setIsOpen(true);
      return setEndCollectLoading(false);
    }
    setIsOpenEndCollect(true);
  };

  useEffect(() => {
    if (readTank) {
      executeSearchReadQrcodeTankExistsInYourCollect({
        navigateProps: {
          navigation,
          route,
        },
        readTank,
        setSearchTank,
        DFIDCOLETAAPP,
        setModalType,
        setIsOpen,
      });
    }
  }, [readTank]);

  return (
    <>
      <Container>
        {loading && looadingGetQuantityTankAndStoredMilk ? (
          <CustomLoad text="Carregando dados" />
        ) : (
          <>
            {searchTank ? (
              <CustomLoad text="Buscando tanque" />
            ) : (
              <>
                <Content>
                  <CustomScrollView>
                    <Title>Informações da coleta</Title>
                    <CustomCollectInformation
                      {...{
                        data: {
                          name: wagoner?.DFNOMECARRETEIRO,
                          iconUser: returnAppIcons({ icon: 'wagoner' }),
                          vehicle: vehicle?.DFDESCVEICULO,
                          regional: region?.DFDESCREGIONAL,
                          line: line?.DFNOMELINHA,
                          tankInfo,
                        },
                      }}
                    />
                    <CustomFormButton
                      selectColor="secondary"
                      title={label}
                      onPress={() =>
                        handleStartCollect({
                          DFIDCARRETEIRO: Number(wagoner.DFIDCARRETEIRO),
                          DFIDCOLETA,
                          DFIDCOLETAAPP,
                          navigateProps: { navigation, route },
                          setCollectLoading,
                          ref: startButtonRef.current,
                        })
                      }
                      loading={collectLoading}
                      ref={startButtonRef}
                    />
                    <CustomFormButton
                      selectColor="primary"
                      title="Encerrar coleta"
                      onPress={handleValidTanks}
                      loading={endCollectLoading}
                      ref={endButtonRef}
                    />
                    <CustomFormButton
                      selectColor="primary"
                      title="Ler Qrcode"
                      onPress={openAndCloseQrcode}
                      ref={qrcodeButtonRef}
                      children={<Qrcode width={25} height={25} fill="white" />}
                    />
                  </CustomScrollView>
                </Content>
                <ValidModal
                  {...{
                    isOpen,
                    modalType,
                    messages: validFinalizeAllCollectsMessages,
                    openModal: () => openModal({ isOpen, setIsOpen }),
                    setLoading,
                    handleNavigate: () => navigation.navigate('TankOptions'),
                  }}
                />
                {isOpenEndCollect && (
                  <EndCollectModal
                    {...{
                      hasCloseButton: true,
                      onRequestClose: () => openAndCloseEndColletModal(),
                      animationType: 'fade',
                      executeUpdateCollect: handleFinalizeCollect,
                    }}
                  />
                )}
                <CustomReadQrcode
                  {...{
                    visible: qrcodeIsOpen,
                    setQrcodeIsOpen,
                    setReadTank,
                  }}
                />
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};
