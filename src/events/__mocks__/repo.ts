import { EventsRepo } from 'events/repo/events.repo';

const mockRepo = jest.createMockFromModule<EventsRepo>('../repo/events.repo.ts');

mockRepo.findOne = jest.fn();
// mockRepo.remove = jest.fn();

// export default mockRepo;
