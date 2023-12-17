import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from '../service/events.service';
import { EventsRepo } from 'events/repo/events.repo';

const mocks = {
  findAll: [],
  findOne: 'entity',
  update: { affected: 1 },
  remove: 'remove'
};

const mockRepo = {
  findAll: jest.fn().mockReturnValue(mocks.findAll),
  findOne: jest.fn().mockReturnValue(mocks.findOne),
  create: jest.fn().mockImplementation(entity => entity),
  remove: jest.fn().mockReturnValue(mocks.remove),
  update: jest.fn().mockReturnValue(mocks.update)
};

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: EventsRepo,
          useFactory: () => mockRepo
        }
      ]
    }).compile();

    service = module.get(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an event', async () => {
    const entity = { name: 'name', startDate: 'start date' };
    const result = await service.create(entity);
    expect(mockRepo.create).toHaveBeenCalledTimes(1);
    expect(mockRepo.create).toHaveBeenCalledWith(entity);
    expect(result.name).toBe(entity.name);
    expect(result.startDate).toBe(entity.startDate);
  });

  it('should find all', async () => {
    const result = await service.findAll();
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
    expect(result.length).toBe(mocks.findAll.length);
  });

  it('should find one', async () => {
    const result = await service.findOne('id');
    expect(mockRepo.findOne).toHaveBeenCalledTimes(1);
    expect(mockRepo.findOne).toHaveBeenCalledWith({ id: 'id' });
    expect(result).toBe(mocks.findOne);
  });

  it('should throw on find one', async () => {
    mockRepo.findOne.mockReturnValueOnce(undefined);
    await expect(service.findOne('id')).rejects.toThrow('This event does not exist');
  });

  it('should update', async () => {
    const result = await service.update('id', {});
    expect(mockRepo.update).toHaveBeenCalledTimes(1);
    expect(mockRepo.update).toHaveBeenCalledWith('id', {});
    expect(result.affected).toBe(mocks.update.affected);
  });

  it('should throw on update', async () => {
    mockRepo.update.mockReturnValueOnce({ affected: 0 });
    await expect(service.update('id', {})).rejects.toThrow('This event does not exist');
  });

  it('should remove', async () => {
    const result = await service.remove('id');
    expect(mockRepo.remove).toHaveBeenCalledTimes(1);
    expect(mockRepo.remove).toHaveBeenCalledWith(mocks.findOne);
    expect(result).toBe(mocks.remove);
  });
});
