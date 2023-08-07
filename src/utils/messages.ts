const newCollectMessages = [
  'Você precisa preencher todos campos para iniciar uma nova coleta!', // 0
  'Sua coleta foi iniciada com sucesso, clique em "PROSSEGUIR" para acompanhar a coleta!', // 1
  'Houve um erro ao tentar iniciar sua coleta, tente novamente!', // 2
  'Houve um erro inesperado!', // 3
  'Este veículo não possui bocas cadastradas, entre em contato com a empresa!', // 4
  'Este veículo possui uma ou mais bocas sem capacidade, entre em contato com a empresa!', // 5
  'Esta região não possui linhas cadastradas, selecione uma nova região!', // 6
  'Esta linha não possui tanques cadastradas, entre em contato com a empresa!', // 7
  'Esta linha não possui vinculos de tanque cadastradas, entre em contato com a empresa!', // 8
  'A quantidade de tanques e vinculos de tanque são divergentes, entre em contato com a empresa!', // 9
  'É necessário conceder permissão de localização para iniciar uma nova coleta!', // 10
];
const newTankRescure = [
  'Você precisa preencher todos campos para iniciar o socorro!', // 0
  'O socooro foi iniciada com sucesso, clique em "PROSSEGUIR" para acompanhar a coleta!', // 1
  'Este tanque já esta vinculado em sua coleta', // 2
  'Aconteceu um erro inesperado!', // 3
  'Esta região não possui linhas cadastradas, selecione uma nova região!', // 4
  'Esta linha não possui tanques cadastradas, entre em contato com a empresa!', // 5
  'Esta linha não possui vinculos de tanque cadastradas, entre em contato com a empresa!', // 6
  'A quantidade de tanques e vinculos de tanque são divergentes, entre em contato com a empresa!', // 7,
  'Este tanque não possui vínculo com produtores, entre em contato com a empresa!', // 8
];

const distributionMessages = [
  'Você ainda possui alguns litros de leite para serem distribuidos',
  'Distribuição informada com sucesso!',
  'Houve um erro ao informar a armazenamento!',
  'Você ainda não completou todas etapas da coleta!',
  'Houve um erro ao carregar os dados!',
];

const informDistributionMessages = [
  'O volume informado não pode ser vazio',
  'Volume informado com sucesso!',
  'Você não possui volume armazenado no caminhão',
  'Houve um erro ao informar a armazenamento!',
];

const formQualityMessages = [
  'Preencha o campo exame sensorial',
  'Preencha o campo exame de alizarol',
  'Preencha o campo passou no alizarol',
  'Preencha os campo amostra de qualidade!',
  'Informe as imagens correspondentes à temperatura e à amostra.',
  'Preencha os campo amostra, lacre e as imagens correspondentes!',
  'Qualidade informada com sucesso',
  'Hove um erro inesperado!',
];

const informRulerMessages = [
  'O valor informado não pode ser nulo ou igual a zero!',
  'Régua informada com com sucesso!',
  'Houve um erro ao informar a régua!',
  'Houve um erro inesperado!',
];

const informtemperatureMessages = [
  'Você precisa preencher o campo!',
  'Temperatura informada com com sucesso!',
  'A temperatura precisa estar igual ou abaixo de 7 graus!',
  'Houve um erro ao informar a temperatura!',
  'Houve um erro inesperado!',
];

const informaVolumeMessage = [
  'Você precisa preencher o campo!',
  'Volume informada com com sucesso!',
  'Houve um erro ao informar o volume!',
  'Por favor, informe uma temperatura inferior ou igual a 7',
];

const mouthVolumeMessage = [
  'O valor informado execede a capacidade do seu tanque! Informe um valor válido.',
  'Armazenamento informado com com sucesso!',
  'Preencha o campo do volume!',
  'Houve um erro ao informar o volume da boca!',
];

const validStorageMessages = [
  'Você ainda possui alguns litros de leite para serem distribuidos',
  'Armazenamento informado com sucesso!',
  'Você precisa informar o volume primeiro!',
  'Houve um erro ao informar a armazenamento!',
];

const problemReportMessages = [
  'Você precisa preencher o campo!',
  'Qualidade informada com com sucesso',
  'Houve um erro ao informar a qualidade!',
  'Houve um erro inesperado!',
];

const validTokenMessages = [
  'Já existe um usuário autenticado!',
  'Usuário autenticado com sucesso!',
  'Erro ao validar seu Token, certifique-se que está preenchendo dados válidos!',
  'Erro, precisamos que você permita para que possamos acessar suas informações!',
];

const validLoginMessages = [
  'Você precisa aceitar as permissões para o aplicativo acessar as informações do dispositivo.',
  'Conecte-se à internet para fazer login com outro usuário ou inserir a licença.',
  'Erro ao fazer LOGIN, certifique-se que está preenchendo dados válidos!',
  'O carreteiro já esta sendo usada em outro dispositivo!',
  'CNPJ ou senha incorretos!',
];

const validFinalizeCollectMessages = [
  'Você ainda não completou todas etapas da coleta!',
  'Aconteceu um erro inesperado, favor tente novamente dentro de instantes',
  'O tanque já foi coletado.',
];

const validConfigMesseges = ['A senha que você inseriu está incorreta.'];

const validFinalizeAllCollectsMessages = [
  'Você ainda possui alguns tanques para coletar!',
  'Erro ao encerrar a coleta, tente novamente dentro de instantes!',
  'Aconteceu um erro inesperado, tente novamente dentro de instantes! ',
];

export {
  newCollectMessages,
  newTankRescure,
  distributionMessages,
  informDistributionMessages,
  formQualityMessages,
  informRulerMessages,
  informtemperatureMessages,
  informaVolumeMessage,
  mouthVolumeMessage,
  validStorageMessages,
  problemReportMessages,
  validTokenMessages,
  validLoginMessages,
  validFinalizeCollectMessages,
  validConfigMesseges,
  validFinalizeAllCollectsMessages,
};
