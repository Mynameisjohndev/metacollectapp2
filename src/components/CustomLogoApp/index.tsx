import Logo from '../../assets/logo3.png';
import { AlignLogoApp, LogoApp } from './styles';

export const CustomLogoApp = () => {
  return (
    <AlignLogoApp>
      <LogoApp source={Logo} resizeMode="center" />
    </AlignLogoApp>
  );
};
