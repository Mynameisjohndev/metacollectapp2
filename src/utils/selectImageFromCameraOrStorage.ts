/* eslint-disable consistent-return */
import { Dispatch, SetStateAction } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  OptionsCommon,
} from 'react-native-image-picker';

import { RegisterItem } from '../types/registerItem';

interface ISelectImageFromCameraOrStorage {
  option: 'camera' | 'storage';
  setImages: Dispatch<SetStateAction<RegisterItem[]>>;
  images: RegisterItem[];
}

const selectImageFromCameraOrStorage = ({
  option,
  setImages,
  images,
}: ISelectImageFromCameraOrStorage) => {
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permissão de Câmera',
            message: 'O aplicativo precisa de permissão para câmera',
            buttonPositive: 'Aceitar',
            buttonNegative: 'Rejeitar',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissão de Gravação de Armazenamento Externo',
            message: 'O aplicativo precisa de permissão de gravação',
            buttonPositive: 'Aceitar',
            buttonNegative: 'Rejeitar',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        Alert.alert('Write permission err', err);
      }
      return false;
    }
    return true;
  };

  const options: OptionsCommon = {
    mediaType: 'photo',
    maxWidth: 1280,
    maxHeight: 720,
    quality: 0.4,
    includeBase64: true,
  };

  const captureImage = async () => {
    const isCameraPermitted = await requestCameraPermission();
    const isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.errorCode === 'camera_unavailable') {
          alert('A câmera não está disponível no dispositivo');
          return;
        }
        if (response.errorCode === 'permission') {
          alert('Permissão de acesso foi negada');
          return;
        }
        if (response.errorCode === 'others') {
          alert(response.errorMessage);
        }
        if (response.didCancel === true) {
          return;
        }
        const newImage: RegisterItem = {
          DFREGISTROIMAGEM: response.assets[0].base64,
        };
        if (response.assets[0]) {
          setImages([...images, newImage]);
        }
      });
    }
  };

  const chooseFile = () => {
    launchImageLibrary(options, response => {
      if (response.errorCode === 'camera_unavailable') {
        alert('A câmera não está disponível no dispositivo');
        return;
      }
      if (response.errorCode === 'permission') {
        alert('Permissão de acesso foi negada');
        return;
      }
      if (response.errorCode === 'others') {
        alert(response.errorMessage);
      }
      if (response.didCancel === true) {
        return;
      }
      const newImage: RegisterItem = {
        DFREGISTROIMAGEM: response.assets[0].base64,
      };
      if (response.assets[0]) {
        setImages([...images, newImage]);
      }
    });
  };

  if (option === 'camera') {
    captureImage();
  }
  if (option === 'storage') {
    chooseFile();
  }
};

export { selectImageFromCameraOrStorage };
