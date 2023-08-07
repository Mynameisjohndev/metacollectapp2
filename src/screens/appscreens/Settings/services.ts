import { Dispatch, SetStateAction } from 'react';

import { updateTbConfiguracao } from '../../../databases/TBCONFIGURACAO/UPDATE/updateTbConfiguracao';

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}
interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3;
  setModalType?: Dispatch<SetStateAction<0 | 1 | 2 | 3>>;
}

interface IHandleSaveConfig extends ISetTypeAndOpenModal {
  updateConfig?: () => void;
  setType: Dispatch<SetStateAction<'save' | 'restore'>>;
  typeConfig?: 'save' | 'restore';
}
const openModal = ({ setIsOpen, isOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

const setTypeAndOpenModal = ({
  isOpen,
  setIsOpen,
  type,
  setModalType,
}: ISetTypeAndOpenModal) => {
  setModalType(type);
  openModal({ isOpen, setIsOpen });
};

const handleOpenModalConfig = async ({
  isOpen,
  setIsOpen,
  setModalType,
  setType,
  typeConfig,
}: IHandleSaveConfig) => {
  setType(typeConfig);
  setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 0 });
};

export { openModal, handleOpenModalConfig };
