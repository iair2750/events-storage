import { BaseEntity, FindOptionsWhere, UpdateResult } from 'typeorm';

export type IRepo<T extends BaseEntity> = {
  findAll: () => Promise<T[]>;
  findOne: (where: FindOptionsWhere<T>) => Promise<T | null>;
  create: (entity: Omit<T, keyof BaseEntity>) => Promise<T>;
  remove: (entity: T) => Promise<T>;
  update: (id: string, updateEntity: unknown) => Promise<UpdateResult>;
};
