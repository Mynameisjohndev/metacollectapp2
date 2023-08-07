import { Dispatch, ReactNode, Ref, SetStateAction } from 'react';

import CustomFormButton, {
  ICustomFormButtonRef,
} from '../../Buttons/CustomFormButton';
import { Content, CustomScrollView, Title } from '../../global';
import { CalculatorHeader } from '../CalculatorHeader';
import { CustomAllKeybord } from '../CustomAllKeyboard';

interface ICustomCalculator {
  title: string;
  icon: string | ReactNode;
  buttonTitle: string;
  state: string;
  secondState?: string;
  onChange: Dispatch<SetStateAction<string>>;
  onPress?: () => void;
  loading?: boolean;
  ref: Ref<ICustomFormButtonRef>;
}

interface IDataCustomCalculator {
  data: ICustomCalculator;
}

export const CustomCalculator = ({ data }: IDataCustomCalculator) => {
  const {
    title,
    buttonTitle,
    icon,
    onChange,
    state,
    onPress,
    secondState,
    ref,
    loading,
  } = data;

  return (
    <Content>
      <CustomScrollView>
        <Title>{title}</Title>
        <CalculatorHeader icon={icon} value={state || secondState} />
        <CustomAllKeybord
          {...{
            onChange,
            state,
          }}
        />
        <CustomFormButton
          title={buttonTitle}
          selectColor="primary"
          onPress={onPress}
          loading={loading}
          ref={ref}
        />
      </CustomScrollView>
    </Content>
  );
};
