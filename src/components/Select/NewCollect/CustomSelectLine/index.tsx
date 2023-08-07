import React, { SetStateAction, Dispatch, useEffect, useState } from 'react';
import { ActivityIndicator, Text, ModalProps } from 'react-native';

import { Line } from '../../../../types/line';
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
import { searchLine } from './services';

type IModalAlertProps = ModalProps & {
  onRequestClose?: () => void;
  setSelectedLine: Dispatch<SetStateAction<Line>>;
  lineList: Line[];
  loadingListLine: boolean;
};

export const CustomSelectLine = ({
  onRequestClose,
  lineList,
  setSelectedLine,
  loadingListLine,
}: IModalAlertProps) => {
  const handleSelectVehicle = (item: any) => {
    setSelectedLine(item);
    onRequestClose();
  };

  const [search, setSearch] = useState<string>('');
  const [line, setLine] = useState<Line[]>(lineList);

  useEffect(() => {
    searchLine({
      value: search,
      lineList,
      setLine,
    });
  }, [search]);

  return (
    <ContainerModal transparent animationType="slide">
      <OverlayModal onPress={() => onRequestClose()}>
        <ContentModal>
          <ContentHeaderListOption>
            <Title>Selecionar linha</Title>
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
          {loadingListLine ? (
            <>
              <ActivityIndicator size="large" color="grey" />
              <Text>Carregando dados</Text>
            </>
          ) : (
            <>
              {line.length > 0 ? (
                <ListOptions
                  keyExtractor={(item: Line, index) => String(index)}
                  data={line}
                  renderItem={({ item }) => {
                    const line: Line = item;
                    const { DFNOMELINHA } = line;
                    return (
                      <Option onPress={() => handleSelectVehicle(item)}>
                        <OptionName>{DFNOMELINHA}</OptionName>
                      </Option>
                    );
                  }}
                />
              ) : (
                <CustomDontExistListItem text="Nenhuma linha encontrada" />
              )}
            </>
          )}
        </ContentModal>
      </OverlayModal>
    </ContainerModal>
  );
};
