import { ReactNode } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import {
  ContainerCalculatorHeader,
  TextCalculatorHeader,
  TextInputCalculatorHeader,
  ViewCalculatorHeader,
} from './styles';

interface ICalculatorHeader {
  icon: string | ReactNode;
  value: string;
}
export const CalculatorHeader = ({ icon, value }: ICalculatorHeader) => {
  return (
    <ContainerCalculatorHeader>
      <ViewCalculatorHeader>
        <TextCalculatorHeader>{icon}</TextCalculatorHeader>
      </ViewCalculatorHeader>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TextInputCalculatorHeader>{value}</TextInputCalculatorHeader>
      </ScrollView>
    </ContainerCalculatorHeader>
  );
};
