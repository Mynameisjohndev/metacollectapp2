import { DistributionProps } from '../../routes/types/approutes/appscreen';

interface IHandleNavigateInformDistribution extends DistributionProps {
  idCollect: string | number;
  idCollectItem: string | number;
  idProprietario: string | number;
  volume: string | number;
}

const handleNavigateInformDistribution = ({
  navigation,
  idCollect,
  idCollectItem,
  idProprietario,
  volume,
}: IHandleNavigateInformDistribution) => {
  navigation.navigate('InformDistribution', {
    data: {
      idCollect,
      idCollectItem,
      idProprietario,
      volume,
    },
  });
};

export { handleNavigateInformDistribution };
