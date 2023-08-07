import ReactNativeForegroundService from '@supersami/rn-foreground-service';

const task = {
  id: 1,
  icon: 'ic_launcher',
  title: 'Meta Coleta ',
  message:
    'Você esta fazendo uma coleta com a meta \n🚚 Estamos te acompanhando durante o trajeto!',
};

const notificationService = () => {
  ReactNativeForegroundService.start(task);
};

export { notificationService, task };
