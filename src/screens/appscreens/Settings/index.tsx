import { useEffect, useState } from 'react';
import Share from 'react-native-share';

import { CustomButtonOption } from '../../../components/Buttons/CustomButtonOption';
import { CustomHalfButton } from '../../../components/Buttons/CustomHalfButton';
import { CustomSettingOptionItem } from '../../../components/CustomSettingOptionItem';
import {
  Container,
  Content,
  CustomScrollView,
  Title,
} from '../../../components/global';
import { ValidSaveConfig } from '../../../components/Modal/ValidSaveConfig';
import { wagonerContext } from '../../../context/wagonerContext';
import { useWagonerSettingsContext } from '../../../context/wagonerSettingsContext';
import themes from '../../../themes';
import { getDocument } from '../../../utils/getDocument';
import { validConfigMesseges } from '../../../utils/messages';
import { returnAppIcons } from '../../../utils/returnAppIcons';
import { openAppSettings } from '../../../utils/validTaskPermissions';
import { CustomListPermission } from './components/CustomListPermission';
import { permissionsApp, settingColletOptions } from './options';
import { handleOpenModalConfig, openModal } from './services';
import { CustomSettingsScrollView } from './styles';

const Settings = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<0 | 1 | 2 | 3>();
  const [typeConfig, setType] = useState<'save' | 'restore'>();
  const [loading, setLoading] = useState<boolean>();
  const [hasCalledModal, setHasCalledModal] = useState(true);

  const { handleSignout, wagoner } = wagonerContext();

  const [dbUri, setDbUri] = useState(
    'file:///data/user/0/com.metacollect/databases/meta_collect.db',
  );

  const { hasRuleBack, hasDischarge, hasQuality } = useWagonerSettingsContext();

  // const [loading, setLoading] = useState(false);

  const handleShareDocument = async () => {
    const shareOptions = {
      message: 'Enviando backup do meu App',
      url: dbUri,
    };
    try {
      await Share.open(shareOptions);
    } catch (_) {
      // console.log('Error => ', error);
    }
  };

  const handleLoadArchive = async () => {
    const mydoc = await getDocument();
    console.log(mydoc);
  };

  useEffect(() => {
    if (!hasCalledModal) {
      handleOpenModalConfig({
        isOpen,
        setIsOpen,
        setModalType,
        setType,
        typeConfig: 'save',
      });
    } else {
      setHasCalledModal(false);
    }
  }, [hasDischarge, hasRuleBack, hasQuality]);

  return (
    <Container>
      <CustomScrollView>
        <Content
          style={{
            marginBottom: 16,
          }}
        >
          <Title>Permissões do App</Title>
          <CustomListPermission data={permissionsApp} />
        </Content>

        <Content
          style={{
            marginBottom: 16,
          }}
        >
          <Title>Configurações de coleta</Title>
          <CustomSettingsScrollView>
            {settingColletOptions.map((option, key) => {
              return <CustomSettingOptionItem {...{ option, key }} />;
            })}
            <CustomHalfButton
              selectColor="secondary"
              title="Restaurar"
              onPress={() =>
                handleOpenModalConfig({
                  isOpen,
                  setIsOpen,
                  setModalType,
                  setType,
                  typeConfig: 'restore',
                })
              }
            />
          </CustomSettingsScrollView>
        </Content>

        <Content>
          <Title>Opções adicionais</Title>
          <CustomButtonOption
            onPress={openAppSettings}
            title="Abrir configurações"
            iconButton={returnAppIcons({
              icon: 'settings-user',
              color: themes.COLORS.WHITE,
              size: 25,
            })}
          />

          <CustomButtonOption
            onPress={handleShareDocument}
            title="Enviar backup"
            iconButton={returnAppIcons({
              icon: 'database',
              color: themes.COLORS.WHITE,
              size: 25,
            })}
          />
          <CustomButtonOption
            onPress={() =>
              handleSignout({
                DFIDCARRETEIRO: Number(wagoner.DFIDCARRETEIRO),
              })
            }
            selectColor="primary"
            title="Sair"
            iconButton={returnAppIcons({
              icon: 'signout',
              color: themes.COLORS.WHITE,
              size: 25,
            })}
          />
        </Content>
      </CustomScrollView>
      <ValidSaveConfig
        {...{
          isOpen,
          modalType,
          messages: validConfigMesseges,
          openModal: () => openModal({ isOpen, setIsOpen }),
          setLoading,
          handleNavigate: () => null,
          type: typeConfig,
        }}
      />
    </Container>
  );
};

export { Settings };
