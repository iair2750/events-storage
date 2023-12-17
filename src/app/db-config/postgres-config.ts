import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { IDBConfig } from './db-config.interface';
import { useEnvValue } from 'app/utils/use-env-value';
import { Event } from 'events/entities/event.entity';

dotenv.config();

class PostgresConfig implements IDBConfig {
  private readonly env: NodeJS.ProcessEnv;
  constructor() {
    dotenv.config();
  }

  public getConfig(): TypeOrmModuleOptions {
    const host = useEnvValue('POSTGRES_HOST');
    const port = parseInt(useEnvValue('POSTGRES_PORT'));
    const username = useEnvValue('POSTGRES_USER');
    const password = useEnvValue('POSTGRES_PASSWORD');
    const database = useEnvValue('POSTGRES_DATABASE');

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,

      entities: [Event],
      synchronize: true
    };
  }
}

export const postgresConfig: IDBConfig = new PostgresConfig();
