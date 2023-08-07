import { Dispatch, SetStateAction } from 'react';

import { DistributionProps } from '../../routes/types/approutes/appscreen';
import { InformDistribution } from '../../types/informDistribution';

interface IHandleNavigateInformDistribution extends DistributionProps {
  setProducer: Dispatch<SetStateAction<InformDistribution>>;
  producer: InformDistribution;
}

const handleNavigateInformDistribution = async ({
  navigation,
  setProducer,
  producer,
}: IHandleNavigateInformDistribution) => {
  setProducer(producer);
  navigation.navigate('InformDistribution');
};

export { handleNavigateInformDistribution };
