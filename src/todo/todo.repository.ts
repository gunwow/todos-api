import { BaseRepository } from '../common/crud';
import { Todo } from './todo.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoRepository extends BaseRepository<Todo> {
  constructor() {
    super(Todo);
  }
}
