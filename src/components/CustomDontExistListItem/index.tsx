import { darken } from 'polished';

import Alert from '../../assets/Alert.svg';
import themes from '../../themes';
import {
  CustomContainerDontExistItem,
  CustomDontExistItemText,
} from './styles';

interface ICustomDontExistListItem {
  text: string;
}

export const CustomDontExistListItem = ({ text }: ICustomDontExistListItem) => {
  return (
    <CustomContainerDontExistItem>
      <Alert width={25} height={25} fill={darken(0.18, themes.COLORS.RED)} />
      <CustomDontExistItemText>{text}</CustomDontExistItemText>
    </CustomContainerDontExistItem>
  );
};
