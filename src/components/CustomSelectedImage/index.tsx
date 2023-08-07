import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { FlatList } from 'react-native';

import {
  handleAlertRemoveImage,
  ISelectedRemoveImage,
} from '../../screens/appscreens/MyCollectSreens/tankOptions/informQuality/services';
import { RegisterItem } from '../../types/registerItem';
import { returnAppIcons } from '../../utils/returnAppIcons';
import { CustomOpenImage } from '../Modal/CustomOpenImage';
import {
  ContainerCustomSelectImage,
  ContainerCustomSelectImageRow,
  ContainerRemoveImage,
  ContentCustomSelectedImage,
  ContentCustomSelectImage,
  CustomContainerSelectedImage,
  CustomContentIcon,
  CustomLabel,
} from './styles';

interface ICustomSelectedImage {
  label: string;
  iconSelect?: ReactNode;
  selectedImage?: () => void;
  images?: RegisterItem[];
  setImages?: Dispatch<SetStateAction<RegisterItem[]>>;
}

export const CustomSelectedImage = ({
  label,
  iconSelect,
  selectedImage,
  images,
  setImages,
}: ICustomSelectedImage) => {
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState('');

  const openAndCloseModal = () => {
    setOpenModal(!openModal);
  };

  const RemoveImage = ({ image }: ISelectedRemoveImage) => {
    return (
      <ContainerRemoveImage
        onPress={() => handleAlertRemoveImage({ image, images, setImages })}
      >
        {returnAppIcons({ icon: 'close-image', size: 20 })}
      </ContainerRemoveImage>
    );
  };
  return (
    <ContainerCustomSelectImage>
      <CustomLabel>{label}</CustomLabel>
      <ContainerCustomSelectImageRow>
        <CustomContainerSelectedImage>
          <ContentCustomSelectImage onPress={selectedImage}>
            <CustomContentIcon>{iconSelect}</CustomContentIcon>
          </ContentCustomSelectImage>
        </CustomContainerSelectedImage>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={images}
          keyExtractor={(_, index) => String(index)}
          style={{ margin: 0 }}
          renderItem={({ item, index }) => {
            const image: RegisterItem = item;
            const { DFREGISTROIMAGEM } = image;
            return (
              <CustomContainerSelectedImage
                onPress={() => {
                  setImage(DFREGISTROIMAGEM);
                  openAndCloseModal();
                }}
              >
                <ContentCustomSelectedImage
                  source={{
                    uri: `data:image/jpg;base64,${DFREGISTROIMAGEM}`,
                  }}
                  style={{
                    width: 90,
                    height: 90,
                    resizeMode: 'cover',
                  }}
                />
                <RemoveImage image={{ index, item }} />
              </CustomContainerSelectedImage>
            );
          }}
        />
        <CustomOpenImage
          {...{
            openAndCloseModal,
            openModal,
            selectedImage: image,
          }}
        />
      </ContainerCustomSelectImageRow>
    </ContainerCustomSelectImage>
  );
};
