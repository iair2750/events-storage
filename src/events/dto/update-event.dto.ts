import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  // @ApiProperty()
  @IsString({ message: 'name has invalid type' })
  @IsNotEmpty({ message: 'name should be defined' })
  @IsOptional()
  name?: string;

  // @ApiProperty()
  @IsDateString({}, { message: 'start date has invalid type' })
  @IsDefined({ message: 'start date should be defined' })
  @IsOptional()
  startDate?: string;

  // @ApiProperty({ required: false })
  @IsBoolean({ message: 'isMidnight has invalid type' })
  @IsOptional()
  isMidnight?: boolean;

  // @ApiProperty({ required: false })
  @IsDateString({}, { message: 'end date has invalid type' })
  @IsOptional()
  endDate?: string;
}
