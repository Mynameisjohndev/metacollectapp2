import { ReactNode } from 'react';

import { InfoCollectContext } from './InfoCollectContext';
import { UserProviderContext } from './wagonerContext';
import { WagonerSettingsProviderContext } from './wagonerSettingsContext';

interface IAppContextProvider {
  children: ReactNode;
}

const AppContextProvider = ({ children }: IAppContextProvider) => {
  return (
    <UserProviderContext>
      <InfoCollectContext>
        <WagonerSettingsProviderContext>
          {children}
        </WagonerSettingsProviderContext>
      </InfoCollectContext>
    </UserProviderContext>
  );
};

export { AppContextProvider };
