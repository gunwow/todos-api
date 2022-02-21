import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { PaginatedSet } from '../common/crud';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<PaginatedSet<Category[]>> {
    return this.categoryService.findAll();
  }

  @Post()
  async create(@Body() payload: CreateCategoryDTO): Promise<Category> {
    return this.categoryService.create(payload);
  }
}
