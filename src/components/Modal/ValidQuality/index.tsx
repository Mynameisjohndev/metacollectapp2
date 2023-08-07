import React, { Dispatch, SetStateAction } from 'react';

import { CustomAlert } from '../CustomAlert';

interface IValidQuality {
  isOpen: boolean;
  modalType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  handleNavigate: () => void;
  openModal: () => void;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  messages: string[];
}

export const ValidQuality = ({
  isOpen,
  modalType,
  handleNavigate,
  openModal,
  setLoading,
  messages,
}: IValidQuality) => {
  const closeModalAndFillData = () => {
    openModal();
    setLoading(false);
  };

  return isOpen ? (
    <CustomAlert
      body={messages[modalType]}
      animationType="fade"
      icon={modalType <= 5 ? 0 : modalType === 6 ? 1 : 2}
      hasActionButton={
        modalType <= 5
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
