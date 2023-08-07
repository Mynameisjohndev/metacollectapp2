import { Dispatch, SetStateAction } from 'react';

import { ICustomFormButtonRef } from '../../../components/Buttons/CustomFormButton';
import { getDBConnection } from '../../../databases/conection';
import { selectScheduledCollectByInformation } from '../../../databases/TBCOLETA/SELECT/selectScheduledCollectByInformation';
import { selectSearchCollect } from '../../../databases/TBCOLETA/SELECT/selectSearchCollect';
import { countTankByCollectAppId } from '../../../databases/TBITEMCOLETA/SELECT/countTankByCollectAppId';
import { countTankByLineId } from '../../../databases/TBITEMCOLETA/SELECT/countTankByLineId';
import { selectTbLinha } from '../../../databases/TBLINHA/SELECT/selectTbLinha';
import { selectTbRegional } from '../../../databases/TBREGIONAL/SELECT/selectTbRegional';
import { selectTankVehicleByVehicleId } from '../../../databases/TBTANQUEVEICULO/SELECT/selectTankVehicleByVehicleId';
import { selectTbVeiculo } from '../../../databases/TBVEICULO/SELECT/selectTbVeiculo';
import { countBondTankByLineId } from '../../../databases/TBVINCULOTANQUE/SELECT/countBondTankByLineId';
import { counttBondTankByCollectItemId } from '../../../databases/TBVINCULOTANQUE/SELECT/counttBondTankByCollectItemId';
import { requestGpsLocation } from '../../../services/GPS/activeLocationPermissions';
import { Line } from '../../../types/line';
import { Region } from '../../../types/region';
import { Vehicle } from '../../../types/vehicle';

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setIsOpenModalLine?: Dispatch<SetStateAction<boolean>>;
}

interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  setModalType?: Dispatch<
    SetStateAction<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>
  >;
}

interface IHandleCreateNewCollect extends ISetTypeAndOpenModal {
  initialKm: string;
  selectedVehicle: Vehicle | undefined;
  selectedRegion: Region | undefined;
  selectedLine?: Line | undefined;
  vehicle: string | number;
  region: string | number;
  line: string | number;
  idCarreteiro: string | number;
  imei?: string | boolean;
  buttonRef: ICustomFormButtonRef;
}

interface IScheduledCollect extends ISetTypeAndOpenModal {
  initialKm: string;
  selectedVehicle: string | number;
  selectedRegion: string | number;
  selectedLine: string | number;
  imei: string;
  idCarreteiro: string | number;
  buttonRef: ICustomFormButtonRef;
}

interface ILoadList {
  setRegionList: Dispatch<SetStateAction<Region[]>>;
  setVehicleList: Dispatch<SetStateAction<Vehicle[]>>;
}

interface ILoadListLine {
  selectedRegion: string | number;
  setSelectedLine: Dispatch<SetStateAction<Line | undefined>>;
  setLoadingListLine: Dispatch<SetStateAction<boolean>>;
  setLineList: Dispatch<SetStateAction<Line[]>>;
  setSelectedRegion: Dispatch<SetStateAction<Region>>;
  setModalType: Dispatch<
    SetStateAction<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>
  >;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setValidationLoading: Dispatch<SetStateAction<boolean>>;
}

interface IValidVehicle {
  selectedVehicle: Vehicle;
  setModalType: Dispatch<
    SetStateAction<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>
  >;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedVehicle: Dispatch<SetStateAction<Vehicle>>;
  setValidationLoading: Dispatch<SetStateAction<boolean>>;
}

interface IValidLine {
  setValidationLoading: Dispatch<SetStateAction<boolean>>;
  selectedLine: Line;
  selectedVehicle: Vehicle;
  selectedRegion: Region;
  setModalType: Dispatch<
    SetStateAction<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>
  >;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedLine: Dispatch<SetStateAction<Line>>;
}

