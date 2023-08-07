import Alert from '../../assets/Alert.svg';
import Distribution from '../../assets/distribution.svg';
import Information from '../../assets/information.svg';
import Mileage from '../../assets/mileage.svg';
import Scale from '../../assets/scale.svg';
import Storage from '../../assets/storage.svg';
import Temperature from '../../assets/temperature.svg';
import { TankOptionsProps } from '../../routes/types/approutes/appscreen';
import themes from '../../themes';
import { ContainerCustomTankOption, TextCustomTankOption } from './styles';

export interface ICustomTankOption {
  title: string;
  icon: string;
  id: number;
  path: string;
}
interface IDataCustomTankOption extends TankOptionsProps {
  data: ICustomTankOption;
}

export const CustomTankOption = ({
  data,
  navigation,
  route,
}: IDataCustomTankOption) => {
  const { icon, id, title, path } = data;

  const handleNavigate = (route: string) => {
    switch (route) {
      case 'InformVolume':
        return navigation.navigate('InformVolume');
      case 'Informtemperature':
        return navigation.navigate('Informtemperature');
      case 'InformFIrstRuler':
        return navigation.navigate('InformFIrstRuler');
      case 'InformSecondRuler':
        return navigation.navigate('InformSecondRuler');
      case 'InformQuality':
        return navigation.navigate('InformQuality');
      case 'Storage':
        return navigation.navigate('Storage');
      case 'Distribution':
        return navigation.navigate('Distribution');
      case 'ProblemReport':
        return navigation.navigate('ProblemReport');
      default:
        return null;
    }
  };

  const returnIcon = (name: string) => {
    const config = { fill: themes.COLORS.SECONDARY, width: 35, height: 35 };
    switch (name) {
      case 'Distribution':
        return <Distribution {...config} />;
      case 'Information':
        return <Information {...config} />;
      case 'Mileage':
        return <Mileage {...config} />;
      case 'Scale':
        return <Scale {...config} />;
      case 'Temperature':
        return <Temperature {...config} />;
      case 'Storage':
        return <Storage {...config} />;
      case 'ProblemReport':
        return <Alert {...config} />;
      default:
        <></>;
    }
    return null;
  };

  return (
    <>
      <ContainerCustomTankOption onPress={() => handleNavigate(path)}>
        {returnIcon(icon)}
        <TextCustomTankOption>{title}</TextCustomTankOption>
      </ContainerCustomTankOption>
    </>
  );
};
