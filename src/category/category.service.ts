import { BaseCrudService } from '../common/crud/base-crud.service';
import { Category } from './category.model';
import { CategoryRepository } from './category.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService extends BaseCrudService<
  Category,
  CategoryRepository
> {
  constructor(protected readonly repository: CategoryRepository) {
    super(repository);
  }
}
