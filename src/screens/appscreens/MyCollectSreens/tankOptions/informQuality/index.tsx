import { useEffect, useRef, useState } from 'react';

import ImageIcon from '../../../../../assets/image.svg';
import CustomFormButton, {
  ICustomFormButtonRef,
} from '../../../../../components/Buttons/CustomFormButton';
import { CustomLoad } from '../../../../../components/CustomLoad';
import { CustomSelectedImage } from '../../../../../components/CustomSelectedImage';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../../../components/global';
import { CustomFormInputWithLabel } from '../../../../../components/Input/CustomFormInputWithLabel';
import { ValidQuality } from '../../../../../components/Modal/ValidQuality';
import { CustomSelectAlizarol } from '../../../../../components/Select/CustomSelectAlizarol';
import { CustomSelectQualitySample } from '../../../../../components/Select/CustomSelectQualitySample';
import { CustomSelectSensory } from '../../../../../components/Select/CustomSelectSensory';
import { CustomSelectTypeAlizarol } from '../../../../../components/Select/CustomSelectTypeAlizarol';
import { useInfoCollect } from '../../../../../context/InfoCollectContext';
import { wagonerContext } from '../../../../../context/wagonerContext';
import { useWagonerSettingsContext } from '../../../../../context/wagonerSettingsContext';
import { InformQualityProps } from '../../../../../routes/types/approutes/appscreen';
import { RegisterItem } from '../../../../../types/registerItem';
import { formQualityMessages } from '../../../../../utils/messages';
import {
  createdRegisterCheck,
  createdRegisterChecktTemperature,
  handleValidInformQuality,
  handleSelectImage,
  openModal,
  handleCloseAndOpenSensoryModal,
  handleCloseAndOpenTypeAlizarol,
  handleCloseAndOpenAlizarol,
  handleCloseAndOpenQualitySample,
  returnScreenQuality,
  returnScreenQualityImages,
  returnScreenTemperatureImages,
} from './services';

