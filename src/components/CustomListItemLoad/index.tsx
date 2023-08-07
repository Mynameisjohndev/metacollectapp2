import { ActivityIndicator } from 'react-native';

import themes from '../../themes';
import { CustomListItemLoadContainer } from './styles';

const CustomListItemLoad = () => {
  return (
    <CustomListItemLoadContainer>
      <ActivityIndicator size="large" color={themes.COLORS.GREY} />
    </CustomListItemLoadContainer>
  );
};

export { CustomListItemLoad };
