import React, { ReactNode } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  ContentCustomStorageInformation,
  CustomStorageInformationIcon,
  CustomStorageInformationLine,
  CustomStorageInformationText,
} from './styles';

type ICustomStorageInformation = RectButtonProps & {
  title: string;
  titleValue: string;
  isLine: boolean;
  icon: ReactNode;
};
export const CustomStorageInformation = ({
  icon,
  title,
  titleValue,
  isLine,
}: ICustomStorageInformation) => {
  return (
    <>
      <ContentCustomStorageInformation>
        <CustomStorageInformationIcon>{icon}</CustomStorageInformationIcon>
        <CustomStorageInformationText isPrimary={true}>
          {title}: {''}
          <CustomStorageInformationText isPrimary={false}>
            {titleValue} L
          </CustomStorageInformationText>
        </CustomStorageInformationText>
      </ContentCustomStorageInformation>
      <CustomStorageInformationLine isLine={isLine} />
    </>
  );
};
