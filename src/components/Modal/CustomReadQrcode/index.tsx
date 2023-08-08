/* eslint-disable no-unused-expressions */
/* eslint-disable no-async-promise-executor */
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Alert, PermissionStatus, ActivityIndicator } from 'react-native';
import Permission from 'react-native-permissions';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Defs, Rect, Mask } from 'react-native-svg';

// import FlashlightOff from '../../../assets/flashlightoff.svg';
// import FlashlightOn from '../../../assets/flashlighton.svg';
import { Tank } from '../../../types/tank';
import { Scanner } from './Scanner';
import {
  CustomReadQrcodeContainer,
  CustomReadQrcodeFormat,
  // CustomReadQrcodeLightButton,
  CustomReadQrcodeModal,
} from './styles';

interface ICustomReadQrcode {
  visible: boolean;
  setQrcodeIsOpen: Dispatch<SetStateAction<boolean>>;
  setReadTank: Dispatch<SetStateAction<Tank>>;
}

const CustomReadQrcode: FC<ICustomReadQrcode> = ({
  visible,
  setQrcodeIsOpen,
  setReadTank,
}) => {
  // const devices = useCameraDevices();
  // const device = devices.back;
  // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
  //   checkInverted: true,
  // });
  const [error, setError] = useState({
    error: false,
    message: '',
  });
  const [permission, setPermission] = useState<PermissionStatus>(null);
  const [open, setOpen] = useState<boolean>(false);
  // const [light, setLight] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);

  // const iconProp = {
  //   width: 20,
  //   height: 20,
  // };

  const position = useSharedValue(-200);
  const barraStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: position.value }],
    };
  });

  // const onAndOffFlashlight = () => {
  //   setLight(!light);
  // };

  const getCameraPermission = (): Promise<PermissionStatus> => {
    return new Promise(async resolve => {
      const result = (await Permission.request(
        'android.permission.CAMERA',
      )) as PermissionStatus;
      setPermission(result);
      resolve(result);
      return result;
    });
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(data);
    try {
      const tank: Tank = JSON.parse(data);
      if (!tank.DFIDTANQUE) {
        return setError({
          error: true,
          message:
            'As informaçõe fornecidas são inválidas, por favor leia um Qrcode válido!',
        });
      }
      setTimeout(() => {
        setReadTank(tank);
        return setQrcodeIsOpen(false);
      }, 100);
    } catch (error) {
      setError({
        error: true,
        message: 'Este tipo de qrcode não é suportado em nosso aplicativo!',
      });
    }
  };

  useEffect(() => {
    position.value = withRepeat(
      withTiming(200, {
        duration: 1000,
        // easing: Easing.ease,
      }),
      -1,
      true,
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1800);
    if (visible === false) setOpen(false);
  }, [visible]);

  // useEffect(() => {
  //   if (barcodes[0]) {
  //     try {
  //       const tank: Tank = JSON.parse(barcodes[0].rawValue);
  //       if (!tank.DFIDTANQUE) {
  //         return setError({
  //           error: true,
  //           message:
  //             'As informaçõe fornecidas são inválidas, por favor leia um Qrcode válido!',
  //         });
  //       }
  //       setLight(false);
  //       setTimeout(() => {
  //         setReadTank(tank);
  //         return setQrcodeIsOpen(false);
  //       }, 100);
  //     } catch (error) {
  //       setError({
  //         error: true,
  //         message: 'Este tipo de qrcode não é suportado em nosso aplicativo!',
  //       });
  //     }
  //   }
  // }, [barcodes]);

  useEffect(() => {
    if (error.error) {
      Alert.alert('Houve um erro inesperado', error.message, [
        {
          text: 'ok',
          onPress: () =>
            setError({
              error: false,
              message: '',
            }),
        },
      ]);
    }
  }, [error.error]);

  useEffect(() => {
    if (visible) {
      getCameraPermission()
        .then(res => {
          if (res !== 'granted') {
            Alert.alert(
              'Houve um erro inesperado',
              'Você não permitiu o uso da câmera. Este recurso necessita da sua permissão para ser utilizado. Por favor, entre nas configurações e aceite as permissões!',
              [
                {
                  text: 'ok',
                  onPress: () => setPermission(null),
                },
              ],
            );
          }
        })
        .catch(() => {
          setError({
            error: true,
            message: 'Caso o mesmo continue, entre em contato com o suporte!',
          });
        });
    }
  }, [visible]);

  return (
    <CustomReadQrcodeModal
      {...{ visible, onRequestClose: () => setQrcodeIsOpen(false) }}
    >
      <CustomReadQrcodeContainer>
        {permission && open ? (
          <>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={{
                width: '100%',
                height: '100%',
                transform: [
                  {
                    scale: 1.25,
                  },
                ],
                position: 'absolute',
              }}
            />
            <Scanner />
            <Animated.View
              style={[
                {
                  height: 4,
                  width: '100%',
                  backgroundColor: 'lawngreen',
                  position: 'absolute',
                },
                barraStyle,
              ]}
            />
            {/* <CustomReadQrcodeLightButton onPress={onAndOffFlashlight}>
              {light ? (
                <FlashlightOn {...iconProp} />
              ) : (
                <FlashlightOff {...iconProp} />
              )}
            </CustomReadQrcodeLightButton> */}
          </>
        ) : (
          <ActivityIndicator size="large" color="white" />
        )}
      </CustomReadQrcodeContainer>
    </CustomReadQrcodeModal>
  );
};

export { CustomReadQrcode };
