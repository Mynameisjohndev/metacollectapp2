import { FlatList } from 'react-native';

import { RegistryItem } from '../../types/registryItem';
import {
  ContainerCustomImageReturn,
  ContainerCustomImageReturnRow,
  ContentCustomImageReturn,
  CustomLabel,
} from './styles';

interface ICustomImageReturn {
  label: string;
  images?: RegistryItem[];
}
export const CustomImageReturn = ({ label, images }: ICustomImageReturn) => {
  return (
    <ContainerCustomImageReturn>
      <CustomLabel>{label}</CustomLabel>
      <ContainerCustomImageReturnRow>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={images}
          keyExtractor={(_, index) => String(index)}
          style={{ margin: 0 }}
          renderItem={({ item, index }) => {
            const image: RegistryItem = item;
            const { DFREGISTROIMAGEM } = image;
            return (
              <>
                <ContentCustomImageReturn
                  source={{
                    uri: `data:image/jpg;base64,${DFREGISTROIMAGEM}`,
                  }}
                  style={{
                    width: 90,
                    height: 90,
                    resizeMode: 'cover',
                  }}
                />
              </>
            );
          }}
        />
      </ContainerCustomImageReturnRow>
    </ContainerCustomImageReturn>
  );
};
