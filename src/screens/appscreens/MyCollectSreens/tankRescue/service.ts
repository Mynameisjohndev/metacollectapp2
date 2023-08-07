import { Dispatch, SetStateAction } from 'react';

import { ICustomFormButtonRef } from '../../../../components/Buttons/CustomFormButton';
import { getDBConnection } from '../../../../databases/conection';
import { insertCollectItem } from '../../../../databases/TBITEMCOLETA/INSERT/appTbItemColeta';
import { countTankByLineId } from '../../../../databases/TBITEMCOLETA/SELECT/countTankByLineId';
import { validItemCollect } from '../../../../databases/TBITEMCOLETA/SELECT/tankRescuse/validItemCollect';
import { selectTbLinha } from '../../../../databases/TBLINHA/SELECT/selectTbLinha';
import { searchInformationAndCreateCollectProducer } from '../../../../databases/TBPRODUTORCOLETA/SELECT/searchInformationAndCreateCollectProducer';
import { selectTbRegional } from '../../../../databases/TBREGIONAL/SELECT/selectTbRegional';
import { selectAllTanks } from '../../../../databases/TBTANQUE/SELECT/selectAllTanks';
import { selectTankById } from '../../../../databases/TBTANQUE/SELECT/selectTankById';
import { selectTankRescue } from '../../../../databases/TBTANQUE/SELECT/selectTankRescue';
import { countBondTankByLineId } from '../../../../databases/TBVINCULOTANQUE/SELECT/countBondTankByLineId';
import { validExisTankBond } from '../../../../databases/TBVINCULOTANQUE/SELECT/validExisTankBond';
import { TankRescueProps } from '../../../../routes/types/approutes/appscreen';
import { FoundReadTank } from '../../../../types/foundReadTank';
import { Line } from '../../../../types/line';
import { Region } from '../../../../types/region';
import { Tank } from '../../../../types/tank';
import { tankListItem } from '../../../../types/tankListItem';

interface IOpenModal {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setIsOpenModalLine?: Dispatch<SetStateAction<boolean>>;
}

interface ISetTypeAndOpenModal extends IOpenModal {
  type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  setModalType?: Dispatch<
    SetStateAction<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>
  >;
}

interface ILoadListRegional {
  setRegionList: Dispatch<SetStateAction<Region[]>>;
}
interface ILoadListLine {
  selectedRegion: string | number;
  setSelectedLine: Dispatch<SetStateAction<Line | undefined>>;
  setSelectedTank: Dispatch<SetStateAction<Tank | undefined>>;
  setLoadingListLine: Dispatch<SetStateAction<boolean>>;
  setLineList: Dispatch<SetStateAction<Line[]>>;
  setSelectedRegion: Dispatch<SetStateAction<Region>>;
  setValidSelectedRegion: Dispatch<SetStateAction<boolean>>;
  setModalType: Dispatch<SetStateAction<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setValidationLoading: Dispatch<SetStateAction<boolean>>;
}

interface IValidLine {
  setValidationLoading: Dispatch<SetStateAction<boolean>>;
  setValidSelectedLine: Dispatch<SetStateAction<boolean>>;
  setTankList: Dispatch<SetStateAction<Tank[]>>;
  selectedLine: Line;
  selectedRegion: Region;
  setModalType: Dispatch<SetStateAction<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedLine: Dispatch<SetStateAction<Line>>;
}

interface IHandleTankRescue extends ISetTypeAndOpenModal, TankRescueProps {
  // selectedRegion: Region | undefined;
  // selectedLine?: Line | undefined;
  selectedTank?: Tank | undefined;
  setSelectedTank: Dispatch<SetStateAction<Tank>>;
  setLoadingTankRescuse: Dispatch<SetStateAction<boolean>>;
  DFIDCOLETAAPP: number;
  ref: ICustomFormButtonRef;
}

interface IGetReadTankInformation {
  setLoadingReadTank: Dispatch<SetStateAction<boolean>>;
  setSelectedTank: Dispatch<SetStateAction<Tank>>;
  DFIDTANQUE: number;
}

