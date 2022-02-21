import { BaseService } from '../common/crud/base.service';
import { Category } from './category.model';
import { CategoryRepository } from './category.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService extends BaseService<Category, CategoryRepository> {
  constructor(protected readonly repository: CategoryRepository) {
    super(repository);
  }
}
