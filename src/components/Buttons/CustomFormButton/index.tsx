import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { BUTTON_BORDER_RADIUS } from '../../../config';
import {
  ContainerButton,
  CustonButtonTitle,
  ContentButton,
  CustonChildrenContent,
} from './styles';

type ICustomFormButtonProps = RectButtonProps & {
  title: string;
  selectColor: 'primary' | 'secondary';
  children?: ReactNode;
  loading?: boolean;
};

export interface ICustomFormButtonRef {
  disableButton: () => void;
  enableButton: () => void;
}

const CustomFormButton = (
  { title, selectColor, children, loading, ...rest }: ICustomFormButtonProps,
  ref: React.Ref<ICustomFormButtonRef>,
) => {
  const [enabled, setEnabled] = useState(true);
  const buttonRef = useRef<RectButton>(null);

  useImperativeHandle(ref, () => ({
    disableButton: () => {
      setEnabled(false);
    },
    enableButton: () => {
      setEnabled(true);
    },
  }));

  const handlePress = () => {
    if (enabled && rest.onPress) {
      rest.onPress(true);
    }
  };

  return (
    <ContainerButton>
      <ContentButton
        style={{
          borderRadius: BUTTON_BORDER_RADIUS,
        }}
        ref={buttonRef}
        onPress={handlePress}
        selectColor={selectColor}
        enabled={enabled && !loading}
      >
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            <CustonChildrenContent>{children}</CustonChildrenContent>
            <CustonButtonTitle hasIcon={!!children}>{title}</CustonButtonTitle>
          </>
        )}
      </ContentButton>
    </ContainerButton>
  );
};

export default forwardRef(CustomFormButton);