interface ILloadTanks {
  setLoadingListTank: Dispatch<SetStateAction<boolean>>;
  setTankList: Dispatch<SetStateAction<Tank[]>>;
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

// const handleCloseAndOpenRegionModal = ({
//   setIsOpen,
//   isOpen,
//   setIsOpenModalLine,
// }: IOpenModal) => {
//   setIsOpen(!isOpen);
//   setIsOpenModalLine(false);
// };

// const handleCloseAndOpenLineModal = ({ setIsOpen, isOpen }: IOpenModal) => {
//   setIsOpen(!isOpen);
// };

const handleCloseAndOpenTankModal = ({ setIsOpen, isOpen }: IOpenModal) => {
  setIsOpen(!isOpen);
};

// const loadListRegional = async ({ setRegionList }: ILoadListRegional) => {
//   const db = await getDBConnection();
//   selectTbRegional({ db }).then(response => {
//     setRegionList(response);
//   });
// };

// const loadListLine = async ({
//   selectedRegion,
//   setSelectedLine,
//   setSelectedTank,
//   setLineList,
//   setLoadingListLine,
//   setValidSelectedRegion,
//   setSelectedRegion,
//   setIsOpen,
//   setModalType,
//   setValidationLoading,
// }: ILoadListLine) => {
//   setValidationLoading(true);
//   setSelectedLine(undefined);
//   setSelectedTank(undefined);
//   const db = await getDBConnection();
//   const lines = await selectTbLinha({
//     db,
//     DFIDREGIONAL: selectedRegion,
//     setLoadingListLine,
//   });
//   if (lines.length === 0) {
//     setSelectedRegion(undefined);
//     setValidSelectedRegion(true);
//     setIsOpen(true);
//     return setModalType(4);
//   }
//   setValidSelectedRegion(false);
//   setValidationLoading(false);
//   return setLineList(lines);
// };

// const validLine = async ({
//   selectedLine,
//   selectedRegion,
//   setIsOpen,
//   setModalType,
//   setSelectedLine,
//   setValidSelectedLine,
//   setValidationLoading,
//   setTankList,
// }: IValidLine) => {
//   if (selectedLine && selectedRegion) {
//     setValidationLoading(true);
//     setValidSelectedLine(true);
//     const db = await getDBConnection();

//     const resultValidation = (type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) => {
//       setSelectedLine(undefined);
//       setIsOpen(true);
//       setValidationLoading(false);
//       return setModalType(type);
//     };
//     const data = {
//       db,
//       DFIDLINHA: Number(selectedLine.DFIDLINHA),
//     };

//     const tank = await countTankByLineId(data);
//     const bondTanks = await countBondTankByLineId(data);
//     if (tank === 0) {
//       resultValidation(5);
//     }
//     if (bondTanks === 0) {
//       resultValidation(6);
//     }
//     if (tank > bondTanks || tank < bondTanks) {
//       resultValidation(7);
//     }
//     if (tank === bondTanks) {
//       selectTankRescue(data).then(res => {
//         setTankList(res);
//       });
//     }

//     return setValidationLoading(false);
//   }
// };

const handleTankRescue = async ({
  selectedTank,
  isOpen,
  setLoadingTankRescuse,
  setIsOpen,
  setModalType,
  DFIDCOLETAAPP,
  navigation,
  setSelectedTank,
  ref,
}: IHandleTankRescue) => {
  const { disableButton, enableButton } = ref;
  disableButton();
  setLoadingTankRescuse(true);
  const db = await getDBConnection();
  if (selectedTank === undefined) {
    setLoadingTankRescuse(false);
    enableButton();
    return setTypeAndOpenModal({
      isOpen,
      setIsOpen,
      setModalType,
      type: 0,
    });
  }

  return validItemCollect({
    db,
    DFIDCOLETAAPP,
    DFIDTANQUE: selectedTank.DFIDTANQUE,
  }).then(async res => {
    if (res) {
      setLoadingTankRescuse(false);
      enableButton();
      setSelectedTank(undefined);
      return setTypeAndOpenModal({
        isOpen,
        setIsOpen,
        setModalType,
        type: 2,
      });
    }
    const { DFIDTANQUE } = selectedTank;
    validExisTankBond({ db, DFIDTANQUE })
      .then(async res => {
        if (res === true) {
          const resultInsert = await insertCollectItem({
            db,
            DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
            DFIDTANQUE,
            DFTIPOITEMCOLETA: 'S',
          });
          const { created, DFIDITEMCOLETAAPP } = resultInsert;
          if (created === true) {
            await searchInformationAndCreateCollectProducer({
              db,
              DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
              DFIDITEMCOLETAAPP,
            })
              .then(res => {
                if (res) {
                  setLoadingTankRescuse(false);
                  return navigation.replace('StartCollect', {
                    idCollect: DFIDCOLETAAPP,
                  });
                }
              })
              .catch(() => {
                enableButton();
                return setTypeAndOpenModal({
                  isOpen,
                  setIsOpen,
                  setModalType,
                  type: 3,
                });
              });
          }
        } else {
          enableButton();
          return setTypeAndOpenModal({
            isOpen,
            setIsOpen,
            setModalType,
            type: 8,
          });
        }
      })
      .catch(() => {
        enableButton();
        return setTypeAndOpenModal({
          isOpen,
          setIsOpen,
          setModalType,
          type: 3,
        });
      });
  });
};

const getReadTankInformation = async ({
  DFIDTANQUE,
  setLoadingReadTank,
  setSelectedTank,
}: IGetReadTankInformation) => {
  setLoadingReadTank(true);
  const db = await getDBConnection();
  selectTankById({ db, DFIDTANQUE })
    .then(res => {
      setSelectedTank(res);
      setLoadingReadTank(false);
    })
    .catch(() => {
      setLoadingReadTank(false);
    });
};

const loadTanks = async ({ setLoadingListTank, setTankList }: ILloadTanks) => {
  const db = await getDBConnection();
  setLoadingListTank(true);
  selectAllTanks({ db })
    .then(res => {
      setTankList(res);
      setLoadingListTank(false);
    })
    .catch(() => {
      setLoadingListTank(false);
    });
};

export {
  handleCloseAndOpenTankModal,
  openModal,
  handleTankRescue,
  getReadTankInformation,
  loadTanks,
};
