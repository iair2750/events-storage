import { NestApplicationOptions } from '@nestjs/common';

export interface IAppConfig {
  getPort: () => number;
  getOptions: () => NestApplicationOptions | undefined;
}