export const InformQuality = ({ route, navigation }: InformQualityProps) => {
  const { hasQuality } = useWagonerSettingsContext();
  const { collectItem } = useInfoCollect();
  const { DFIDITEMCOLETAAPP, DFIDITEMCOLETA, DFIDCOLETAAPP, DFIDCOLETA } =
    collectItem && collectItem;
  const { wagoner } = wagonerContext();
  const [selectedSensory, setSelectedSensory] = useState<
    'Caracteristico' | 'Não caracteristico' | undefined
  >();
  const [selectedTypeAlizarol, setSelectedTypeAlizarol] = useState<
    '72' | '74' | '76' | '80' | '82' | undefined
  >();
  const [selectedAlizarol, setSelectedAlizarol] = useState<
    'Sim' | 'Não' | undefined
  >();
  const [selectedQualitySample, setSelectedQualitySample] = useState<
    'Sim' | 'Não' | undefined
  >();
  const [isOpenModalSensory, setIsOpenModalSensory] = useState<boolean>(false);
  const [isOpenModalTypeAlizarol, setIsOpenModalTypeAlizarol] =
    useState<boolean>(false);
  const [isOpenModalAlizarol, setIsOpenModalAlizarol] =
    useState<boolean>(false);
  const [isOpenModalQualitySample, setIsOpenModalQualitySample] =
    useState<boolean>(false);
  const [sample, setSample] = useState<string>('');
  const [seal, setSeal] = useState<string>('');
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingImagesQuality, setLoadingImagesQuality] =
    useState<boolean>(true);
  const [loadingImagesTemperature, setLoadingImagesTemperature] =
    useState<boolean>(true);
  const [imagesQuality, setImagesQuality] = useState<RegisterItem[]>([]);
  const [imagesTemperature, setImagesTemperature] = useState<RegisterItem[]>(
    [],
  );
  const [insertIdRegister, setInsertIdRegister] = useState<
    string | boolean | number
  >();
  const [insertIdRegisterTemperature, setInsertIdRegisterTemperature] =
    useState<string | boolean | number>();
  const [collectLoading, setCollectLoading] = useState<boolean>(false);
  const ref = useRef<ICustomFormButtonRef>(null);

  const dataSelectImage = {
    imagesQuality,
    setImagesQuality,
    imagesTemperature,
    setImagesTemperature,
  };

  useEffect(() => {
    if (DFIDITEMCOLETAAPP) {
      createdRegisterCheck({
        idCollectItem: DFIDITEMCOLETAAPP,
        idCollect: DFIDCOLETAAPP,
        itemCollect: DFIDITEMCOLETA,
        idCarreteiro: wagoner.DFIDCARRETEIRO,
      }).then(res => {
        setInsertIdRegister(res);
      });
      createdRegisterChecktTemperature({
        idCollectItem: DFIDITEMCOLETAAPP,
        idCollect: DFIDCOLETAAPP,
        itemCollect: DFIDITEMCOLETA,
        idCarreteiro: wagoner.DFIDCARRETEIRO,
      }).then(res => {
        setInsertIdRegisterTemperature(res);
      });

      returnScreenQuality({
        idCollectItem: Number(DFIDITEMCOLETAAPP),
        setSelectedAlizarol,
        setSelectedTypeAlizarol,
        setSelectedSensory,
        setSelectedQualitySample,
        setSample,
        setSeal,
        setLoading,
      });
    }
    if (insertIdRegister) {
      returnScreenQualityImages({
        insertIdRegister,
        setImagesQuality,
        setLoadingImagesQuality,
      });
    }
    if (insertIdRegisterTemperature) {
      returnScreenTemperatureImages({
        insertIdRegisterTemperature,
        setImagesTemperature,
        setLoadingImagesTemperature,
      });
    }
  }, [DFIDITEMCOLETAAPP, insertIdRegister, insertIdRegisterTemperature]);

  const quality = {
    selectedAlizarol:
      selectedAlizarol === undefined ? undefined : selectedAlizarol,
    selectedTypeAlizarol:
      selectedTypeAlizarol === undefined ? undefined : selectedTypeAlizarol,
    selectedSensory:
      selectedSensory === undefined ? undefined : selectedSensory,
    selectedQualitySample:
      selectedQualitySample === undefined ? undefined : selectedQualitySample,
    sample,
    seal,
    idCollectItem: DFIDITEMCOLETAAPP,
    imagesQuality,
    imagesTemperature,
    insertIdRegister,
    insertIdRegisterTemperature,
    isOpen,
    setIsOpen,
    setModalType,
    idCollect: DFIDCOLETAAPP,
    idWagoner: wagoner.DFIDCARRETEIRO,
    navigation,
    route,
    idCollectCloud: DFIDCOLETA,
    hasQuality,
    idCollectItemCloud: DFIDITEMCOLETA,
    setCollectLoading,
    ref: ref.current,
  };

  return (
    <Container>
      <>
        {loading || loadingImagesQuality || loadingImagesTemperature ? (
          <CustomLoad text="Carregando dados" />
        ) : (
          <Content>
            <CustomScrollView>
              <Title>Qualidade</Title>
              <CustomSelectSensory
                closeAndOpenSensoryModal={() =>
                  handleCloseAndOpenSensoryModal({
                    isOpen: isOpenModalSensory,
                    setIsOpen: setIsOpenModalSensory,
                  })
                }
                selectedSensory={selectedSensory}
                setSelectedSensory={setSelectedSensory}
                isOpenModalSensory={isOpenModalSensory}
              />
              <CustomSelectTypeAlizarol
                closeAndOpenTypeAlizarolModal={() =>
                  handleCloseAndOpenTypeAlizarol({
                    isOpen: isOpenModalTypeAlizarol,
                    setIsOpen: setIsOpenModalTypeAlizarol,
                  })
                }
                selectedTypeAlizarol={selectedTypeAlizarol}
                setSelectedTypeAlizarol={setSelectedTypeAlizarol}
                isOpenModalTypeAlizarol={isOpenModalTypeAlizarol}
              />
              <CustomSelectAlizarol
                closeAndOpenAlizarolModal={() =>
                  handleCloseAndOpenAlizarol({
                    isOpen: isOpenModalAlizarol,
                    setIsOpen: setIsOpenModalAlizarol,
                  })
                }
                selectedAlizarol={selectedAlizarol}
                setSelectedAlizarol={setSelectedAlizarol}
                isOpenModalAlizarol={isOpenModalAlizarol}
              />
              <CustomSelectQualitySample
                closeAndOpenQualitySampleModal={() =>
                  handleCloseAndOpenQualitySample({
                    isOpen: isOpenModalQualitySample,
                    setIsOpen: setIsOpenModalQualitySample,
                  })
                }
                selectedQualitySample={selectedQualitySample}
                setSelectedQualitySample={setSelectedQualitySample}
                isOpenModalQualitySample={isOpenModalQualitySample}
              />
              <CustomSelectedImage
                selectedImage={() =>
                  handleSelectImage({
                    data: {
                      ...dataSelectImage,
                      type: 'quality',
                    },
                  })
                }
                label="Fotos da amostra"
                images={imagesQuality}
                setImages={setImagesQuality}
                iconSelect={<ImageIcon />}
              />
              <CustomSelectedImage
                selectedImage={() =>
                  handleSelectImage({
                    data: {
                      ...dataSelectImage,
                      type: 'temperature',
                    },
                  })
                }
                label="Fotos da temperatura"
                images={imagesTemperature}
                setImages={setImagesTemperature}
                iconSelect={<ImageIcon />}
              />

              <CustomFormInputWithLabel
                label="Amostra"
                keyboardType="default"
                placeholder="Informar a amostra"
                value={sample}
                onChangeText={setSample}
              />
              <CustomFormInputWithLabel
                label="Lacre"
                keyboardType="default"
                placeholder="Informar a lacre"
                value={seal}
                onChangeText={setSeal}
              />
            </CustomScrollView>
            <CustomFormButton
              onPress={() =>
                handleValidInformQuality({
                  selectedAlizarol:
                    selectedAlizarol === undefined
                      ? undefined
                      : selectedAlizarol,
                  selectedTypeAlizarol:
                    selectedTypeAlizarol === undefined
                      ? undefined
                      : selectedTypeAlizarol,
                  selectedSensory:
                    selectedSensory === undefined ? undefined : selectedSensory,
                  selectedQualitySample:
                    selectedQualitySample === undefined
                      ? undefined
                      : selectedQualitySample,
                  sample,
                  seal,
                  idCollectItem: DFIDITEMCOLETAAPP,
                  imagesQuality,
                  imagesTemperature,
                  insertIdRegister,
                  insertIdRegisterTemperature,
                  isOpen,
                  setIsOpen,
                  setModalType,
                  idCollect: DFIDCOLETAAPP,
                  idWagoner: wagoner.DFIDCARRETEIRO,
                  navigation,
                  route,
                  idCollectCloud: DFIDCOLETA,
                  hasQuality,
                  idCollectItemCloud: DFIDITEMCOLETA,
                  setCollectLoading,
                  ref: ref.current,
                })
              }
              title="Informar"
              selectColor="primary"
              loading={collectLoading}
              ref={ref}
            />
          </Content>
        )}
      </>
      <ValidQuality
        {...{
          isOpen,
          modalType,
          messages: formQualityMessages,
          openModal: () => openModal({ isOpen, setIsOpen }),
          setLoading,
          handleNavigate: () => navigation.navigate('TankOptions'),
        }}
      />
    </Container>
  );
};
