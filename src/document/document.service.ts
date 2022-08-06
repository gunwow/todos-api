import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { Document } from './document.model';
import { DocumentRepository } from './document.repository';
import { PaginatedSet } from '../common/crud';

@Injectable()
export class DocumentService extends BaseCrudService<
  Document,
  DocumentRepository
> {
  constructor(protected readonly repository: DocumentRepository) {
    super(repository);
  }

  async findByUserId(userId: string): Promise<PaginatedSet<Document[]>> {
    return this.findAll({
      where: { userId },
    });
  }
}
