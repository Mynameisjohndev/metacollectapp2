import { returnAppIcons } from '../../utils/returnAppIcons';
import {
  CustomContainerDontExistItem,
  CustomDontExistItemText,
} from './styles';

interface ICustomDontExistItem {
  text: string;
}

export const CustomDontExistItem = ({ text }: ICustomDontExistItem) => {
  return (
    <CustomContainerDontExistItem>
      {returnAppIcons({ icon: 'sad', size: 40 })}
      <CustomDontExistItemText>{text}</CustomDontExistItemText>
    </CustomContainerDontExistItem>
  );
};
