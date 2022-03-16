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
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { TodoDTO } from './dto/todo.dto';
import { PaginatedSet } from '../common/crud';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ReqUser } from '../auth/decorator/req-user.decorator';
import { User } from '../user/user.model';
import { QueryParamsDTO } from 'src/common/http';
import { QueryFiltersPipe } from 'src/common/http/filters-query.pipe';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('all')
  async findAll(@ReqUser() user: User): Promise<PaginatedSet<Todo[]>> {
    return this.todoService.findAllByUserId(user.id);
  }

  @Get()
  async find(
    @ReqUser() user: User,
    @Query(QueryFiltersPipe) query: QueryParamsDTO<Todo>,
  ): Promise<PaginatedSet<Todo[]>> {
    return this.todoService.findByUserId(user.id, query);
  }

  @Post()
  async create(@ReqUser() user: User, @Body() payload: TodoDTO): Promise<Todo> {
    return this.todoService.create({
      ...payload,
      userId: user.id,
    });
  }

  @Get(':id')
  async findOneById(
    @ReqUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Todo> {
    return this.todoService.findOneByIdAndUserId(id, user.id);
  }

  @Put(':id')
  async update(
    @ReqUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: TodoDTO,
  ): Promise<Todo> {
    return this.todoService.updateOneByIdAndUserId(id, user.id, payload);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @ReqUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.todoService.removeOneByIdAndUserId(id, user.id);
  }
}
