import { Alert } from 'react-native';
import Doc from 'react-native-document-picker';

interface IDocumentPicked {
  name?: string;
  size?: number;
  uri?: string;
  type?: string;
  fileCopyUri?: string;
}

const getDocument = async () => {
  try {
    const res = await Doc.pick({
      type: [Doc.types.allFiles],
    });
    const { uri } = res[0];
    if (uri.slice(-3) !== '.db') {
      return Alert.alert(
        'Erro ao carregar arquivo',
        'Não é possível carregar este tipo de arquivo, arquivo não suportado!',
      );
    }
    const doc: IDocumentPicked = res[0];
    return doc;
  } catch (error) {
    return error;
  }
};

export { getDocument };
