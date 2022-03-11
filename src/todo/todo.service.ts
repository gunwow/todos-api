import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { Todo } from './todo.model';
import { ModelPayload, PaginatedSet } from '../common/crud';
import { CategoryService } from '../category/category.service';
import {
  TodoFiltersMap,
  TodoQueryParamsDTO,
} from './dto/todo-query-params.dto';
import { FindOptions } from 'sequelize';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class TodoService extends BaseCrudService<Todo, TodoRepository> {
  private readonly logger: Logger = new Logger(TodoService.name);

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
        where: this.resolveWhereQuery(query.filter, userId),
        order: Object.entries(query.sort || {}),
      };
      return await this.findPaginated({ limit, offset }, options);
    } catch (err) {
      this.logger.warn(err);
      throw new BadRequestException("Provided fields don't exist.");
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

  private resolveWhereQuery(
    { isCompleted, ...where }: TodoFiltersMap,
    userId: string,
  ): WhereOptions<Todo> {
    return {
      ...where,
      ...this.resolveIsCompletedClause(isCompleted),
      userId,
    };
  }

  private resolveIsCompletedClause(
    isCompleted: boolean | null | undefined,
  ): WhereOptions<Todo> {
    if (isCompleted === null || isCompleted === undefined) {
      return {};
    }

    return {
      completedAt: {
        [isCompleted ? Op.not : Op.eq]: null,
      },
    };
  }
}
