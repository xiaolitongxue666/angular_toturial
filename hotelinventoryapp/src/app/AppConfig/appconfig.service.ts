import {InjectionToken} from '@angular/core';
import {AppConfig} from './appconfig.interface';
import {environment} from '../../environments/environment';

export const APP_CONFIG: AppConfig = {
  aipEndpoint: environment.apiUrl,
}

// new InjectionToken<AppConfig>('app.config') 创建一个新的 InjectionToken 实例，
// 它指定了配置服务的类型为 AppConfig，并使用字符串 'app.config' 作为令牌的名称。
export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG_PROVIDER = {
  provide: APP_SERVICE_CONFIG,
  useValue: APP_CONFIG
};
