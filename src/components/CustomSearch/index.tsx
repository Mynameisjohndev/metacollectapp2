import React, { Dispatch, SetStateAction } from 'react';

import Search from '../../assets/search.svg';
import { returnAppIcons } from '../../utils/returnAppIcons';
import { ContainerCutomSearch, ContainerCutomTextInput } from './style';

interface ICustomSearch {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const CustomSearch = ({ setValue, value }: ICustomSearch) => {
  return (
    <ContainerCutomSearch>
      <ContainerCutomTextInput
        {...{
          placeholder: 'Pesquisar',
          onChangeText: setValue,
          value,
        }}
      />
      {returnAppIcons({ icon: 'search', size: 18 })}
    </ContainerCutomSearch>
  );
};
