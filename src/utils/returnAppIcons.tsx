import Alert from '../assets/Alert.svg';
import Data from '../assets/calendar.svg';
import Camera from '../assets/camera.svg';
import Close from '../assets/Close.svg';
import Settings from '../assets/config.svg';
import Database from '../assets/database.svg';
import Telefone from '../assets/device.svg';
import Distribution from '../assets/distribution.svg';
import Collect from '../assets/flag.svg';
import File from '../assets/folder.svg';
import History from '../assets/history.svg';
import Information from '../assets/information.svg';
import Local from '../assets/mappin.svg';
import Volume from '../assets/mileage.svg';
import Synchronize from '../assets/reload.svg';
import RemoveImage from '../assets/removeimage.svg';
import Sad from '../assets/sadFace.svg';
import Scale from '../assets/scale.svg';
import Schedule from '../assets/schedules.svg';
import Search from '../assets/search.svg';
import Select from '../assets/Select.svg';
import SettingsUser from '../assets/settingsuser.svg';
import Signout from '../assets/signout.svg';
import Storage from '../assets/storage.svg';
import Success from '../assets/Success.svg';
import Distribuition from '../assets/surplus.svg';
import Temperature from '../assets/temperature.svg';
import Wagoner from '../assets/User.svg';
import themes from '../themes';

interface IReturnTimeLineIcons {
  type: number;
  size?: number;
  color?: string;
}

interface IReturnPermissionsIcons {
  type: number;
  size?: number;
  color?: string;
}

interface IReturnAppIcons {
  icon:
    | 'wagoner'
    | 'data'
    | 'search'
    | 'close'
    | 'close-image'
    | 'volume'
    | 'storage'
    | 'distribuition'
    | 'sad'
    | 'select'
    | 'settings-user'
    | 'signout'
    | 'database';
  color?: string;
  size?: number;
}

interface IReturnHomeIcons {
  icon:
    | 'mycollect'
    | 'newcollect'
    | 'schedules'
    | 'history'
    | 'synchronize'
    | 'settings';
}

const returnTimeLineIcons = ({ type, color, size }: IReturnTimeLineIcons) => {
  const config = {
    width: `${size || 25}`,
    height: `${size || 25}`,
    fill: `${color || themes.COLORS.WHITE}`,
  };
  switch (type) {
    case 1:
      return <Volume {...config} />;
    case 2:
      return <Information {...config} />;
    case 3:
      return <Temperature {...config} />;
    case 4:
      return <Scale {...config} />;
    case 5:
      return <Scale {...config} />;
    case 6:
      return <Storage {...config} />;
    case 7:
      return <Distribution {...config} />;
    default:
      return <></>;
  }
};

const returnPermissionIcons = ({
  type,
  color,
  size,
}: IReturnPermissionsIcons) => {
  const config = {
    width: `${size || 25}`,
    height: `${size || 25}`,
    fill: `${color || themes.COLORS.PRIMARY}`,
  };
  switch (type) {
    case 1:
      return <File {...config} />;
    case 2:
      return <Camera {...config} />;
    case 3:
      return <Local {...config} />;
    case 4:
      return <Telefone {...config} />;
    default:
      return <></>;
  }
};

const returnAppIcons = ({ icon, color, size }: IReturnAppIcons) => {
  const config = {
    fill: `${color || themes.COLORS.PRIMARY}`,
    width: `${size || 25}`,
    height: `${size || 25}`,
  };

  switch (icon) {
    case 'wagoner':
      return <Wagoner {...config} />;
    case 'data':
      return <Data {...config} />;
    case 'search':
      return <Search {...config} />;
    case 'close':
      return <Close {...config} />;
    case 'close-image':
      return <RemoveImage {...config} />;
    case 'volume':
      return <Volume {...config} />;
    case 'storage':
      return <Storage {...config} />;
    case 'distribuition':
      return <Distribuition {...config} />;
    case 'sad':
      return <Sad {...config} />;
    case 'select':
      return <Select {...config} />;
    case 'settings-user':
      return <SettingsUser {...config} />;
    case 'signout':
      return <Signout {...config} />;
    case 'database':
      return <Database {...config} />;
    default:
      return <></>;
  }
};

const returnValidIconModal = (icon: 0 | 1 | 2 | 3) => {
  const config = {
    fill: `${themes.COLORS.PRIMARY}`,
    width: `${100}`,
    height: `${100}`,
  };
  switch (icon) {
    case 0:
      return <Alert {...config} />;
    case 1:
      return <Success {...config} />;
    case 2:
      return <Close {...config} />;
    case 3:
      return <Close {...config} />;
    default:
      return null;
  }
};

const returnHomeIcons = ({ icon }: IReturnHomeIcons) => {
  switch (icon) {
    case 'mycollect':
      return <Collect />;
    case 'newcollect':
      return <Collect />;
    case 'schedules':
      return <Schedule />;
    case 'history':
      return <History />;
    case 'synchronize':
      return <Synchronize />;
    case 'settings':
      return <Settings />;
    default:
      return null;
  }
};

export {
  returnTimeLineIcons,
  returnAppIcons,
  returnValidIconModal,
  returnHomeIcons,
  returnPermissionIcons,
};
