import { ActivityIndicator } from 'react-native';

import themes from '../../themes';
import { CustomLoadContainer, CustomLoadText } from './styles';

interface ICustomLoad {
  text: string;
}

const CustomLoad = ({ text }: ICustomLoad) => {
  return (
    <CustomLoadContainer>
      <ActivityIndicator size="large" color={themes.COLORS.GREY} />
      <CustomLoadText>{text}</CustomLoadText>
    </CustomLoadContainer>
  );
};

export { CustomLoad };
