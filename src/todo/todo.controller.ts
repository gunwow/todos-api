import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { TodoDTO } from './dto/todo.dto';
import { PaginatedSet } from '../common/crud';
import { QueryParamsDTO } from '../common/http';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('all')
  async findAll(): Promise<PaginatedSet<Todo[]>> {
    return this.todoService.findAll();
  }

  @Get()
  async find(@Query() query: QueryParamsDTO): Promise<PaginatedSet<Todo[]>> {
    return this.todoService.findPaginated(query);
  }

  @Post()
  async create(@Body() payload: TodoDTO): Promise<Todo> {
    return this.todoService.create(payload);
  }

  @Get(':id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string): Promise<Todo> {
    return this.todoService.findByIdOrFail(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: TodoDTO,
  ): Promise<Todo> {
    return this.todoService.updateByIdOrFail(id, payload);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.todoService.removeByIdOrFail(id);
  }
}
