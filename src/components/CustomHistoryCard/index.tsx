import { returnAppIcons } from '../../utils/returnAppIcons';
import {
  CustomContentHistoryCard,
  ContentCustomHistoryCardRow,
  ContentCustomHistoryCardCollum,
  CustomHistoryCardText,
  CustomHistoryCardArrow,
} from './styles';

interface ICustomHistoryCard {
  id: string;
  vehicle: string;
  route: string;
  line: string;
  collectDate: string;
  handleCollectInformation?: () => void;
}

export const CustomHistoryCard = ({
  collectDate,
  id,
  line,
  route,
  vehicle,
  handleCollectInformation,
}: ICustomHistoryCard) => {
  const item = [
    { value: id, field: 'N° da Coleta:' },
    { value: vehicle, field: 'Veículo:' },
    { value: route, field: 'Rota:' },
    { value: line, field: 'Linha:' },
  ];

  return (
    <CustomContentHistoryCard onPress={handleCollectInformation}>
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
            {collectDate}
          </CustomHistoryCardText>
        </ContentCustomHistoryCardRow>
      </ContentCustomHistoryCardCollum>
      {returnAppIcons({ icon: 'search', size: 20 })}
    </CustomContentHistoryCard>
  );
};
