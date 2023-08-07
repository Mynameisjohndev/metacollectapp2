import { useEffect, useState } from 'react';

import { ICustomTankOption } from '..';

import { CollectItem } from '../../../types/collectItem';
import { ProducerCollect } from '../../../types/producerCollect';
import { returnTimeLineIcons } from '../../../utils/returnAppIcons';
import { validTimeLineItens } from './services';
import {
  CustomTimeLineContainer,
  CustomTimeLineItem,
  CustomTimeLineItemContainer,
  CustomTimeLineSeparator,
} from './styles';

interface ICustomTimeLine {
  options: ICustomTankOption[];
  collectItem: CollectItem;
  producersCollects: ProducerCollect[];
}

export interface IItems {
  color: string;
  key: number;
}

const CustomTimeLine = ({
  options,
  collectItem,
  producersCollects,
}: ICustomTimeLine) => {
  const [items, setItems] = useState<IItems[]>([]);
  useEffect(() => {
    validTimeLineItens({
      collectItem,
      options,
      setItems,
      producersCollects,
    });
  }, []);

  return (
    <CustomTimeLineContainer>
      {items.map(({ key, color }, index) => {
        return (
          <CustomTimeLineItemContainer {...{ key }}>
            <CustomTimeLineItem {...{ color }}>
              {returnTimeLineIcons({ type: key })}
            </CustomTimeLineItem>
            {index < items.length - 1 && <CustomTimeLineSeparator />}
          </CustomTimeLineItemContainer>
        );
      })}
    </CustomTimeLineContainer>
  );
};

export { CustomTimeLine };
