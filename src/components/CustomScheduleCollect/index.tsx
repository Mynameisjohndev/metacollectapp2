import { IScheduleCollect } from '../../types/scheduleCollect';
import { formatDate } from '../../utils/formatDate';
import { returnAppIcons } from '../../utils/returnAppIcons';
import {
  CustomContentHistoryCard,
  ContentCustomHistoryCardRow,
  ContentCustomHistoryCardCollum,
  CustomHistoryCardText,
} from './styles';

export const CustomScheduleCollect = (collect: IScheduleCollect) => {
  const {
    DFIDCOLETAAPP,
    DFPLACAVEICULO,
    DFDESCREGIONAL,
    DFNOMELINHA,
    DFDATAPROGRAMADA,
  } = collect;

  const item = [
    { value: DFIDCOLETAAPP, field: 'N° da Coleta:' },
    { value: DFPLACAVEICULO, field: 'Veículo:' },
    { value: DFDESCREGIONAL, field: 'Rota:' },
    { value: DFNOMELINHA, field: 'Linha:' },
  ];

  return (
    <CustomContentHistoryCard>
      <ContentCustomHistoryCardCollum>
        {item.map((i, index) => {
          const { field, value } = i;
          return (
            <CustomHistoryCardText isPrimary={true} key={index}>
              {field}{' '}
              <CustomHistoryCardText isPrimary={false}>
                {value}
              </CustomHistoryCardText>
            </CustomHistoryCardText>
          );
        })}
        <ContentCustomHistoryCardRow style={{ alignItems: 'center' }}>
          {returnAppIcons({ icon: 'data', size: 20 })}

          <CustomHistoryCardText isPrimary={false}>
            {' '}
            {formatDate(String(DFDATAPROGRAMADA))}
          </CustomHistoryCardText>
        </ContentCustomHistoryCardRow>
      </ContentCustomHistoryCardCollum>
    </CustomContentHistoryCard>
  );
};
