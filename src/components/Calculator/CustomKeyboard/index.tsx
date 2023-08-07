import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { SvgProps } from 'react-native-svg';

import {
  ContentKeyboardCustomCalculator,
  KeyboardTextCustomCalculator,
} from './styles';

interface ICustomKeyboard {
  title: string | ReactNode;
  type?: string;
  state?: string;
  secondState?: string;
  onChange?: Dispatch<SetStateAction<string>>;
}
interface ICustomDataKeyboard {
  data: ICustomKeyboard;
}

export const CustomKeyboard = ({ data }: ICustomDataKeyboard) => {
  const { title, type, state, onChange } = data;

  const handleSelectButton = () => {
    if (type === 'number') {
      onChange(`${state}${title}`);
    } else if (type === 'point') {
      onChange(`${state}.`);
    } else if (type === 'backspace') {
      onChange(state.slice(0, state.length - 1));
    }
  };
  return (
    <ContentKeyboardCustomCalculator onPress={() => handleSelectButton()}>
      <KeyboardTextCustomCalculator>{title}</KeyboardTextCustomCalculator>
    </ContentKeyboardCustomCalculator>
  );
};