const handleCloseAndOpenVehicleModal = ({ setIsOpen, isOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

const handleCloseAndOpenRegionModal = ({
  setIsOpen,
  isOpen,
  setIsOpenModalLine,
}: IOpenModal) => {
  setIsOpen(!isOpen);
  setIsOpenModalLine(false);
};

const handleCloseAndOpenLineModal = ({ setIsOpen, isOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

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

const scheduledCollect = async ({
  initialKm,
  selectedRegion,
  selectedVehicle,
  selectedLine,
  imei,
  isOpen,
  idCarreteiro,
  setIsOpen,
  setModalType,
  buttonRef,
}: IScheduledCollect) => {
  const db = await getDBConnection();
  selectSearchCollect({
    db,
    DFIDVEICULO: selectedVehicle,
    DFIDREGIONAL: selectedRegion,
    DFIDLINHA: selectedLine,
    DFKMINICIAL: initialKm,
    DFIMEI: imei,
    DFIDCARRETEIRO: idCarreteiro,
  })
    .then(res => {
      if (res === true) {
        setTypeAndOpenModal({
          isOpen,
          setIsOpen,
          setModalType,
          type: 1,
        });
      } else {
        buttonRef.enableButton();
        return setTypeAndOpenModal({
          isOpen,
          setIsOpen,
          setModalType,
          type: 3,
        });
      }
    })
    .catch(() => {
      buttonRef.enableButton();
      return setTypeAndOpenModal({ isOpen, setIsOpen, setModalType, type: 3 });
    });
};

const handleCreateNewCollect = ({
  initialKm,
  selectedVehicle,
  selectedRegion,
  selectedLine,
  vehicle,
  region,
  line,
  imei,
  idCarreteiro,
  isOpen,
  setIsOpen,
  setModalType,
  buttonRef,
}: IHandleCreateNewCollect) => {
  buttonRef.disableButton();
  requestGpsLocation().then(res => {
    if (res) {
      if (
        initialKm === '' ||
        selectedVehicle === undefined ||
        selectedRegion === undefined ||
        selectedLine === undefined
      ) {
        buttonRef.enableButton();
        return setTypeAndOpenModal({
          isOpen,
          setIsOpen,
          setModalType,
          type: 0,
        });
      }
      if (imei !== false) {
        return scheduledCollect({
          initialKm,
          selectedRegion: region,
          selectedVehicle: vehicle,
          selectedLine: line,
          imei: String(imei),
          idCarreteiro,
          setIsOpen,
          setModalType,
          buttonRef,
        });
      }
    } else {
      buttonRef.enableButton();
      return setTypeAndOpenModal({
        isOpen,
        setIsOpen,
        setModalType,
        type: 10,
      });
    }
  });
  return null;
};

const loadList = async ({ setRegionList, setVehicleList }: ILoadList) => {
  const db = await getDBConnection();
  selectTbVeiculo({ db }).then(response => {
    setVehicleList(response);
  });
  selectTbRegional({ db }).then(response => {
    setRegionList(response);
  });
};

const loadListLine = async ({
  selectedRegion,
  setSelectedLine,
  setLineList,
  setLoadingListLine,
  setSelectedRegion,
  setIsOpen,
  setModalType,
  setValidationLoading,
}: ILoadListLine) => {
  setValidationLoading(true);
  setSelectedLine(undefined);
  const db = await getDBConnection();
  const lines = await selectTbLinha({
    db,
    DFIDREGIONAL: selectedRegion,
    setLoadingListLine,
  });
  if (lines.length === 0) {
    setSelectedRegion(undefined);
    setIsOpen(true);
    return setModalType(6);
  }
  setValidationLoading(false);
  return setLineList(lines);
};

const validVehicle = async ({
  selectedVehicle,
  setIsOpen,
  setModalType,
  setSelectedVehicle,
  setValidationLoading,
}: IValidVehicle) => {
  setValidationLoading(true);
  if (selectedVehicle) {
    const db = await getDBConnection();
    const vehicleTanks = await selectTankVehicleByVehicleId({
      db,
      DFIDVEICULO: Number(selectedVehicle.DFIDVEICULO),
    });
    if (vehicleTanks.length === 0) {
      setSelectedVehicle(undefined);
      setIsOpen(true);
      return setModalType(4);
    }
    let tankCount = 0;
    for (let tank in vehicleTanks) {
      const { DFCAPACIDADE } = vehicleTanks[tank];
      if (DFCAPACIDADE === 0 || DFCAPACIDADE === '') {
        tankCount += 1;
      }
    }
    if (tankCount > 0) {
      setSelectedVehicle(undefined);
      setIsOpen(true);
      return setModalType(5);
    }
    setValidationLoading(false);
  }
};

const validLine = async ({
  selectedLine,
  selectedRegion,
  selectedVehicle,
  setIsOpen,
  setModalType,
  setSelectedLine,
  setValidationLoading,
}: IValidLine) => {
  if (selectedLine && selectedRegion && selectedVehicle) {
    setValidationLoading(true);
    const db = await getDBConnection();
    const scheduledCollect = await selectScheduledCollectByInformation({
      db,
      DFIDLINHA: Number(selectedLine.DFIDLINHA),
      DFIDREGIONAL: Number(selectedRegion.DFIDREGIONAL),
      DFIDVEICULO: Number(selectedVehicle.DFIDVEICULO),
    });

    const resultValidation = (type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) => {
      setSelectedLine(undefined);
      setIsOpen(true);
      setValidationLoading(false);
      return setModalType(type);
    };

    if (scheduledCollect) {
      const { DFIDCOLETAAPP } = scheduledCollect;
      const data = {
        db,
        DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
      };

      const tank = await countTankByCollectAppId(data);
      const bondTanks = await counttBondTankByCollectItemId(data);
      if (tank === 0) {
        resultValidation(7);
      }
      if (bondTanks === 0) {
        resultValidation(8);
      }

      if (tank > bondTanks || tank < bondTanks) {
        resultValidation(9);
      }
      return setValidationLoading(false);
    }
    const data = {
      db,
      DFIDLINHA: Number(selectedLine.DFIDLINHA),
    };
    const tank = await countTankByLineId(data);
    const bondTanks = await countBondTankByLineId(data);
    // console.log({ tank, bondTanks });
    if (tank === 0) {
      resultValidation(7);
    }
    if (bondTanks === 0) {
      resultValidation(8);
    }
    if (tank > bondTanks || tank < bondTanks) {
      resultValidation(9);
    }
    return setValidationLoading(false);
  }
};

export {
  openModal,
  handleCloseAndOpenLineModal,
  handleCloseAndOpenVehicleModal,
  handleCloseAndOpenRegionModal,
  handleCreateNewCollect,
  loadList,
  loadListLine,
  validVehicle,
  validLine,
};
