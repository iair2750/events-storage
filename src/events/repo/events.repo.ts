import { Injectable } from '@nestjs/common';
import { IRepo } from 'utils/repo.interface';
import { Event } from '../entities/event.entity';
import { BaseEntity, FindOptionsWhere, UpdateResult } from 'typeorm';
import { CreateEventDto } from 'events/dto/create-event.dto';
import { UpdateEventDto } from 'events/dto/update-event.dto';

@Injectable()
export class EventsRepo implements IRepo<Event> {
  findAll(): Promise<Event[]> {
    return Event.find();
  }

  findOne(where: FindOptionsWhere<Event>): Promise<Event | null> {
    return Event.findOne({ where });
  }

  create(entity: CreateEventDto): Promise<Event> {
    const event = new Event();
    Object.assign(event, entity);
    return event.save();
  }

  remove(entity: Event): Promise<Event> {
    return entity.remove();
  }

  update(id: string, updateEntity: UpdateEventDto): Promise<UpdateResult> {
    return Event.update({ id }, updateEntity);
  }
}
