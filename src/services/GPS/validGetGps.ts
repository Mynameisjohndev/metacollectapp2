/* eslint-disable no-async-promise-executor */
// import { expoGetGpsLocation } from './expoGetGpsLocation';
import { getCurrentGpsLocation } from './getCurrentGpsLocation';
import { nativeModuleGetGpsLocacation } from './nativeModuleGetGpsLocacation';

export const validGetGps = () => {
  return new Promise(async resolve => {
    const firtCoordinates = await getCurrentGpsLocation();
    // console.log(`1 - ${JSON.stringify(firtCoordinates)}`);
    if (firtCoordinates) {
      resolve(firtCoordinates);
      return firtCoordinates;
    }
    // const secondCoordinates = await expoGetGpsLocation();
    // // console.log(`2 - ${JSON.stringify(secondCoordinates)}`);
    // if (secondCoordinates) {
    //   resolve(secondCoordinates);
    //   return secondCoordinates;
    // }
    const thirdCoordinates = await nativeModuleGetGpsLocacation();
    // console.log(`3 - ${JSON.stringify(thirdCoordinates)}`);
    if (thirdCoordinates) {
      resolve(thirdCoordinates);
      return thirdCoordinates;
    }
    return undefined;
  });
};

export const multipleGetGps = async () => {
  const firtCoordinates = await getCurrentGpsLocation();
  console.log(`1 - ${JSON.stringify(firtCoordinates)}`);
  // const secondCoordinates = await expoGetGpsLocation();
  // console.log(`2 - ${JSON.stringify(secondCoordinates)}`);
  const thirdCoordinates = await nativeModuleGetGpsLocacation();
  console.log(`3 - ${JSON.stringify(thirdCoordinates)}`);
};
