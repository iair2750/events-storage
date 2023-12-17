import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface IDBConfig {
  getConfig: () => TypeOrmModuleOptions;
}
