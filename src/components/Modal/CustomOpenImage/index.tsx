import { FC } from 'react';

import { returnAppIcons } from '../../../utils/returnAppIcons';
import {
  CustomOpenCloseModal,
  CustomOpenImageContainer,
  CustomOpenImageContent,
  CustomOpenImageOverlay,
  CustomOpenSelectedImage,
} from './styles';

interface ICustomOpenImage {
  openModal: boolean;
  openAndCloseModal: () => void;
  selectedImage: string;
}

const CustomOpenImage: FC<ICustomOpenImage> = ({
  openAndCloseModal,
  openModal,
  selectedImage,
}) => {
  const CloseModal = () => {
    return (
      <CustomOpenCloseModal onPress={openAndCloseModal}>
        {returnAppIcons({ icon: 'close-image', size: 25 })}
      </CustomOpenCloseModal>
    );
  };

  return (
    <CustomOpenImageContainer
      {...{
        visible: openModal,
        onRequestClose: openAndCloseModal,
      }}
    >
      <CustomOpenImageOverlay onPress={openAndCloseModal}>
        <CustomOpenImageContent>
          <CloseModal />
          <CustomOpenSelectedImage
            {...{
              source: { uri: `data:image/jpg;base64,${selectedImage}` },
            }}
          />
        </CustomOpenImageContent>
      </CustomOpenImageOverlay>
    </CustomOpenImageContainer>
  );
};

export { CustomOpenImage };
