import { InitService } from './init.service';

// This function is used in APP_INITIALIZER to run InitService.init()
export function initializeApp(initService: InitService): () => Promise<void> {
  return () => initService.init(); // Ensure APP_INITIALIZER waits for this promise to resolve
}
