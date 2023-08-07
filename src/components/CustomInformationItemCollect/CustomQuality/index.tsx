import ImageIcon from '../../../assets/image.svg';
import { RegistryItem } from '../../../types/registryItem';
import { CustomEmptyImageReturn } from '../../CustomEmptyImageReturn';
import { CustomImageReturn } from '../../CustomImageReturn';
import { Title } from '../../global';
import { CustomFormInputFixo } from '../../Input/CustomFormInputFixo';
import {
  CustomContainerInformationCollectItem,
  CustomContentInformationCollectItem,
} from '../styles';

interface ICustomItemCollectQuality {
  imagesQuality: RegistryItem[];
  imagesTemperature: RegistryItem[];
  alizarolPassed: string;
  sensory: string;
  alizarolType: string;
  sample: string;
  seal: string;
}
export const CustomItemCollectQuality = ({
  imagesQuality,
  imagesTemperature,
  alizarolPassed,
  sensory,
  alizarolType,
  sample,
  seal,
}: ICustomItemCollectQuality) => {
  if (alizarolPassed || sensory || alizarolType || sample || seal) {
    return (
      <CustomContainerInformationCollectItem>
        <CustomContentInformationCollectItem>
          <Title>Informações da qualidade</Title>
          {sensory && (
            <CustomFormInputFixo label="Exame sensorial" value={sensory} />
          )}
          {alizarolType && (
            <CustomFormInputFixo
              label="Tipo de alizarol"
              value={alizarolType}
            />
          )}
          {alizarolPassed && (
            <CustomFormInputFixo
              label="Passou no alizarol"
              value={alizarolPassed}
            />
          )}
          {sample && <CustomFormInputFixo label="Amostra" value={sample} />}
          {seal && <CustomFormInputFixo label="Lacre" value={seal} />}
          {imagesTemperature.length > 0 && (
            <CustomImageReturn
              label="Fotos da temperatura"
              images={imagesTemperature}
            />
          )}
          {imagesQuality.length > 0 && (
            <CustomImageReturn
              label="Fotos da amostra"
              images={imagesQuality}
            />
          )}
        </CustomContentInformationCollectItem>
      </CustomContainerInformationCollectItem>
    );
  }
  return null;
};
