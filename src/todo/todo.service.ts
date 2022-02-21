import { Injectable } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { BaseService } from '../common/crud/base.service';
import { Todo } from './todo.model';

@Injectable()
export class TodoService extends BaseService<Todo, TodoRepository> {
  constructor(protected readonly repository: TodoRepository) {
    super(repository);
  }
}
