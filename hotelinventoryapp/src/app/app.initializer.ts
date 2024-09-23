import { InitService } from './init.service';

export function initializeApp(initService: InitService) {
  return () => initService.init();
}
