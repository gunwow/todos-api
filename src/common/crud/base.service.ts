import { BaseRepository } from './base.repository';
import { Model } from 'sequelize-typescript';
import { FindAndCountOptions, FindOptions, UpdateOptions } from 'sequelize';
import {
  ModelCreationAttributes,
  ModelPayload,
  PaginationParams,
  ResultsWithCountSet,
} from './type';

export class BaseService<M extends Model, T extends BaseRepository<M>> {
  constructor(protected readonly repository: T) {}

  async findAll(options?: FindOptions<M>): Promise<M[]> {
    return this.repository.findAll(options);
  }

  async findAndCountAll(
    options?: FindAndCountOptions<ModelCreationAttributes<M>>,
  ): Promise<ResultsWithCountSet<M>> {
    return this.repository.findAndCountAll(options);
  }

  async findPaginated(
    paginationParams: PaginationParams,
    options?: FindAndCountOptions<ModelCreationAttributes<M>>,
  ): Promise<ResultsWithCountSet<M>> {
    return this.repository.findPaginated(paginationParams, options);
  }

  async findOneById(id: string): Promise<M> {
    return this.repository.findOneById(id);
  }

  async findOne(options?: FindOptions<M>): Promise<M> {
    return this.repository.findOne(options);
  }

  async create(payload: ModelPayload<M>): Promise<M> {
    return this.repository.create(payload);
  }

  async createMany(payload: ModelPayload<M>[]) {
    return this.repository.createMany(payload);
  }

  async update(id: string, payload: ModelPayload<M>): Promise<M> {
    return this.repository.update(id, payload);
  }

  async updateMany(
    options: UpdateOptions,
    payload: ModelPayload<M>,
  ): Promise<void> {
    return this.repository.updateMany(options, payload);
  }

  async remove(id: string | string[]): Promise<void> {
    return this.repository.remove(id);
  }
}
