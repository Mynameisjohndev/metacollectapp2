// import * as Location from 'expo-location';

// async function requestLocationPermission() {
//   const { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== 'granted') {
//     alert('Permissão para acessar a localização foi negada');
//     return false;
//   }
//   return true;
// }

// const expoGetGpsLocation = async () => {
//   const hasPermission = await requestLocationPermission();
//   if (!hasPermission) return;
//   return new Promise(resolve => {
//     try {
//       Location.getCurrentPositionAsync({
//         accuracy: Location.LocationAccuracy.BestForNavigation,
//         timeInterval: 1500,
//         distanceInterval: 10000,
//       }).then(res => {
//         resolve(res.coords);
//         return res.coords;
//       });
//     } catch (_) {
//       resolve(undefined);
//       return undefined;
//     }
//   });
// };

// export { expoGetGpsLocation };
