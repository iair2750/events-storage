import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { IEventsService } from '../service/events.service.interface';
import { ResponseEventDTO } from '../dto/response-event.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUpdate } from 'utils/types/response-update';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(@Inject(IEventsService) private readonly eventsService: IEventsService) {}

  @ApiCreatedResponse({ type: ResponseEventDTO })
  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const event = await this.eventsService.create(createEventDto);
    return ResponseEventDTO.getFromEvent(event);
  }

  @Get()
  async findAll() {
    const events = await this.eventsService.findAll();
    return events.map(e => ResponseEventDTO.getFromEvent(e));
  }

  @ApiCreatedResponse({ type: ResponseEventDTO })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.findOne(id);
    return ResponseEventDTO.getFromEvent(event);
  }

  @ApiCreatedResponse({ type: ResponseUpdate })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto
  ): Promise<ResponseUpdate> {
    const updateResult = await this.eventsService.update(id, updateEventDto);
    return {
      affected: updateResult.affected
    };
  }

  @ApiCreatedResponse({ type: ResponseEventDTO })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const event = await this.eventsService.remove(id);
    return ResponseEventDTO.getFromEvent(event);
  }
}
