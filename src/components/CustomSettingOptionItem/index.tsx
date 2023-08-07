import { useWagonerSettingsContext } from '../../context/wagonerSettingsContext';
import { ISettingColletOptions } from '../../screens/appscreens/Settings/options';
import themes from '../../themes';
import { returnTimeLineIcons } from '../../utils/returnAppIcons';
import { ICustomSwitchProps, CustomSwitch } from '../CustomSwitch';
import {
  CustomSettingOptionItemContainer,
  CustomSettingOptionItemTank,
  CustomSettingOptionItemText,
} from './styles';

interface ICustomSettingOptionItem {
  option: ISettingColletOptions;
  openModalConfig?: () => void;
}

const CustomSettingOptionItem = ({ option }: ICustomSettingOptionItem) => {
  const { id, name } = option;
  const {
    hasRuleFront,
    hasRuleBack,
    setHasRuleBack,
    hasStorage,
    hasDischarge,
    setHasDischarge,
    hasQuality,
    setHasQuality,
    hasVolume,
    hasTemperature,
  } = useWagonerSettingsContext();

  const validOption = (id: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
    let config: ICustomSwitchProps;
    if (id === 1) {
      config = {
        onChangeState: () => null,
        value: hasVolume,
      };
    }
    if (id === 2) {
      config = {
        onChangeState: setHasQuality,
        value: hasQuality,
      };
    }
    if (id === 3) {
      config = {
        onChangeState: () => null,
        value: hasTemperature,
      };
    }
    if (id === 4) {
      config = {
        onChangeState: () => null,
        value: hasRuleFront,
      };
    }
    if (id === 5) {
      config = {
        onChangeState: setHasRuleBack,
        value: hasRuleBack,
      };
    }
    if (id === 6) {
      config = {
        onChangeState: () => null,
        value: hasStorage,
      };
    }
    if (id === 7) {
      config = {
        onChangeState: setHasDischarge,
        value: hasDischarge,
      };
    }
    const { onChangeState, value } = config;
    return <CustomSwitch {...{ onChangeState, value }} />;
  };

  return (
    <>
      <CustomSettingOptionItemContainer>
        <CustomSettingOptionItemTank>
          {returnTimeLineIcons({ type: id, color: themes.COLORS.PRIMARY })}
          <CustomSettingOptionItemText>{name}</CustomSettingOptionItemText>
        </CustomSettingOptionItemTank>
        {validOption(id)}
      </CustomSettingOptionItemContainer>
    </>
  );
};

export { CustomSettingOptionItem };
