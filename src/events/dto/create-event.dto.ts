import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsString({ message: 'name has invalid type' })
  @IsNotEmpty({ message: 'name should be defined' })
  name: string;

  @ApiProperty()
  @IsDateString({}, { message: 'start date has invalid type' })
  @IsDefined({ message: 'start date should be defined' })
  startDate: string;

  @ApiProperty({ required: false })
  @IsBoolean({ message: 'isMidnight has invalid type' })
  @IsOptional()
  isMidnight?: boolean;

  @ApiProperty({ required: false })
  @IsDateString({}, { message: 'end date has invalid type' })
  @IsOptional()
  endDate?: string;
}
