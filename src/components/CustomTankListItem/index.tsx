import { useEffect, useState } from 'react';

import Company from '../../assets/company.svg';
import Id from '../../assets/id.svg';
import IdCard from '../../assets/idCard.svg';
import User from '../../assets/User.svg';
import { getDBConnection } from '../../databases/conection';
import { updateTypeTbItemColeta } from '../../databases/TBITEMCOLETA/UPDATE/updateTypeTbItemColeta';
import { StartCollectProps } from '../../routes/types/approutes/appscreen';
import { tankListItem } from '../../types/tankListItem';
import { executeSelectTankListProducersInfo } from './services';
import {
  AlignTankList,
  CustomTankListItemContainer,
  CustomTankListItemHeader,
  CustomOptionTextCode,
  CustomTankItemRow,
  TankListSubTitle,
  TankListTitle,
} from './styles';

interface ICustomTankListItem extends StartCollectProps {
  tank: tankListItem;
}
interface ICustomDataTankListItem {
  data: ICustomTankListItem;
}

export const CustomTankListItem = ({ data }: ICustomDataTankListItem) => {
  const { navigation, route, tank } = data;
  const { idCollect } = route.params;
  const {
    DFDESCTANQUE,
    DFIDTANQUE,
    DFNOMEPROPRIEDADE,
    DFIDITEMCOLETAAPP,
    DFMATRICULA,
    typeCardColor,
  } = tank;
  const [producerInfo, setProducerInfo] = useState<string>('');

  const handleNavigateTankOptions = () => {
    navigation.navigate('TankOptions', {
      tank,
    });
  };

  const updateItemColeta = async () => {
    const db = await getDBConnection();
    updateTypeTbItemColeta({
      db,
      DFTIPOITEMCOLETA: 'N',
      DFIDITEMCOLETAAPP: String(DFIDITEMCOLETAAPP),
      DFIDCOLETAAPP: idCollect,
    });
  };

  useEffect(() => {
    updateItemColeta();
  }, [DFIDITEMCOLETAAPP]);

  useEffect(() => {
    executeSelectTankListProducersInfo({
      DFIDITEMCOLETAAPP,
      setProducerInfo,
    });
  }, [DFIDITEMCOLETAAPP]);

  const renderInfoOption = (
    option: 'id' | 'registration' | 'producers',
    text: string,
  ) => {
    const config = {
      width: 18,
      height: 16,
      fill: 'black',
    };
    return (
      <CustomTankItemRow>
        {option === 'id' ? (
          <Id {...config} />
        ) : option === 'registration' ? (
          <IdCard {...config} />
        ) : (
          <User {...config} />
        )}
        <CustomOptionTextCode>{text}</CustomOptionTextCode>
      </CustomTankItemRow>
    );
  };

  const renderCollectItemStatus = (typeCardColor: 'C' | 'N' | 'S' | 'NN') => {
    return (
      <CustomTankItemRow>
        <CustomOptionTextCode style={{ paddingLeft: 0 }}>
          <TankListTitle>Status</TankListTitle>:{' '}
          {typeCardColor === 'C'
            ? 'Coletada'
            : typeCardColor === 'N'
            ? 'Não coletada'
            : typeCardColor === 'S'
            ? 'Socorro'
            : typeCardColor === 'NN'
            ? 'Ocorrência'
            : 'Não definido'}
        </CustomOptionTextCode>
      </CustomTankItemRow>
    );
  };

  return (
    <CustomTankListItemContainer
      onPress={handleNavigateTankOptions}
      type={typeCardColor}
    >
      <CustomTankListItemHeader>
        <Company />
        <AlignTankList>
          <TankListTitle>{DFDESCTANQUE}</TankListTitle>
          <TankListSubTitle>{DFNOMEPROPRIEDADE}</TankListSubTitle>
        </AlignTankList>
      </CustomTankListItemHeader>
      {renderCollectItemStatus(typeCardColor)}
      <CustomTankItemRow>
        {renderInfoOption('id', DFIDTANQUE.toString())}
        {renderInfoOption('registration', DFMATRICULA)}
      </CustomTankItemRow>
      {renderInfoOption('producers', producerInfo)}
    </CustomTankListItemContainer>
  );
};
