import { BaseRepository } from './base.repository';
import { Model } from 'sequelize-typescript';
import { FindAndCountOptions, FindOptions, UpdateOptions } from 'sequelize';
import {
  ModelCreationAttributes,
  ModelPayload,
  PaginatedSet,
  PaginationParams,
  ResultsWithCountSet,
} from './type';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseService<
  M extends Model,
  T extends BaseRepository<M>,
> {
  protected constructor(protected readonly repository: T) {}

  async findAll(options?: FindOptions<M>): Promise<PaginatedSet<M[]>> {
    const results: M[] = await this.repository.findAll(options);
    return {
      total: results.length,
      data: results,
    };
  }

  async findAndCountAll(
    options?: FindAndCountOptions<ModelCreationAttributes<M>>,
  ): Promise<PaginatedSet<M[]>> {
    const { count: total, rows: data }: ResultsWithCountSet<M> =
      await this.repository.findAndCountAll(options);

    return {
      total,
      data,
    };
  }

  async findPaginated(
    paginationParams: PaginationParams,
    options?: FindAndCountOptions<ModelCreationAttributes<M>>,
  ): Promise<PaginatedSet<M[]>> {
    const { count: total, rows: data }: ResultsWithCountSet<M> =
      await this.repository.findPaginated(paginationParams, options);

    return {
      total,
      data,
    };
  }

  async findByIdOrFail(id: string): Promise<M> {
    const result: M = await this.findOneById(id);
    if (!result) {
      throw new NotFoundException({
        code: 'modelNotFound',
        message: `Model with id [${id}] not found.`,
      });
    }
    return result;
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

  async updateByIdOrFail(id: string, payload: ModelPayload<M>): Promise<M> {
    await this.findByIdOrFail(id);
    return this.update(id, payload);
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

  async removeByIdOrFail(id: string): Promise<void> {
    await this.findByIdOrFail(id);
    return this.remove(id);
  }
}
