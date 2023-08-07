import ReactNativeForegroundService from '@supersami/rn-foreground-service';

const stopTask = async () => {
  ReactNativeForegroundService.remove_all_tasks();
  await ReactNativeForegroundService.stopAll();
};

export { stopTask };
