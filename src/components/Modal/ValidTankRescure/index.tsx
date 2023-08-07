/* eslint-disable no-constant-condition */
import React, { Dispatch, SetStateAction } from 'react';

import { CustomAlert } from '../CustomAlert';

interface IValidTankRescure {
  isOpen: boolean;
  modalType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  handleNavigate: () => void;
  openModal: () => void;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  messages: string[];
}

export const ValidTankRescure = ({
  isOpen,
  modalType,
  handleNavigate,
  openModal,
  setLoading,
  messages,
}: IValidTankRescure) => {
  const closeModalAndFillData = () => {
    openModal();
    setLoading(false);
  };

  const modalValidation =
    modalType > 3
      ? 0
      : modalType === 0
      ? 0
      : modalType === 1
      ? 1
      : modalType === 2 || 3
      ? 2
      : null;

  return isOpen ? (
    <CustomAlert
      body={messages[modalType]}
      animationType="fade"
      icon={modalValidation}
      hasActionButton={
        modalValidation === 0
          ? {
              title: 'Preecher',
              action: closeModalAndFillData,
            }
          : modalValidation === 1
          ? {
              title: 'Prosseguir',
              action: handleNavigate,
            }
          : null
      }
      hasCloseButton={true}
      onRequestClose={
        modalValidation === 1 ? handleNavigate : closeModalAndFillData
      }
    />
  ) : null;
};
