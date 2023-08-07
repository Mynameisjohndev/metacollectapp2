import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Signin } from '../screens/authscreens/signin';
import { ValidToken } from '../screens/authscreens/validToken';
import { WagonerHeaders } from '../types/wagonerHeaders';
import { AuthStackType } from './types/authroutes/authroutes';

const AuthStack = createNativeStackNavigator<AuthStackType>();

export default function AuthRoutes(headers: WagonerHeaders) {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={headers.token ? 'Signin' : 'ValidToken'}
    >
      <AuthStack.Screen name="ValidToken" component={ValidToken} />
      <AuthStack.Screen name="Signin" component={Signin} />
    </AuthStack.Navigator>
  );
}
