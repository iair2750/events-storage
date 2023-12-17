import { EventsRepo } from '../events.repo';

const mockRepo = jest.createMockFromModule<EventsRepo>('../events.repo.ts');

mockRepo.findOne = jest.fn();
mockRepo.remove = jest.fn();
