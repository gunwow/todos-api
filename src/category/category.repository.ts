import { BaseRepository } from '../common/crud';
import { Category } from './category.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor() {
    super(Category);
  }
}
