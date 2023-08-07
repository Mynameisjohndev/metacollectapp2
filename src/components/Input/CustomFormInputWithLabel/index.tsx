import { MaskInputProps } from 'react-native-mask-input';

import { ContainerInput, CustomLabel, CustonTextInput } from './styles';

export type ICustomDataInputProps = MaskInputProps;

interface ICustom extends ICustomDataInputProps {
  label: string;
}

export const CustomFormInputWithLabel = ({ label, ...rest }: ICustom) => (
  <>
    <CustomLabel>{label}</CustomLabel>
    <ContainerInput>
      <CustonTextInput {...rest} />
    </ContainerInput>
  </>
);
