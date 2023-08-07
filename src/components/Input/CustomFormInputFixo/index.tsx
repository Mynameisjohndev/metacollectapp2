import { Container, ContainerInput, CustomLabel, CustonText } from './styles';

interface ICustomFormInputFixo {
  label: string;
  value: string;
}
export const CustomFormInputFixo = ({ label, value }: ICustomFormInputFixo) => {
  return (
    <Container>
      <CustomLabel>{label}</CustomLabel>
      <ContainerInput>
        <CustonText>{value}</CustonText>
      </ContainerInput>
    </Container>
  );
};
