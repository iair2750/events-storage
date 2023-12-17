import { CreateEventDto } from 'events/dto/create-event.dto';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  startDate: string;

  @Column({ type: 'boolean', nullable: true })
  isMidnight?: boolean;

  @Column({ type: 'varchar', nullable: true })
  endDate?: string;
}
