import { wagonerContext } from '../context/wagonerContext';
import { LoadScreenAuth } from '../screens/authscreens/loadScreen';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export const Routes = () => {
  const { wagoner, loadingExistWagoner, headers } = wagonerContext();

  return loadingExistWagoner === true ? (
    <LoadScreenAuth />
  ) : wagoner ? (
    <AppRoutes />
  ) : (
    <AuthRoutes {...headers} />
  );
};
