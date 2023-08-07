import { Container, Title } from '../../global';
import { CustomFormInputFixo } from '../../Input/CustomFormInputFixo';
import {
  CustomContainerInformationCollectItem,
  CustomContentInformationCollectItem,
} from '../styles';

interface ICustomSimpleField {
  title: string;
  label: string;
  value: string;
}
export const CustomSimpleField = ({
  value,
  title,
  label,
}: ICustomSimpleField) => {
  return (
    <>
      {value.length === 0 ? (
        <></>
      ) : (
        <CustomContainerInformationCollectItem>
          <CustomContentInformationCollectItem>
            <Title>{title}</Title>
            <CustomFormInputFixo {...{ label, value }} />
          </CustomContentInformationCollectItem>
        </CustomContainerInformationCollectItem>
      )}
    </>
  );
};
