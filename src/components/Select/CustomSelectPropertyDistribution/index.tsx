import React, { Dispatch, SetStateAction } from 'react';

import { Property } from '../../../types/property';
import CustomFormButton, {
  ICustomFormButtonRef,
} from '../../Buttons/CustomFormButton';
import { CustomSelectProperty } from '../../Modal/CustomSelectProperty';

interface ICustomSelectProperty {
  closeAndOpenLineModal: () => void;
  setLoadingNewProperty: Dispatch<SetStateAction<boolean>>;
  propertyList: Property[];
  isOpenModalProperty: boolean;
  loadingListProperty: boolean;
}

export const CustomAddProperty = ({
  closeAndOpenLineModal,
  propertyList,
  setLoadingNewProperty,
  isOpenModalProperty,
  loadingListProperty,
}: ICustomSelectProperty) => {
  const RenderSelectPropertyModal = () => {
    return isOpenModalProperty ? (
      <CustomSelectProperty
        loadingListProperty={loadingListProperty}
        setLoadingNewProperty={setLoadingNewProperty}
        propertyList={propertyList}
        visible={isOpenModalProperty}
        onRequestClose={closeAndOpenLineModal}
      />
    ) : null;
  };

  return (
    <>
      <CustomFormButton
        onPress={() => closeAndOpenLineModal()}
        title={'Novo produtor'}
        selectColor="secondary"
      />
      <RenderSelectPropertyModal />
    </>
  );
};
