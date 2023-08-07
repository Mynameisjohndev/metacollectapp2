/* eslint-disable no-constant-condition */
import React, { Dispatch, SetStateAction } from 'react';

import { CustomAlert } from '../CustomAlert';

// 0 -> ALERTA
// 1 -> SUCESSO
// 2 e 3 -> ERRO

interface IValidModal {
  isOpen: boolean;
  modalType: 0 | 1 | 2 | 3;
  handleNavigate: () => void;
  openModal: () => void;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  messages?: string[];
}

export const ValidModal = ({
  isOpen,
  modalType,
  handleNavigate,
  openModal,
  setLoading,
  messages,
}: IValidModal) => {
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
              title: 'Preecher ',
              action: closeModalAndFillData,
            }
          : modalType === 1
          ? {
              title: 'Prosseguir',
              action: handleNavigate,
            }
          : null
      }
      hasCloseButton={true}
      onRequestClose={closeModalAndFillData}
    />
  ) : null;
};
