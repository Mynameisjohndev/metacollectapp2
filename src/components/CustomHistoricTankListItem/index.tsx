import React from 'react';
import { Text } from 'react-native';

import Company from '../../assets/company.svg';
import Id from '../../assets/id.svg';
import IdCard from '../../assets/idCard.svg';
import { tankListItem } from '../../types/tankListItem';
import {
  AlignTankList,
  ContainerCustomTankItem,
  ContainerTankListItem,
  ContentTankListItem,
  CustomOptionText,
  CustomOptionTextCode,
} from './styles';

interface ICustomHistoricTankListItem {
  tank: tankListItem;
  handleNavigateToInformationItemCollect: () => void;
}

export const CustomHistoricTankListItem = ({
  tank,
  handleNavigateToInformationItemCollect,
}: ICustomHistoricTankListItem) => {
  const { DFDESCTANQUE, DFNOMEPRODUTOR, DFIDTANQUE, DFMATRICULA } = tank;
  return (
    <ContainerTankListItem onPress={handleNavigateToInformationItemCollect}>
      <ContentTankListItem>
        <Company />
        <AlignTankList>
          <CustomOptionText>{DFDESCTANQUE}</CustomOptionText>
          <Text>{DFNOMEPRODUTOR}</Text>
        </AlignTankList>
      </ContentTankListItem>
      <ContainerCustomTankItem>
        <Id width={18} height={16} />
        <CustomOptionTextCode>{DFIDTANQUE}</CustomOptionTextCode>
        <IdCard width={18} height={18} />
        <CustomOptionTextCode>{DFMATRICULA}</CustomOptionTextCode>
      </ContainerCustomTankItem>
    </ContainerTankListItem>
  );
};
