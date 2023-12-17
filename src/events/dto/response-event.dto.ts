import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'typeorm';
import { Event } from '../entities/event.entity';

export class ResponseEventDTO implements Omit<Event, keyof BaseEntity> {
  constructor(event: ResponseEventDTO) {
    Object.assign(this, event);
  }

  static getFromEvent(event: Event): ResponseEventDTO {
    return new ResponseEventDTO({
      id: event.id,
      name: event.name,
      startDate: event.startDate,
      endDate: event.endDate,
      isMidnight: event.isMidnight
    });
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty({ required: false })
  isMidnight?: boolean;

  @ApiProperty({ required: false })
  endDate?: string;
}
