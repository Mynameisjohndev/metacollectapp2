// import Backspace from '../../assets/backspace.svg';
import { Dispatch, SetStateAction } from 'react';

import Backspace from '../../../assets/backspace.svg';
import { CustomKeyboard } from '../CustomKeyboard';
import { ContentCustomRowKeybord } from './styles';

interface ICustomAllKeybord {
  onChange: Dispatch<SetStateAction<string>>;
  state: string;
}
export const CustomAllKeybord = ({ onChange, state }: ICustomAllKeybord) => {
  const option = {
    state,
    onChange,
    type: 'number',
  };

  return (
    <>
      <ContentCustomRowKeybord>
        <CustomKeyboard data={{ title: '1', ...option }} />
        <CustomKeyboard data={{ title: '2', ...option }} />
        <CustomKeyboard data={{ title: '3', ...option }} />
      </ContentCustomRowKeybord>
      <ContentCustomRowKeybord>
        <CustomKeyboard data={{ title: '4', ...option }} />
        <CustomKeyboard data={{ title: '5', ...option }} />
        <CustomKeyboard data={{ title: '6', ...option }} />
      </ContentCustomRowKeybord>
      <ContentCustomRowKeybord>
        <CustomKeyboard data={{ title: '7', ...option }} />
        <CustomKeyboard data={{ title: '8', ...option }} />
        <CustomKeyboard data={{ title: '9', ...option }} />
      </ContentCustomRowKeybord>
      <ContentCustomRowKeybord>
        <CustomKeyboard data={{ title: '0', ...option }} />
        <CustomKeyboard data={{ title: '.', state, onChange, type: 'point' }} />
        <CustomKeyboard
          data={{
            title: <Backspace width={25} height={25} />,
            state,
            onChange,
            type: 'backspace',
          }}
        />
      </ContentCustomRowKeybord>
    </>
  );
};
