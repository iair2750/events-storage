import { Module } from '@nestjs/common';
import { EventsService } from './service/events.service';
import { EventsController } from './controller/events.controller';
import { IEventsService } from './service/events.service.interface';
import { EventsRepo } from './repo/events.repo';

const eventsService = { provide: IEventsService, useClass: EventsService };

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [eventsService, EventsRepo],
  exports: [eventsService]
})
export class EventsModule {}
