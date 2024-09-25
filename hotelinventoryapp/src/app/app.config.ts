import {APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import { requestInterceptor } from './request.interceptor';
import { InitService } from './init.service'; // Import your InitService
import { initializeApp } from './app.initializer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Import the initializer function

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([requestInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [InitService],
      multi: true
    }, provideAnimationsAsync()
  ]
};
