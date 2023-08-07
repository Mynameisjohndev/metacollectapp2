import { ContainerCustomScreenHeader } from './styles';

interface ICustomScreenHeader {
  title: string;
}

const CustomScreenHeader = ({ title }: ICustomScreenHeader) => {
  return <ContainerCustomScreenHeader>{title}</ContainerCustomScreenHeader>;
};

export { CustomScreenHeader };
