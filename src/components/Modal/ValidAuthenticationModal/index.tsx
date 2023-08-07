/* eslint-disable no-constant-condition */
import React, { Dispatch, SetStateAction } from 'react';

import { CustomAlert } from '../CustomAlert';

interface IButtonModal {
  hasButton: boolean;
  title: string;
  action: () => void;
}

interface IValidAuthenticationModal {
  isOpen: boolean;
  modalType: 0 | 1 | 2 | 3;
  handleNavigate: () => void;
  openModal: () => void;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  messages?: string[];
  buttonName: string[];
}

export const ValidAuthenticationModal = ({
  isOpen,
  modalType,
  handleNavigate,
  openModal,
  setLoading,
  messages,
  buttonName,
}: IValidAuthenticationModal) => {
  const closeModalAndFillData = () => {
    setLoading(false);
    if (modalType === 1) {
      handleNavigate();
    }
    openModal();
  };

  return isOpen ? (
    <CustomAlert
      body={messages[modalType]}
      animationType="fade"
      icon={modalType}
      hasActionButton={
        modalType === 0
          ? {
              title: buttonName[0],
              action: closeModalAndFillData,
            }
          : modalType === 1
          ? {
              title: buttonName[1],
              action: handleNavigate,
            }
          : null
      }
      hasCloseButton={true}
      onRequestClose={closeModalAndFillData}
    />
  ) : null;
};
