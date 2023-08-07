/* eslint-disable no-async-promise-executor */
import NetInfo from '@react-native-community/netinfo';

const getInternetStatus = async (): Promise<boolean> => {
  return new Promise(async resolve => {
    await NetInfo.fetch().then(state => {
      resolve(state.isConnected);
      return state.isConnected;
    });
  });
};

export { getInternetStatus };
