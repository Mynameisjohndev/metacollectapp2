import { useEffect, useState, useRef } from 'react';

import ImageIcon from '../../../../../assets/image.svg';
import CustomFormButton, {
  ICustomFormButtonRef,
} from '../../../../../components/Buttons/CustomFormButton';
import { CustomSelectedImage } from '../../../../../components/CustomSelectedImage';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../../../components/global';
import { ValidModal } from '../../../../../components/Modal/ValidModal';
import { useInfoCollect } from '../../../../../context/InfoCollectContext';
import { wagonerContext } from '../../../../../context/wagonerContext';
import { ProblemReportProps } from '../../../../../routes/types/approutes/appscreen';
import { RegisterItem } from '../../../../../types/registerItem';
import { problemReportMessages } from '../../../../../utils/messages';
import {
  handleSelectImage,
  handleValidProblemReport,
  openModal,
  returnReport,
} from './services';
import { ConatinerProblemReport, CutomText, CutomTextInput } from './styles';

export const ProblemReport = ({ navigation, route }: ProblemReportProps) => {
  const { wagoner } = wagonerContext();
  const { collectItem } = useInfoCollect();
  const { DFIDCOLETAAPP, DFIDITEMCOLETAAPP, DFIDCOLETA, DFIDITEMCOLETA } =
    collectItem && collectItem;
  const [imagesProblemReport, setImagesProblemReport] = useState<
    RegisterItem[]
  >([]);
  const [valueResearch, setValueResearch] = useState<string>();
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<ICustomFormButtonRef>(null);

  const dataSelectImage = {
    imagesProblemReport,
    setImagesProblemReport,
  };

  useEffect(() => {
    returnReport({
      DFIDCOLETA: Number(DFIDCOLETA),
      DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
      DFIDITEMCOLETA: Number(DFIDITEMCOLETA),
      DFIDITEMCOLETAAPP: Number(DFIDITEMCOLETAAPP),
      setValueResearch,
      setImagesProblemReport,
    });
  }, []);

  return (
    <Container>
      <Content>
        <CustomScrollView>
          <Title>Relatar Problema</Title>
          <ConatinerProblemReport>
            <CutomText>Observação</CutomText>
            <CutomTextInput
              {...{
                placeholder: 'Pesquisar',
                onChangeText: setValueResearch,
                value: valueResearch,
                multiline: true,
              }}
            />
          </ConatinerProblemReport>
          <CustomSelectedImage
            selectedImage={() =>
              handleSelectImage({
                data: {
                  ...dataSelectImage,
                },
              })
            }
            label="Imagens do problema"
            images={imagesProblemReport}
            setImages={setImagesProblemReport}
            iconSelect={<ImageIcon />}
          />
          <CustomFormButton
            onPress={() =>
              handleValidProblemReport({
                idCollectItem: DFIDITEMCOLETAAPP,
                idCollect: DFIDCOLETAAPP,
                itemCollect: DFIDITEMCOLETA,
                idCarreteiro: wagoner.DFIDCARRETEIRO,
                valueResearch,
                imagesProblemReport,
                isOpen,
                setIsOpen,
                setModalType,
                navigation,
                route,
                setLoading,
                DFIDITEMCOLETA: Number(DFIDITEMCOLETA),
                ref: ref.current,
              })
            }
            title="Enviar problema"
            selectColor="primary"
            enabled={!loading}
            ref={ref}
          />
        </CustomScrollView>
      </Content>
      <ValidModal
        {...{
          isOpen,
          modalType,
          messages: problemReportMessages,
          openModal: () => openModal({ isOpen, setIsOpen }),
          setLoading,
          handleNavigate: () => navigation.goBack(),
        }}
      />
    </Container>
  );
};
