import React, { SetStateAction, Dispatch, useEffect, useState } from 'react';
import { ActivityIndicator, Text, ModalProps, Alert } from 'react-native';

import { useInfoCollect } from '../../../context/InfoCollectContext';
import { Property } from '../../../types/property';
import { returnAppIcons } from '../../../utils/returnAppIcons';
import { CustomDontExistListItem } from '../../CustomDontExistListItem';
import { CustomSearch } from '../../CustomSearch';
import { CustomTouchableOpacity, Title } from '../../global';
import { handleNewProperty, openModal, searchProperty } from './services';
import {
  ContainerModal,
  OverlayModal,
  ContentModal,
  ContentHeaderListOption,
  ListOptions,
  Option,
  OtionName,
} from './styles';

type IModalAlertProps = ModalProps & {
  onRequestClose?: () => void;
  setLoadingNewProperty: Dispatch<SetStateAction<boolean>>;
  propertyList: Property[];
  loadingListProperty: boolean;
};

export const CustomSelectProperty = ({
  onRequestClose,
  propertyList,
  setLoadingNewProperty,
  loadingListProperty,
}: IModalAlertProps) => {
  const { collectItem } = useInfoCollect();
  const { DFIDITEMCOLETAAPP } = collectItem && collectItem;
  const handleSelectNewProperty = async (item: any) => {
    Alert.alert(
      'Novo produtor',
      `Você deseja adicionar o produtor ${item.DFNOMEPRODUTOR} ao tanque?`,
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            handleNewProperty({
              DFIDITEMCOLETAAPP: Number(DFIDITEMCOLETAAPP),
              DFIDPROPRIEDADE: item.DFIDPROPRIEDADE,
            }).then(res => {
              if (res === false) {
                Alert.alert('Já existe esse produtor nesse taque', ``, [
                  { text: 'Cancelar', style: 'cancel' },
                ]);
              } else {
                onRequestClose();
                setLoadingNewProperty(true);
              }
            });
          },
        },
      ],
    );
  };

  const [search, setSearch] = useState<string>('');
  const [property, setProperty] = useState<Property[]>(propertyList);

  useEffect(() => {
    searchProperty({
      value: search,
      propertyList,
      setProperty,
    });
  }, [search]);

  return (
    <ContainerModal transparent animationType="slide">
      <OverlayModal onPress={() => onRequestClose()}>
        <ContentModal>
          <ContentHeaderListOption>
            <Title>Novo produtor</Title>
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
          {loadingListProperty ? (
            <>
              <ActivityIndicator size="large" color="grey" />
              <Text>Carregando dados</Text>
            </>
          ) : (
            <>
              {property.length > 0 ? (
                <ListOptions
                  keyExtractor={(item: Property, index) => String(index)}
                  data={property}
                  extraData={property}
                  renderItem={({ item }) => {
                    const property: Property = item;
                    const { DFNOMEPRODUTOR } = property;
                    return (
                      <Option onPress={() => handleSelectNewProperty(item)}>
                        <OtionName>{DFNOMEPRODUTOR}</OtionName>
                      </Option>
                    );
                  }}
                />
              ) : (
                <CustomDontExistListItem text="Nenhuma prorietario encontrada" />
              )}
            </>
          )}
        </ContentModal>
      </OverlayModal>
    </ContainerModal>
  );
};
