import { BaseCrudService } from '../common/crud/base-crud.service';
import { Category } from './category.model';
import { CategoryRepository } from './category.repository';
import { Injectable } from '@nestjs/common';
import { ModelPayload, PaginatedSet, PaginationParams } from '../common/crud';

@Injectable()
export class CategoryService extends BaseCrudService<
  Category,
  CategoryRepository
> {
  constructor(protected readonly repository: CategoryRepository) {
    super(repository);
  }

  async findAllByUserId(userId: string): Promise<PaginatedSet<Category[]>> {
    return this.findAll({
      where: { userId },
    });
  }

  async findByUserId(
    userId: string,
    paginationParams?: PaginationParams,
  ): Promise<PaginatedSet<Category[]>> {
    return this.findPaginated(paginationParams, { where: { userId } });
  }

  async findOneByIdAndUserId(id: string, userId: string): Promise<Category> {
    return this.findOneOrFail({
      where: { id, userId },
    });
  }

  async updateOneByIdAndUserId(
    id: string,
    userId: string,
    payload: ModelPayload<Category>,
  ): Promise<Category> {
    await this.findOneByIdAndUserId(id, userId);
    return this.update(id, payload);
  }

  async removeOneByIdAndUserId(id: string, userId: string): Promise<void> {
    await this.findOneByIdAndUserId(id, userId);
    return this.remove(id);
  }
}
