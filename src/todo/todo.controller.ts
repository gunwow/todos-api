import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { Category } from '../category/category.model';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll({
      include: [Category],
    });
  }

  @Post()
  create(@Body() payload: CreateTodoDTO) {
    return this.todoService.create(payload);
  }
}
