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
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { CategoryDTO } from './dto/category.dto';
import { PaginatedSet } from '../common/crud';
import { ReqUser } from '../auth/decorator/req-user.decorator';
import { User } from '../user/user.model';
import { AuthGuard } from '../auth/guard/auth.guard';
import { QueryParamsDTO } from '../common/http';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  async findAll(@ReqUser() user: User): Promise<PaginatedSet<Category[]>> {
    return this.categoryService.findAllByUserId(user.id);
  }

  @Get()
  async find(
    @ReqUser() user: User,
    @Query() query: QueryParamsDTO,
  ): Promise<PaginatedSet<Category[]>> {
    return this.categoryService.findByUserId(user.id, query);
  }

  @Post()
  async create(
    @ReqUser() user: User,
    @Body() payload: CategoryDTO,
  ): Promise<Category> {
    return this.categoryService.create({ ...payload, userId: user.id });
  }

  @Get(':id')
  async findOneById(
    @ReqUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Category> {
    return this.categoryService.findOneByIdAndUserId(id, user.id);
  }

  @Put(':id')
  async update(
    @ReqUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: CategoryDTO,
  ): Promise<Category> {
    return this.categoryService.updateOneByIdAndUserId(id, user.id, payload);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @ReqUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.categoryService.removeOneByIdAndUserId(id, user.id);
  }
}
