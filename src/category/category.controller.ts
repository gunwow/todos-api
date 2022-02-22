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
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { CategoryDTO } from './dto/category.dto';
import { PaginatedSet } from '../common/crud';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<PaginatedSet<Category[]>> {
    return this.categoryService.findAll();
  }

  @Post()
  async create(@Body() payload: CategoryDTO): Promise<Category> {
    return this.categoryService.create(payload);
  }

  @Get(':id')
  async findOneById(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
    return this.categoryService.findByIdOrFail(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: CategoryDTO,
  ): Promise<Category> {
    return this.categoryService.updateByIdOrFail(id, payload);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.categoryService.removeByIdOrFail(id);
  }
}
