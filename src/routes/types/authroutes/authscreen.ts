import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthStackType } from './authroutes';

type SigninProps = NativeStackScreenProps<AuthStackType, 'Signin'>;
type ValidTokenProps = NativeStackScreenProps<AuthStackType, 'ValidToken'>;

export { SigninProps, ValidTokenProps };
