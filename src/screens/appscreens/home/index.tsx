import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { CustomButtonOption } from '../../../components/Buttons/CustomButtonOption';
import { CustomConectedWagoner } from '../../../components/CustomConectedWagoner';
import { CustomLoad } from '../../../components/CustomLoad';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../components/global';
import { ModalSyncronizeApp } from '../../../components/Modal/Load';
import { useInfoCollect } from '../../../context/InfoCollectContext';
import { wagonerContext } from '../../../context/wagonerContext';
import { useWagonerSettingsContext } from '../../../context/wagonerSettingsContext';
import { getDBConnection } from '../../../databases/conection';
import { deleteTable } from '../../../databases/select/delete/deleteTable';
import { selectAll } from '../../../databases/select/selectAll';
import { selectCollecItemOfAScheduledCollect } from '../../../databases/TBITEMCOLETA/SELECT/selectCollecItemOfAScheduledCollect';
import { HomeProps } from '../../../routes/types/approutes/appscreen';
import { gpsTask } from '../../../services/Task/gps';
import { notificationService } from '../../../services/Task/notificationService';
import { collectTask } from '../../../services/Task/updateCollect';
import { Collect } from '../../../types/collect';
import { returnOfImeiPermission } from '../../../utils/readPhoneStatePermission';
import { requestDeviceInformation } from '../../../utils/requestDeviceInformation';
import { returnAppIcons, returnHomeIcons } from '../../../utils/returnAppIcons';
import { validTaskPermissions } from '../../../utils/validTaskPermissions';
import {
  executeGetOpenCollect,
  handleNavigateHistoric,
  handleNavigateMyCollect,
  handleNavigateNewCollect,
  handleNavigateSchedules,
  handleNavigateSettings,
  handleSynchronizeApp,
} from './services';
import { CustomListUserOptions } from './styles';

export const Home = (screen: HomeProps) => {
  const [selectedCollect, setSelectedCollect] = useState<Collect[]>([]);
  const [dischargeCollects, setDischargeCollects] = useState<Collect[]>([]);
  const [loadingCollect, setLoadingCollect] = useState<boolean>(true);
  const [DFIMEI, setDFIMEI] = useState<string>();
  const { wagoner, setLoadWagonerMessage, signoutWagoner } = wagonerContext();
  const { daysBefore } = useWagonerSettingsContext();
  const { setCollect } = useInfoCollect();

  const [visible, setVisible] = useState(false);

  const remove = async () => {
    const db = await getDBConnection();
    // deleteTable({ db, table: 'TBREGISTRO' });
    // selectAll({ db, table: 'TBCOLETA' });
  };

  useEffect(() => {
    remove();
  }, []);

  useEffect(() => {
    returnOfImeiPermission().then(res => {
      setDFIMEI(String(res));
    });
  }, []);

  useEffect(() => {
    if (selectedCollect.length > 0) {
      validTaskPermissions().then(status => {
        if (status === true) {
          setCollect(selectedCollect);
          notificationService();
          gpsTask({
            DFIDCOLETAAPP: selectedCollect[0].DFIDCOLETAAPP,
            DFIDCARRETEIRO: wagoner.DFIDCARRETEIRO,
          });
          collectTask({
            collect: selectedCollect[0],
            DFIDCARRETEIRO: wagoner.DFIDCARRETEIRO,
            daysBefore,
            DFIMEI,
            signoutWagoner,
          });
          return null;
        }
        return null;
      });
    }
  }, [selectedCollect]);

  const synchronizeData = {
    collect: selectedCollect,
    dischargeCollects,
    DFIDCARRETEIRO: wagoner.DFIDCARRETEIRO,
    setSelectedCollect,
    setVisible,
    setLoadWagonerMessage,
    daysBefore,
    DFIMEI,
    signoutWagoner,
  };

  useFocusEffect(
    useCallback(() => {
      executeGetOpenCollect({
        setDischargeCollects,
        setLoadingCollect,
        setSelectedCollect,
        setCollect,
        synchronizeData,
        DFIMEI,
        DFIDCARRETEIRO: Number(wagoner.DFIDCARRETEIRO),
      });
    }, []),
  );

  const Header = () => {
    return (
      <Content style={{ alignItems: 'flex-start', marginBottom: 16 }}>
        <Title>Carreteiro</Title>
        <CustomConectedWagoner
          iconUser={returnAppIcons({ icon: 'wagoner' })}
          name={wagoner.DFNOMECARRETEIRO}
        />
      </Content>
    );
  };

  return (
    <Container>
      {loadingCollect ? (
        <CustomLoad text="Carregando dados" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flexGrow: 0 }}
        >
          <Header />
          <Content>
            <CustomScrollView>
              <Title>Opções</Title>
              <CustomListUserOptions>
                <CustomButtonOption
                  onPress={() =>
                    handleNavigateMyCollect({
                      screen,
                      collect: selectedCollect,
                    })
                  }
                  title="Minha coleta"
                  iconButton={returnHomeIcons({ icon: 'mycollect' })}
                  enabled={selectedCollect.length !== 0}
                />
                <CustomButtonOption
                  onPress={() => handleNavigateNewCollect(screen)}
                  title="Nova coleta"
                  iconButton={returnHomeIcons({ icon: 'newcollect' })}
                  enabled={selectedCollect.length === 0}
                />
                <CustomButtonOption
                  title="Programação"
                  iconButton={returnHomeIcons({ icon: 'schedules' })}
                  onPress={() => handleNavigateSchedules(screen)}
                />
                <CustomButtonOption
                  title="Histórico"
                  iconButton={returnHomeIcons({ icon: 'history' })}
                  onPress={() => handleNavigateHistoric(screen)}
                />
                <CustomButtonOption
                  title="Sincronizar"
                  iconButton={returnHomeIcons({ icon: 'synchronize' })}
                  onPress={() => handleSynchronizeApp(synchronizeData)}
                />
                <CustomButtonOption
                  title="Configuração"
                  iconButton={returnHomeIcons({ icon: 'settings' })}
                  onPress={() => handleNavigateSettings(screen)}
                />
              </CustomListUserOptions>
            </CustomScrollView>
            <ModalSyncronizeApp visible={visible} />
          </Content>
        </ScrollView>
      )}
    </Container>
  );
};
