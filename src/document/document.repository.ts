import { BaseRepository } from '../common/crud';
import { Document } from './document.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentRepository extends BaseRepository<Document> {
  constructor() {
    super(Document);
  }
}
