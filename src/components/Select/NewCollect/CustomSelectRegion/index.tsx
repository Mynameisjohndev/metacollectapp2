import React, { SetStateAction, Dispatch, useEffect, useState } from 'react';
import { ActivityIndicator, Text, ModalProps } from 'react-native';

import { Line } from '../../../../types/line';
import { Region } from '../../../../types/region';
import { returnAppIcons } from '../../../../utils/returnAppIcons';
import { CustomDontExistListItem } from '../../../CustomDontExistListItem';
import { CustomSearch } from '../../../CustomSearch';
import { CustomTouchableOpacity, Title } from '../../../global';
import {
  ContainerModal,
  ContentHeaderListOption,
  ContentModal,
  ListOptions,
  Option,
  OptionName,
  OverlayModal,
} from '../styles';
import { searchRegion } from './services';

type IModalAlertProps = ModalProps & {
  onRequestClose?: () => void;
  setSelectedRegion: Dispatch<SetStateAction<Line>>;
  regionList: Line[];
  // loadingListLine: boolean;
};

export const CustomSelectRegion = ({
  onRequestClose,
  regionList,
  setSelectedRegion,
}: IModalAlertProps) => {
  const handleSelectregion = (item: any) => {
    setSelectedRegion(item);
    onRequestClose();
  };

  const [search, setSearch] = useState<string>('');
  const [region, setRegion] = useState<Region[]>(regionList);

  useEffect(() => {
    searchRegion({
      value: search,
      regionList,
      setRegion,
    });
  }, [search]);

  return (
    <ContainerModal transparent animationType="slide">
      <OverlayModal onPress={() => onRequestClose()}>
        <ContentModal>
          <ContentHeaderListOption>
            <Title>Selecionar Rota</Title>
            <CustomTouchableOpacity onPress={() => onRequestClose()}>
              {returnAppIcons({ icon: 'close', size: 25 })}
            </CustomTouchableOpacity>
          </ContentHeaderListOption>
          <CustomSearch
            {...{
              setValue: setSearch,
              value: search,
            }}
          />
          {region.length > 0 ? (
            <ListOptions
              keyExtractor={(item: Region) => String(item.DFIDREGIONAL)}
              data={region}
              renderItem={({ item }) => {
                const region: Region = item;
                return (
                  <Option onPress={() => handleSelectregion(item)}>
                    <OptionName>{region.DFDESCREGIONAL}</OptionName>
                  </Option>
                );
              }}
            />
          ) : (
            <CustomDontExistListItem text="Nenhuma região encontrada" />
          )}
        </ContentModal>
      </OverlayModal>
    </ContainerModal>
  );
};
