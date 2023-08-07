import { TextInputProps } from 'react-native';

import { ContainerInput, CustonTextInput } from './styles';
import { returnIconCustomFormInput } from './utils';

interface ICustomDataInputProps extends TextInputProps {
  type?: 'USERS' | 'SECRET' | 'TOKEN';
}

export const CustomFormInput = ({ type, ...rest }: ICustomDataInputProps) => (
  <ContainerInput>
    {returnIconCustomFormInput(type)}
    <CustonTextInput {...rest} />
  </ContainerInput>
);
