import React from 'react';

import { CustomItemTitle } from './styles';

interface ICollectInformationItem {
  title: string;
  type: string;
}
export const CollectInformationItem = ({
  title,
  type,
}: ICollectInformationItem) => {
  return (
    <CustomItemTitle isPrimary={true}>
      {title}: <CustomItemTitle isPrimary={false}>{type}</CustomItemTitle>
    </CustomItemTitle>
  );
};
