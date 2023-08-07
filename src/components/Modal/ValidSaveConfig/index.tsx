import React, { Dispatch, SetStateAction } from 'react';

import { useWagonerSettingsContext } from '../../../context/wagonerSettingsContext';
import { CustomPasswordAlert } from '../CustomPasswordAlert';

interface IValidSalveConfig {
  isOpen: boolean;
  modalType: 0 | 1 | 2 | 3;
  handleNavigate: () => void;
  openModal: () => void;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  messages: string[];
  type: 'save' | 'restore';
}

export const ValidSaveConfig = ({
  isOpen,
  modalType,
  openModal,
  setLoading,
  messages,
  type,
}: IValidSalveConfig) => {
  const { returnConfig } = useWagonerSettingsContext();
  const closeModalAndFillData = async () => {
    const closeModal = await returnConfig();
    if (closeModal) {
      openModal();
      setLoading(false);
    }
  };

  return isOpen ? (
    <CustomPasswordAlert
      body={messages[modalType]}
      animationType="fade"
      action={closeModalAndFillData}
      hasCloseButton={true}
      onRequestClose={closeModalAndFillData}
      type={type}
    />
  ) : null;
};
