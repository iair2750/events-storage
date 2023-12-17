import { NestApplicationOptions } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { IAppConfig } from './app-config.interface';
import { useEnvValue } from 'app/utils/use-env-value';

class AppConfig implements IAppConfig {
  private readonly env: NodeJS.ProcessEnv;
  constructor() {
    dotenv.config();
  }

  getPort(): number {
    const port = parseInt(useEnvValue('PORT'));
    return port;
  }

  getOptions(): NestApplicationOptions | undefined {
    return { cors: true };
  }
}

export const appConfig = new AppConfig();
