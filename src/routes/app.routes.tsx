import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Historic } from '../screens/appscreens/historic';
import { InformationItemCollect } from '../screens/appscreens/historic/InformationItemCollect';
import { HistoricTankList } from '../screens/appscreens/historic/tankList';
import { Home } from '../screens/appscreens/home';
import { MyCollect } from '../screens/appscreens/MyCollectSreens/myCollect';
import { TankList } from '../screens/appscreens/MyCollectSreens/tankList';
import { TankOptions } from '../screens/appscreens/MyCollectSreens/tankOptions';
import { Distribution } from '../screens/appscreens/MyCollectSreens/tankOptions/distribution';
import { InformDistribution } from '../screens/appscreens/MyCollectSreens/tankOptions/distribution/informDistribution';
import { InformFIrstRuler } from '../screens/appscreens/MyCollectSreens/tankOptions/informFIrstRuler';
import { InformQuality } from '../screens/appscreens/MyCollectSreens/tankOptions/informQuality';
import { InformSecondRuler } from '../screens/appscreens/MyCollectSreens/tankOptions/informSecondRuler';
import { Informtemperature } from '../screens/appscreens/MyCollectSreens/tankOptions/informtemperature';
import { InformVolume } from '../screens/appscreens/MyCollectSreens/tankOptions/informVolume';
import { ProblemReport } from '../screens/appscreens/MyCollectSreens/tankOptions/problemReport';
import { Storage } from '../screens/appscreens/MyCollectSreens/tankOptions/Storage';
import { InformStorage } from '../screens/appscreens/MyCollectSreens/tankOptions/Storage/informStorage';
import { TankRescue } from '../screens/appscreens/MyCollectSreens/tankRescue';
import { NewCollect } from '../screens/appscreens/newCollect';
import { Schedules } from '../screens/appscreens/Schedules';
import { Settings } from '../screens/appscreens/Settings';
import {
  AppStackType,
  NewCollectStackType,
  MyCollectStackType,
  HistoricStackType,
  SettingsType,
  SchedulesType,
} from './types/approutes/approutes';
import { returnCustomPageName, returnPageName } from './utils/returnPageName';
import { screenOptionMetaColeta } from './utils/screensOptionsMetaColeta';

const AppStack = createNativeStackNavigator<AppStackType>();
const NewCollectStack = createNativeStackNavigator<NewCollectStackType>();
const MyCollectStack = createNativeStackNavigator<MyCollectStackType>();
const HistoricStack = createNativeStackNavigator<HistoricStackType>();
const SettingsStack = createNativeStackNavigator<SettingsType>();
const SchedulesStack = createNativeStackNavigator<SchedulesType>();

const ContainerNewCollectStack = () => {
  return (
    <NewCollectStack.Navigator screenOptions={screenOptionMetaColeta}>
      <NewCollectStack.Screen
        name="First"
        component={NewCollect}
        {...returnPageName({ page: 'NewCollect' })}
      />
    </NewCollectStack.Navigator>
  );
};

const ContainerMyCollectStack = () => {
  return (
    <MyCollectStack.Navigator
      screenOptions={{ headerTitle: '', ...screenOptionMetaColeta }}
    >
      <MyCollectStack.Screen
        name="InfoCollect"
        component={MyCollect}
        {...returnPageName({ page: 'infoCollect' })}
      />
      <MyCollectStack.Screen
        name="StartCollect"
        component={TankList}
        {...returnPageName({ page: 'StartCollect' })}
      />
      <MyCollectStack.Screen
        name="TankOptions"
        component={TankOptions}
        {...returnCustomPageName({ page: 'TankOptions' })}
      />
      <MyCollectStack.Screen
        name="InformVolume"
        component={InformVolume}
        {...returnCustomPageName({ page: 'InformVolume' })}
      />
      <MyCollectStack.Screen
        name="Informtemperature"
        component={Informtemperature}
        {...returnCustomPageName({ page: 'Informtemperature' })}
      />
      <MyCollectStack.Screen
        name="InformFIrstRuler"
        component={InformFIrstRuler}
        {...returnCustomPageName({ page: 'InformFIrstRuler' })}
      />
      <MyCollectStack.Screen
        name="InformSecondRuler"
        component={InformSecondRuler}
        {...returnCustomPageName({ page: 'InformSecondRuler' })}
      />
      <MyCollectStack.Screen
        name="InformQuality"
        component={InformQuality}
        {...returnCustomPageName({ page: 'InformQuality' })}
      />
      <MyCollectStack.Screen
        name="Storage"
        component={Storage}
        {...returnCustomPageName({ page: 'Storage' })}
      />
      <MyCollectStack.Screen
        name="InformStorage"
        component={InformStorage}
        {...returnCustomPageName({ page: 'InformStorage' })}
      />
      <MyCollectStack.Screen
        name="Distribution"
        component={Distribution}
        {...returnCustomPageName({ page: 'ProblemReportProps' })}
      />
      <MyCollectStack.Screen
        name="InformDistribution"
        component={InformDistribution}
        {...returnCustomPageName({ page: 'Distribution' })}
      />
      <MyCollectStack.Screen
        name="ProblemReport"
        component={ProblemReport}
        {...returnCustomPageName({ page: 'ProblemReportProps' })}
      />
      <MyCollectStack.Screen
        name="TankRescue"
        component={TankRescue}
        {...returnCustomPageName({ page: 'TankRescue' })}
      />
    </MyCollectStack.Navigator>
  );
};

const ContainerHistoriStack = () => {
  return (
    <HistoricStack.Navigator screenOptions={screenOptionMetaColeta}>
      <HistoricStack.Screen
        name="First"
        component={Historic}
        {...returnPageName({ page: 'FirstHistorico' })}
      />
      <HistoricStack.Screen
        name="HistoricTankList"
        component={HistoricTankList}
        options={{ title: '' }}
      />
      <HistoricStack.Screen
        name="InformationItemCollect"
        component={InformationItemCollect}
        options={{ title: '' }}
      />
    </HistoricStack.Navigator>
  );
};

const ContainerSettingsStack = () => {
  return (
    <SettingsStack.Navigator screenOptions={screenOptionMetaColeta}>
      <SettingsStack.Screen
        name="Home"
        component={Settings}
        {...returnPageName({ page: 'Settings' })}
      />
    </SettingsStack.Navigator>
  );
};

const ContainerSchedulesStack = () => {
  return (
    <SchedulesStack.Navigator screenOptions={screenOptionMetaColeta}>
      <SchedulesStack.Screen
        name="Home"
        component={Schedules}
        {...returnPageName({ page: 'Schedules' })}
      />
    </SchedulesStack.Navigator>
  );
};

export default function AppRoutes() {
  return (
    <AppStack.Navigator screenOptions={screenOptionMetaColeta}>
      <AppStack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Meta Coleta',
        }}
      />
      <AppStack.Screen
        name="NewCollect"
        component={ContainerNewCollectStack}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="MyCollect"
        component={ContainerMyCollectStack}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Historic"
        component={ContainerHistoriStack}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Settings"
        component={ContainerSettingsStack}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Schedules"
        component={ContainerSchedulesStack}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
}
