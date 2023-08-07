import React, { ReactNode } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { CollectInformationItem } from './CollectInformationItem';
import {
  ContainerCustomInformation,
  ContentCustomInformationCollect,
  CustomOptionText,
  CustomProfile,
} from './styles';

type ICustomCollectInformation = RectButtonProps & {
  name: string;
  iconUser: ReactNode;
  vehicle: string;
  regional: string;
  line: string;
  tankInfo: string;
};
type IDataCustomCollectInformation = {
  data: ICustomCollectInformation;
};

export const CustomCollectInformation = ({
  data,
}: IDataCustomCollectInformation) => {
  const { name, iconUser, vehicle, regional, line, tankInfo } = data;
  return (
    <ContainerCustomInformation>
      <ContentCustomInformationCollect>
        <CustomProfile>
          {iconUser}
          <CustomOptionText>{name} </CustomOptionText>
        </CustomProfile>
        <CollectInformationItem title="Veículo" type={vehicle} />
        <CollectInformationItem title="Rota" type={regional} />
        <CollectInformationItem title="Linha" type={line} />
        <CollectInformationItem title="Tanque" type={tankInfo} />
      </ContentCustomInformationCollect>
    </ContainerCustomInformation>
  );
};
