import { openDatabase } from 'react-native-sqlite-storage';

export const getDBConnection = async () => {
  return openDatabase({ name: 'meta_collect.db', location: 'default' });
};

// // CONEXAO COM BANCO DE CLIENTE PASTA WWW DENTRO DE ASSETS DENTRO DE ANDROID
// export const getDBConnection = async () => {
//   return openDatabase({
//     name: 'meta_collect.db',
//     createFromLocation: 1,
//   });
// };

// // CONEXAO COM BANCO DE CLIENTE QUALQUER LOCAL DO CELULAR
// export const getDBConnection = async () => {
//   return openDatabase({
//     name: 'meta_collect.db',
//     createFromLocation:
//       'content://com.android.externalstorage.documents/document/primary%3AWhatsApp%2FMedia%2FWhatsApp%20Documents%2Fmeta_collect-1.db',
//   });
// };
