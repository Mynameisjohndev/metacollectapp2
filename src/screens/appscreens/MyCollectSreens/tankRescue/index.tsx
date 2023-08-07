import { useEffect, useRef, useState } from 'react';

import CustomFormButton, {
  ICustomFormButtonRef,
} from '../../../../components/Buttons/CustomFormButton';
import { CustomConectedWagoner } from '../../../../components/CustomConectedWagoner';
import { CustomLoad } from '../../../../components/CustomLoad';
import { Container, Content, Title } from '../../../../components/global';
import { ValidTankRescure } from '../../../../components/Modal/ValidTankRescure';
import { CustomSelectTank } from '../../../../components/Select/CustomSelectTanks';
import { useInfoCollect } from '../../../../context/InfoCollectContext';
import { wagonerContext } from '../../../../context/wagonerContext';
import { TankRescueProps } from '../../../../routes/types/approutes/appscreen';
import { Tank } from '../../../../types/tank';
import { newTankRescure } from '../../../../utils/messages';
import { returnAppIcons } from '../../../../utils/returnAppIcons';
import {
  getReadTankInformation,
  handleCloseAndOpenTankModal,
  openModal,
  handleTankRescue,
  loadTanks,
} from './service';
import { CutomTankRecuseForm } from './styles';

export const TankRescue = ({ navigation, route }: TankRescueProps) => {
  const { wagoner } = wagonerContext();
  // const [isOpenModalRegion, setIsOpenModalRegion] = useState<boolean>(false);
  // const [isOpenModalLine, setIsOpenModalLine] = useState<boolean>(false);
  // const [regionList, setRegionList] = useState<Region[]>([]);
  // const [lineList, setLineList] = useState<Line[]>([]);
  // const [loadingListLine, setLoadingListLine] = useState<boolean>(false);
  // const [validationLoading, setValidationLoading] = useState<boolean>(false);
  // const [validSelectedRegion, setValidSelectedRegion] =
  //   useState<boolean>(false);
  // const [validSelectedLine, setValidSelectedLine] = useState<boolean>(false);
  // const [selectedRegion, setSelectedRegion] = useState<Region | undefined>();
  // const [selectedLine, setSelectedLine] = useState<Line | undefined>();
  const { collect } = useInfoCollect();
  const { DFIDCOLETAAPP } = collect[0];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  >();
  const [loadingListTank, setLoadingListTank] = useState<boolean>(false);
  const [isOpenModalTank, setIsOpenModalTank] = useState<boolean>(false);
  const [selectedTank, setSelectedTank] = useState<Tank | undefined>();
  const [loadingTankRescuse, setLoadingTankRescuse] = useState<boolean>(false);
  const [tankList, setTankList] = useState<Tank[]>([]);
  const createRescueButton = useRef<ICustomFormButtonRef>(null);
  const [loadingReadTank, setLoadingReadTank] = useState<boolean>(false);

  const { params } = route;

  // useEffect(() => {
  //   loadListRegional({ setRegionList });
  // }, []);

  // useEffect(() => {
  //   if (selectedRegion) {
  //     loadListLine({
  //       setSelectedLine,
  //       selectedRegion: selectedRegion.DFIDREGIONAL,
  //       setLoadingListLine,
  //       setSelectedTank,
  //       setLineList,
  //       setValidSelectedRegion,
  //       setSelectedRegion,
  //       setIsOpen,
  //       setModalType,
  //       setValidationLoading,
  //     });
  //   }
  // }, [selectedRegion]);

  // useEffect(() => {
  //   validLine({
  //     selectedLine,
  //     setIsOpen,
  //     setModalType,
  //     setSelectedLine,
  //     selectedRegion,
  //     setValidationLoading,
  //     setValidSelectedLine,
  //     setTankList,
  //   });
  // }, [selectedLine]);

  // useEffect(() => {
  //   if (isOpenModalTank && !selectedLine) {
  //     setIsOpenModalTank(false);
  //   }
  // }, [isOpenModalTank]);

  useEffect(() => {
    loadTanks({ setLoadingListTank, setTankList });
  }, []);

  useEffect(() => {
    if (params) {
      const { DFIDTANQUE } = params.First;
      getReadTankInformation({
        setSelectedTank,
        setLoadingReadTank,
        DFIDTANQUE,
      });
    }
  }, [params]);

  return (
    <Container>
      {loadingReadTank ? (
        <CustomLoad text="Buscando tanque..." />
      ) : (
        <>
          <Content>
            <Title>Informações do socorro</Title>
            <CutomTankRecuseForm>
              <CustomConectedWagoner
                iconUser={returnAppIcons({ icon: 'wagoner' })}
                name={wagoner.DFNOMECARRETEIRO}
              />
              {/* <CustomSelectRegionNewCollet
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
              /> */}
              <CustomSelectTank
                closeAndOpenLineModal={() =>
                  handleCloseAndOpenTankModal({
                    isOpen: isOpenModalTank,
                    setIsOpen: setIsOpenModalTank,
                  })
                }
                isOpenModalTank={isOpenModalTank}
                tankList={tankList}
                setSelectedTank={setSelectedTank}
                selectedTank={selectedTank}
                loadingListTank={loadingListTank}
              />
            </CutomTankRecuseForm>
            <CustomFormButton
              onPress={() =>
                handleTankRescue({
                  selectedTank,
                  isOpen,
                  setLoadingTankRescuse,
                  setIsOpen,
                  setSelectedTank,
                  setModalType,
                  DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
                  navigation,
                  route,
                  ref: createRescueButton.current,
                })
              }
              title="Iniciar"
              selectColor="primary"
              loading={loadingTankRescuse}
              ref={createRescueButton}
            />
          </Content>
          <ValidTankRescure
            {...{
              isOpen,
              modalType,
              messages: newTankRescure,
              openModal: () => openModal({ isOpen, setIsOpen }),
              setLoading: setLoadingTankRescuse,
              handleNavigate: () =>
                navigation.navigate('StartCollect', {
                  idCollect: DFIDCOLETAAPP,
                }),
            }}
          />
        </>
      )}
    </Container>
  );
};
