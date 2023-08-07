import { transparentize } from 'polished';
import { Dispatch, SetStateAction } from 'react';

import { IItems } from '.';

import { ICustomTankOption } from '..';

import themes from '../../../themes';
import { CollectItem } from '../../../types/collectItem';
import { ProducerCollect } from '../../../types/producerCollect';

interface IValidTimeLineItens {
  collectItem: CollectItem;
  producersCollects: ProducerCollect[];
  options?: ICustomTankOption[];
  setItems?: Dispatch<SetStateAction<IItems[]>>;
}

const validTimeLineItens = ({
  collectItem,
  options,
  setItems,
  producersCollects,
}: IValidTimeLineItens) => {
  if (collectItem !== undefined) {
    const {
      DFQTDPREVISTA,
      DFREGUAFRENTE,
      DFALIZAROL,
      DFTEMPERATURA,
      DFREGUAATRAS,
      DFQTDCOLETADA,
    } = collectItem!;
    let newItens: IItems[] = [];
    for (let index in options) {
      const { id } = options[index];
      // VOLUME
      if (DFQTDPREVISTA && id === 1 && Number(DFQTDPREVISTA) > 0) {
        newItens.push({
          key: id,
          color: themes.COLORS.SECONDARY,
        });
      } else if (!DFQTDPREVISTA && id === 1) {
        newItens.push({
          key: id,
          color: transparentize(0.6, themes.COLORS.GREY),
        });
      }

      // QUALIDADE
      if (DFALIZAROL && id === 2) {
        newItens.push({
          key: id,
          color: themes.COLORS.SECONDARY,
        });
      } else if (!DFALIZAROL && id === 2) {
        newItens.push({
          key: id,
          color: transparentize(0.6, themes.COLORS.GREY),
        });
      }
      // TEMPERATURA
      if (id === 3 && Number(DFTEMPERATURA) >= 0 && DFTEMPERATURA !== null) {
        newItens.push({
          key: id,
          color: themes.COLORS.SECONDARY,
        });
      } else if (!DFTEMPERATURA && id === 3) {
        newItens.push({
          key: id,
          color: transparentize(0.6, themes.COLORS.GREY),
        });
      }
      // PRIMEIRA REGUA
      if (DFREGUAFRENTE && id === 4 && Number(DFREGUAFRENTE) > 0) {
        newItens.push({
          key: id,
          color: themes.COLORS.SECONDARY,
        });
      } else if (!DFREGUAFRENTE && id === 4) {
        newItens.push({
          key: id,
          color: transparentize(0.6, themes.COLORS.GREY),
        });
      }

      // SEGUNDA REGUA
      if (DFREGUAATRAS && id === 5 && Number(DFREGUAATRAS) > 0) {
        newItens.push({
          key: id,
          color: themes.COLORS.SECONDARY,
        });
      } else if (!DFREGUAATRAS && id === 5) {
        newItens.push({
          key: id,
          color: transparentize(0.6, themes.COLORS.GREY),
        });
      }

      // ARMAZENAR
      if (DFQTDCOLETADA && id === 6 && Number(DFQTDCOLETADA) > 0) {
        newItens.push({
          key: id,
          color: themes.COLORS.SECONDARY,
        });
      } else if (!DFQTDCOLETADA && id === 6) {
        newItens.push({
          key: id,
          color: transparentize(0.6, themes.COLORS.GREY),
        });
      }

      // DISTRIBUIR;
      let countProducers = 0;
      if (id === 7 && producersCollects.length > 0) {
        for (let i in producersCollects) {
          if (Number(producersCollects[i].DFQTDENTRADA) > 0) {
            countProducers += 1;
          }
        }
        if (countProducers === 0) {
          newItens.push({
            key: id,
            color: transparentize(0.6, themes.COLORS.GREY),
          });
        } else {
          newItens.push({
            key: id,
            color: themes.COLORS.SECONDARY,
          });
        }
      } else if (producersCollects.length === 0 && id === 7) {
        newItens.push({
          key: id,
          color: transparentize(0.6, themes.COLORS.GREY),
        });
      }
    }
    setItems(newItens);
  }
};

export { validTimeLineItens };
