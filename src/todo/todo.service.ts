import { BadRequestException, Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { Todo } from './todo.model';
import { ModelPayload, PaginatedSet, PaginationParams } from '../common/crud';
import { CategoryService } from '../category/category.service';
import { TodoQueryParamsDTO } from './dto/todo-query-params.dto';
import { FindOptions, OrderItem } from 'sequelize';
import { WhereOptions } from 'sequelize';

@Injectable()
export class TodoService extends BaseCrudService<Todo, TodoRepository> {
  constructor(
    private readonly categoryService: CategoryService,
    protected readonly repository: TodoRepository,
  ) {
    super(repository);
  }

  async validatePayload(payload: ModelPayload<Todo>): Promise<void> {
    if (!payload.categoryId) {
      return;
    }
    await this.categoryService.findOneOrFail({
      where: { id: payload.categoryId, userId: payload.userId },
    });
  }

  async findAllByUserId(userId: string): Promise<PaginatedSet<Todo[]>> {
    return this.findAll({
      where: { userId },
    });
  }

  async findByUserId(
    userId: string,
    { limit, offset, ...query }: TodoQueryParamsDTO,
  ): Promise<PaginatedSet<Todo[]>> {
    try {
      const options: FindOptions<Todo> = {
        where: { ...query.filter, userId } as WhereOptions,
        order: Object.entries(query.sort),
      };
      return await this.findPaginated({ limit, offset }, options);
    } catch(err) {
      throw new BadRequestException('Provided fields don\'t exist.');
    }
  }

  async findOneByIdAndUserId(id: string, userId: string): Promise<Todo> {
    return this.findOneOrFail({
      where: { id, userId },
    });
  }

  async create(payload: ModelPayload<Todo>): Promise<Todo> {
    await this.validatePayload(payload);
    return super.create(payload);
  }

  async updateOneByIdAndUserId(
    id: string,
    userId: string,
    payload: ModelPayload<Todo>,
  ): Promise<Todo> {
    await this.findOneByIdAndUserId(id, userId);
    await this.validatePayload({ ...payload, userId });
    return this.update(id, payload);
  }

  async removeOneByIdAndUserId(id: string, userId: string): Promise<void> {
    await this.findOneByIdAndUserId(id, userId);
    return this.remove(id);
  }
}
