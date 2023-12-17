import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from '../controller/events.controller';
import { IEventsService } from 'events/service/events.service.interface';
import { ResponseEventDTO } from 'events/dto/response-event.dto';

const mockService = {
  create: jest.fn().mockImplementation(entity => entity),
  findAll: jest.fn().mockReturnValue([]),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn()
};

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: IEventsService, useFactory: () => mockService }]
    }).compile();

    controller = module.get(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new event with valid data and return the created event', async () => {
    const createEventDto = {
      name: 'Test Event',
      startDate: '2022-01-01'
    };
    const result = await controller.create(createEventDto);

    expect(mockService.create).toHaveBeenCalledTimes(1);
    expect(result.name).toBe(createEventDto.name);
    expect(result.startDate).toBe(createEventDto.startDate);
  });

  it('should retrieve all events and return an array of events', async () => {
    const events = [
      { id: '1', name: 'Event 1', startDate: '2022-01-01' },
      { id: '2', name: 'Event 2', startDate: '2022-02-01' },
      { id: '3', name: 'Event 3', startDate: '2022-03-01' }
    ];
    mockService.findAll.mockReturnValueOnce(events);

    const result = await controller.findAll();

    expect(mockService.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(events);
  });

  it('should retrieve a specific event by ID and return the event', async () => {
    const eventId = '1';
    const event = { id: eventId, name: 'Test Event', startDate: '2022-01-01' };
    mockService.findOne.mockReturnValueOnce(event);

    const result = await controller.findOne(eventId);

    expect(mockService.findOne).toHaveReturnedTimes(1);
    expect(mockService.findOne).toHaveBeenCalledWith(eventId);
    expect(result).toEqual(event);
  });

  it('should update an event with valid input', async () => {
    // Arrange
    const id = 'validId';
    const updateEventDto = { name: 'New Event Name' };

    const updateResult = { affected: 1 };
    mockService.update.mockReturnValueOnce(updateResult);

    // Act
    const result = await controller.update(id, updateEventDto);

    // Assert
    expect(result).toEqual(updateResult);
    expect(mockService.update).toHaveBeenCalledTimes(1);
    expect(mockService.update).toHaveBeenCalledWith(id, updateEventDto);
  });

  it('should call eventsService.remove with the correct id parameter', async () => {
    const id = 'valid-id';
    const removeEventDto = { id: id, name: 'New Event Name' };
    mockService.remove.mockReturnValueOnce(removeEventDto);

    const res = await controller.remove(id);

    expect(mockService.remove).toHaveBeenCalledTimes(1);
    expect(mockService.remove).toHaveBeenCalledWith(id);
    expect(res.id).toBe(removeEventDto.id);
    expect(res.name).toBe(removeEventDto.name);
  });
});
