import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { IEventsService } from './events.service.interface';
import { EventsRepo } from 'events/repo/events.repo';

const throwNotFoundException = (id: string): never => {
  throw new NotFoundException(undefined, {
    cause: `id ${id} was not found`,
    description: 'This event does not exist'
  });
};

@Injectable()
export class EventsService implements IEventsService {
  constructor(@Inject(EventsRepo) private readonly eventsRepo: EventsRepo) {}

  create(createEventDto: CreateEventDto) {
    return this.eventsRepo.create(createEventDto);
  }

  findAll() {
    return this.eventsRepo.findAll();
  }

  async findOne(id: string) {
    const event = await this.eventsRepo.findOne({ id });
    if (!event) {
      return throwNotFoundException(id);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const updateResult = await this.eventsRepo.update(id, updateEventDto);
    if (updateResult.affected === 0) {
      return throwNotFoundException(id);
    }
    return updateResult;
  }

  async remove(id: string) {
    const event = await this.findOne(id);
    return this.eventsRepo.remove(event);
  }
}
