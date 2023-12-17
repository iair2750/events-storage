import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from 'app/db-config/postgres-config';
import { EventsModule } from 'events/events.module';

@Module({
  imports: [TypeOrmModule.forRoot(postgresConfig.getConfig()), EventsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
